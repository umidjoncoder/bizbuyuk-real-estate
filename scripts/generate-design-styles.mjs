#!/usr/bin/env node
// Generates the 8 interior-style renders for the renovation page's "Designed
// for your lifestyle" section. Generic mood/material studies — no identifiable
// real building or district, so none of this claims to depict a specific
// real place (see scripts/generate-renovation-vision.mjs for the same rule
// applied to the before/after concept pairs).

import { writeFile, mkdir, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function loadEnv() {
  try {
    const text = await readFile(join(__dirname, "../.env"), "utf8");
    for (const line of text.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      let val = trimmed.slice(eq + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) val = val.slice(1, -1);
      if (!(key in process.env)) process.env[key] = val;
    }
  } catch {}
}
await loadEnv();

function azureConfig() {
  const endpoint = process.env.AZURE_IMAGE_ENDPOINT;
  const apiKey = process.env.AZURE_IMAGE_API_KEY;
  const deployment = process.env.AZURE_IMAGE_DEPLOYMENT || "gpt-image-15";
  const apiVersion = process.env.AZURE_IMAGE_API_VERSION || "2025-04-01-preview";
  if (!endpoint || !apiKey) throw new Error("AZURE_IMAGE_ENDPOINT / AZURE_IMAGE_API_KEY not set");
  return { endpoint: endpoint.replace(/\/+$/, ""), apiKey, deployment, apiVersion };
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function generateImagePng(prompt, { size = "1024x1024", quality = "high", attempts = 3 } = {}) {
  const { endpoint, apiKey, deployment, apiVersion } = azureConfig();
  const url = `${endpoint}/openai/deployments/${encodeURIComponent(deployment)}/images/generations?api-version=${encodeURIComponent(apiVersion)}`;
  let lastErr;
  for (let i = 1; i <= attempts; i++) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "api-key": apiKey, "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, n: 1, size, quality }),
      });
      const text = await res.text();
      if (!res.ok) {
        const err = new Error(`HTTP ${res.status}: ${text.slice(0, 500)}`);
        err.status = res.status;
        throw err;
      }
      const json = JSON.parse(text);
      const item = json?.data?.[0];
      if (item?.b64_json) return Buffer.from(item.b64_json, "base64");
      if (item?.url) {
        const dl = await fetch(item.url);
        return Buffer.from(await dl.arrayBuffer());
      }
      throw new Error("Unexpected response shape");
    } catch (e) {
      lastErr = e;
      if (e.status === 400 || e.status === 401 || e.status === 404) throw e;
      if (i < attempts) await sleep(3000 * i);
    }
  }
  throw lastErr;
}

const GRADE =
  "ivory / graphite / champagne palette, warm low-key lighting, muted contrast, " +
  "photorealistic architectural interior photography, natural depth of field, " +
  "no people, no text, no watermark, no logo, no identifiable real landmark or skyline";

const STYLES = [
  {
    slug: "modern",
    label: "Modern",
    prompt:
      "A modern living room corner: clean-lined low sofa in charcoal bouclé, a sculptural black metal floor lamp, a large abstract canvas, polished concrete floor, floor-to-ceiling window with soft diffused daylight",
  },
  {
    slug: "minimalist",
    label: "Minimalist",
    prompt:
      "A minimalist bedroom corner: a low platform bed with white linen, one piece of sculptural furniture, bare pale plaster wall, a single dried branch in a ceramic vase, abundant negative space, soft even daylight",
  },
  {
    slug: "luxury",
    label: "Luxury",
    prompt:
      "A luxury living room corner: a curved velvet sofa in deep emerald, a brass and marble side table, a crystal chandelier fragment visible above, dark lacquered wall panel, warm evening lamplight",
  },
  {
    slug: "contemporary",
    label: "Contemporary",
    prompt:
      "A contemporary open living space: a mixed-material sectional in warm taupe fabric, a walnut media wall with integrated shelving, layered textiles, a large potted fiddle-leaf fig, soft afternoon light",
  },
  {
    slug: "japandi",
    label: "Japandi",
    prompt:
      "A Japandi living room corner: a low wooden-framed sofa with linen cushions, a pale oak slat wall, a single bonsai-style potted pine, a paper floor lamp, tatami-toned rug, soft natural light",
  },
  {
    slug: "classic",
    label: "Classic",
    prompt:
      "A classic living room corner: a tufted chesterfield armchair in deep burgundy leather, dark wood wainscoting, a gilt-framed mirror, a Persian-style rug, warm brass sconce lighting",
  },
  {
    slug: "hotel-style",
    label: "Hotel-style",
    prompt:
      "A five-star hotel suite living corner: a tailored bench seat in champagne velvet, a marble-top console, a large abstract art piece, layered ambient and accent lighting, sheer curtains, refined and formal",
  },
  {
    slug: "custom",
    label: "Custom design",
    prompt:
      "A bespoke eclectic living room corner: a mix of custom joinery in walnut and brass inlay, an artisan-woven rug, a curated shelf of ceramics and books, a statement pendant light, warm layered lighting",
  },
];

const outDir = join(__dirname, "../../../../BIZBUYUK/generated-renders/styles");
await mkdir(outDir, { recursive: true });

for (const s of STYLES) {
  const prompt = `${s.prompt}. ${GRADE}.`;
  const outPath = join(outDir, `${s.slug}.png`);
  console.log(`\n→ ${s.label}`);
  try {
    const buf = await generateImagePng(prompt);
    await writeFile(outPath, buf);
    console.log(`  saved ${outPath} (${(buf.length / 1024).toFixed(0)} KB)`);
  } catch (e) {
    console.error(`  FAILED: ${e.message}`);
  }
}
console.log("\nDone.");

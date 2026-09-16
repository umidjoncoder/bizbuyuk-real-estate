#!/usr/bin/env node
// Generates the three "design vision" before/after pairs for the renovation
// page's concept section (NOT the "Our Work" portfolio — that stays real-photos
// only, per lib/renovationProjects.ts). Each pair shares one detailed framing
// description so the two renders land as close to the same composition as a
// generative model can manage.

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

async function generateImagePng(prompt, { size = "1536x1024", quality = "high", attempts = 3 } = {}) {
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
  "cinematic haze, no oversaturation, no blue cast, photorealistic architectural " +
  "photography, natural depth of field, no people, no text, no watermark, no logo";

const SETS = [
  {
    slug: "villa",
    label: "Villa living room",
    frame:
      "Interior of a Dubai villa living room, camera at eye level positioned near the room's entrance looking straight toward a large arched window wall with a garden visible outside, wide 24mm architectural photography, centered symmetrical composition, room roughly 6x5 meters",
    before:
      "the room is dated and worn: cracked beige paint, an old brown leather sofa, scuffed terrazzo floor, exposed ceiling wiring, bare walls, harsh flat midday light, cluttered and neglected",
    after:
      "the room is fully renovated in a warm contemporary style: travertine-clad accent wall, a large linen sectional sofa in champagne tones, a brass and walnut coffee table, a woven jute rug, recessed lighting, a potted olive tree, golden-hour light through sheer curtains",
  },
  {
    slug: "burj-view-apartment",
    label: "Apartment with Burj Khalifa view",
    frame:
      "Interior of a high-floor Dubai apartment living room with a floor-to-ceiling window wall facing the Burj Khalifa skyline at dusk, camera at eye level near the room entrance looking toward the window, 28mm architectural photography, centered composition",
    before:
      "the room is an empty unfinished shell: bare concrete floor, exposed drywall seams, a single bare bulb hanging from the ceiling ",
    after:
      "the room is a fully finished, furnished renovation: polished herringbone oak floor, a low modern sofa in graphite bouclé fabric, a brass floor lamp, sheer curtains softly framing the skyline view, warm ambient lighting, styled with books and a ceramic vase on a coffee table",
  },
  {
    slug: "office",
    label: "Office fit-out",
    frame:
      "Interior of a small Dubai commercial office, camera positioned at the doorway looking toward the far wall and window, 24mm architectural photography, eye level, centered composition, room roughly 5x4 meters",
    before:
      "the office is dated and worn: yellowed drop-ceiling tiles, scuffed grey carpet tiles, old beige cubicle partitions, tangled cables under a dated desk, flickering fluorescent tube lighting, cluttered with cardboard boxes",
    after:
      "the office is fully renovated: sleek walnut built-in desks, acoustic felt ceiling panels, warm LED cove lighting, a large potted fig tree, a graphite-grey ergonomic chair, a glass partition wall, polished concrete floor, clean and professional",
  },
];

const outDir = join(__dirname, "../../../../BIZBUYUK/generated-renders/vision");
await mkdir(outDir, { recursive: true });

for (const set of SETS) {
  for (const phase of ["before", "after"]) {
    const prompt = `${set.frame}. ${set[phase]}. ${GRADE}.`;
    const outPath = join(outDir, `${set.slug}-${phase}.png`);
    console.log(`\n→ ${set.label} — ${phase}`);
    try {
      const buf = await generateImagePng(prompt);
      await writeFile(outPath, buf);
      console.log(`  saved ${outPath} (${(buf.length / 1024).toFixed(0)} KB)`);
    } catch (e) {
      console.error(`  FAILED: ${e.message}`);
    }
  }
}
console.log("\nDone.");

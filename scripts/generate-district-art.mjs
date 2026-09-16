#!/usr/bin/env node
// Stylised line-art marks for the 17 districts on /real-estate — NOT
// photographs. A photorealistic render captioned "Palm Jumeirah" would claim
// to document what that real, specific place actually looks like today,
// which a generative model can't guarantee (see Districts.tsx's own comment:
// a mismatched photo is worse than none). An abstract gold-line illustration
// evoking the district's TYPE — an island, a marina, a racecourse — makes no
// such claim; it reads as brand art, the way an icon or a sketch would.

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

async function generateImagePng(prompt, { size = "1536x1024", quality = "medium", attempts = 3, timeoutMs = 90000 } = {}) {
  const { endpoint, apiKey, deployment, apiVersion } = azureConfig();
  const url = `${endpoint}/openai/deployments/${encodeURIComponent(deployment)}/images/generations?api-version=${encodeURIComponent(apiVersion)}`;
  let lastErr;
  for (let i = 1; i <= attempts; i++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "api-key": apiKey, "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, n: 1, size, quality }),
        signal: controller.signal,
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
        const dl = await fetch(item.url, { signal: controller.signal });
        return Buffer.from(await dl.arrayBuffer());
      }
      throw new Error("Unexpected response shape");
    } catch (e) {
      lastErr = e.name === "AbortError" ? new Error(`Timed out after ${timeoutMs}ms`) : e;
      if (e.status === 400 || e.status === 401 || e.status === 404) throw e;
      if (i < attempts) await sleep(3000 * i);
    } finally {
      clearTimeout(timer);
    }
  }
  throw lastErr;
}

const STYLE =
  "Minimalist single-line gold illustration on a deep graphite background, elegant thin linework, " +
  "architectural sketch style, abstract and stylised, like a luxury real estate brand mark — not a " +
  "photograph, not photorealistic, no shading, no gradients, no text, no logos, no people.";

const DISTRICTS = [
  { slug: "downtown-dubai", motif: "a single dominant super-tall spire silhouette rising from a low, wide mall structure at its base" },
  { slug: "business-bay", motif: "a gently curving canal lined with a row of slender modern glass towers" },
  { slug: "dubai-marina", motif: "a marina waterway densely lined with high-rise towers, a few small boats on the water" },
  { slug: "palm-jumeirah", motif: "a palm-frond-shaped island with a crescent breakwater, villas dotted along the fronds" },
  { slug: "dubai-hills-estate", motif: "a rolling golf fairway with a single clubhouse silhouette and scattered low-rise villas" },
  { slug: "jvc", motif: "a circular ring-road layout with mid-rise apartment blocks and townhouses along it" },
  { slug: "dubai-creek-harbour", motif: "a waterfront with one slender under-construction tower silhouette and a crane beside it" },
  { slug: "dubai-harbour", motif: "a marina with berthed yachts, a cruise ship silhouette, and beachfront towers behind" },
  { slug: "dubai-islands", motif: "a cluster of new waterfront islands with low-rise beachfront buildings" },
  { slug: "meydan", motif: "a horse racecourse oval track silhouette with a grandstand structure beside it" },
  { slug: "sobha-hartland", motif: "a green park landscape with low-density villas and a school building silhouette" },
  { slug: "dubai-south", motif: "an airport control tower and a runway line, with distant low-rise development" },
  { slug: "al-furjan", motif: "a metro rail line on stilts with townhouses and low apartment blocks along it" },
  { slug: "arabian-ranches", motif: "rolling golf fairways with single-storey villas and a few palm trees" },
  { slug: "jumeirah", motif: "low-rise beachfront villas along a coastline with palm trees" },
  { slug: "ras-al-khor", motif: "a wetland creek with a few wading bird silhouettes and industrial silos in the distance" },
  { slug: "dubai-silicon-oasis", motif: "a cluster of modern glass tech-park towers above a faint circuit-board ground pattern" },
];

const outDir = join(__dirname, "../../../../BIZBUYUK/generated-renders/districts");
await mkdir(outDir, { recursive: true });

// Resumable: skip any district whose file already exists (and looks complete)
// so a re-run after a stall or a kill only redoes what's missing.
const { readdir } = await import("node:fs/promises");
const already = new Set((await readdir(outDir).catch(() => [])).filter((f) => f.endsWith(".png")).map((f) => f.replace(".png", "")));
const todo = DISTRICTS.filter((d) => !already.has(d.slug));
console.log(`${already.size} already done, ${todo.length} to go.`);

for (const d of todo) {
  const prompt = `${STYLE} The scene: ${d.motif}.`;
  const outPath = join(outDir, `${d.slug}.png`);
  console.log(`\n→ ${d.slug}`);
  try {
    const buf = await generateImagePng(prompt);
    await writeFile(outPath, buf);
    console.log(`  saved (${(buf.length / 1024).toFixed(0)} KB)`);
  } catch (e) {
    console.error(`  FAILED: ${e.message}`);
  }
}
console.log("\nDone.");

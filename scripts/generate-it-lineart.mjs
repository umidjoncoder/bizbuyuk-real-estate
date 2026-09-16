#!/usr/bin/env node
// Complete style change for every IT visual (hub hero, hub CTA, and all 12
// group heroes): a photorealistic "monitor on a desk" — no matter how modern
// the hardware — reads as generic stock photography, and two rounds of that
// didn't fix it. This switches to the same minimalist gold line-art on deep
// graphite used for the 17 district marks, which already landed well: an
// abstract, iconographic mark per discipline instead of a staged photograph.

import { writeFile, mkdir, readFile, readdir } from "node:fs/promises";
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
  "technical sketch style, abstract and stylised, like a luxury tech brand mark — not a photograph, " +
  "not photorealistic, no shading, no gradients, no text, no logos, no people.";

const ITEMS = [
  { name: "hero", scene: "An abstract composition of overlapping geometric shapes — a browser window frame, a smartphone outline and a loose node network — arranged together" },
  { name: "cta", scene: "A wide, sparse constellation of connected nodes and thin lines drifting across the frame, with generous empty space in the left third" },
  { name: "web", scene: "An abstract browser window frame with a simple header bar and three rectangular content blocks inside" },
  { name: "mobile", scene: "An abstract smartphone outline with a minimal grid of six rounded app icons inside the screen" },
  { name: "business-systems", scene: "An abstract kanban board of three columns, each holding two or three small rectangular cards" },
  { name: "integrations", scene: "Two abstract puzzle-piece shapes interlocking at the centre of the frame, with a thin connecting line" },
  { name: "ai", scene: "An abstract constellation of a dozen connected nodes forming a loose neural-network pattern" },
  { name: "data", scene: "An abstract bar chart of five rising bars, left to right, with a single line graph overlaid across their tops" },
  { name: "cloud", scene: "An abstract cloud outline with three small square nodes beneath it, each joined to the cloud by a thin line" },
  { name: "security", scene: "An abstract shield outline with a simple round keyhole shape at its centre" },
  { name: "design", scene: "An abstract pen nib drawing a single flowing curved line, with three small circles beside it representing colour swatches" },
  { name: "marketing", scene: "An abstract megaphone outline with an upward arrow and three short radiating lines beside its opening" },
  { name: "consulting", scene: "An abstract roadmap of four circular waypoints connected in an ascending line from lower left to upper right" },
  { name: "uae", scene: "An abstract eight-pointed geometric star pattern with a few small connected nodes overlaid near its centre" },
];

const outDir = join(__dirname, "../../../../BIZBUYUK/generated-renders/it-lineart");
await mkdir(outDir, { recursive: true });

const already = new Set((await readdir(outDir).catch(() => [])).filter((f) => f.endsWith(".png")).map((f) => f.replace(".png", "")));
const todo = ITEMS.filter((it) => !already.has(it.name));
console.log(`${already.size} already done, ${todo.length} to go.`);

for (const it of todo) {
  const prompt = `${it.scene}. ${STYLE}`;
  const outPath = join(outDir, `${it.name}.png`);
  console.log(`\n→ ${it.name}`);
  try {
    const buf = await generateImagePng(prompt);
    await writeFile(outPath, buf);
    console.log(`  saved (${(buf.length / 1024).toFixed(0)} KB)`);
  } catch (e) {
    console.error(`  FAILED: ${e.message}`);
  }
}
console.log("\nDone.");

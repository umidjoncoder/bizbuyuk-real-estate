#!/usr/bin/env node
// Regenerates the IT hero and CTA banner. The first pass leaned retro without
// meaning to — a brass banker's lamp and a chunky two-tone keyboard read as a
// vintage office, not a modern tech company. This version is explicit about
// staying contemporary: thin-bezel displays, minimal matte-black hardware,
// no antique props.

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

async function generateImagePng(prompt, { size = "1536x1024", quality = "high", attempts = 3, timeoutMs = 90000 } = {}) {
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

const GRADE =
  "ivory / graphite / champagne palette in the room and furniture tones, warm ambient accent lighting " +
  "balanced with a cool white-blue screen glow, muted contrast, photorealistic, natural depth of field, " +
  "no people, no readable text, no logos, no watermark, no identifiable real landmark or skyline. " +
  "Strictly contemporary: thin-bezel displays, minimal matte-black hardware, clean uncluttered surfaces. " +
  "No vintage or antique objects, no brass fixtures, no chunky retro keyboards, no CRT-era monitor shapes.";

const JOBS = [
  {
    name: "hero",
    prompt:
      "A modern software developer's desk close-up at dusk: an ultra-thin-bezel widescreen monitor showing a " +
      "softly blurred, glowing dark-mode code editor, a slim low-profile matte-black mechanical keyboard, a " +
      "minimal articulating desk lamp in matte black, a softly blurred city skyline through a window behind. " +
      GRADE,
  },
  {
    name: "cta",
    prompt:
      "A wide modern open-plan tech office at night: rows of clean minimalist desks with slim thin-bezel " +
      "monitors glowing softly, sleek contemporary pendant light fixtures, a blurred city skyline through " +
      "floor-to-ceiling windows, generous empty space on the left third of the frame. " +
      GRADE,
  },
];

const outDir = join(__dirname, "../../../../BIZBUYUK/generated-renders/it-v2");
await mkdir(outDir, { recursive: true });

for (const job of JOBS) {
  console.log(`\n→ ${job.name}`);
  try {
    const buf = await generateImagePng(job.prompt);
    const outPath = join(outDir, `${job.name}.png`);
    await writeFile(outPath, buf);
    console.log(`  saved ${outPath} (${(buf.length / 1024).toFixed(0)} KB)`);
  } catch (e) {
    console.error(`  FAILED: ${e.message}`);
  }
}
console.log("\nDone.");

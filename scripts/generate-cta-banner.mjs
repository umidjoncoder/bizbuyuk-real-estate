#!/usr/bin/env node
// Regenerates /public/brand/cta.webp — the wide CTA banner shared by the
// homepage, services and real-estate closing sections. The old asset (a
// stock skyline photo) packed its content into the bottom ~15% of the frame;
// cropping it tighter helped but started from a composition that was never
// meant for a short, wide banner. This generates one purpose-built for it:
// the skyline itself occupies a real share of the frame, not a sliver under
// a wall of empty sky.

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

const prompt =
  "Wide cinematic photograph of the Dubai skyline at dusk, the Burj Khalifa and a dense cluster of towers " +
  "filling roughly the bottom half of the frame with real architectural detail and silhouette variety, warm " +
  "champagne-to-graphite gradient sky above taking up the rest of the frame, generous open sky in the upper-left " +
  "third for a headline to sit in, warm low-key lighting, muted contrast, cinematic haze, ivory / graphite / " +
  "champagne palette, no oversaturation, no blue cast, photorealistic architectural photography, natural depth " +
  "of field, no people, no readable text, no logos, no watermark.";

const outDir = join(__dirname, "../../../../BIZBUYUK/generated-renders/cta-banner");
await mkdir(outDir, { recursive: true });
const outPath = join(outDir, "cta-banner.png");

console.log("Generating wide CTA banner…");
const buf = await generateImagePng(prompt, { size: "1536x1024", quality: "high" });
await writeFile(outPath, buf);
console.log(`Saved ${outPath} (${(buf.length / 1024).toFixed(0)} KB)`);

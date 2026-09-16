#!/usr/bin/env node
// Azure OpenAI image generation — same API contract as the site's other
// projects (see futbolbizda/lib/azure-image.ts), pointed at the dedicated
// image resource this project's .env now carries:
//
//   AZURE_IMAGE_ENDPOINT
//   AZURE_IMAGE_API_KEY
//   AZURE_IMAGE_API_VERSION   e.g. 2025-04-01-preview
//   AZURE_IMAGE_DEPLOYMENT    e.g. gpt-image-15
//
// Usage:
//   node scripts/generate-image.mjs "<prompt>" out/file.png [size] [quality]
//   size:    1024x1024 | 1536x1024 | 1024x1536   (default 1536x1024)
//   quality: low | medium | high                  (default high)

import { writeFile, mkdir, readFile } from "node:fs/promises";
import { dirname } from "node:path";

// Minimal .env loader — no dependency needed for four variables.
async function loadEnv() {
  try {
    const text = await readFile(new URL("../.env", import.meta.url), "utf8");
    for (const line of text.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      let val = trimmed.slice(eq + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!(key in process.env)) process.env[key] = val;
    }
  } catch {
    /* no .env file — rely on already-exported environment variables */
  }
}
await loadEnv();

function azureConfig() {
  const endpoint = process.env.AZURE_IMAGE_ENDPOINT;
  const apiKey = process.env.AZURE_IMAGE_API_KEY;
  const deployment = process.env.AZURE_IMAGE_DEPLOYMENT || "gpt-image-15";
  const apiVersion = process.env.AZURE_IMAGE_API_VERSION || "2025-04-01-preview";
  if (!endpoint || !apiKey) {
    throw new Error("AZURE_IMAGE_ENDPOINT / AZURE_IMAGE_API_KEY not set in .env");
  }
  return { endpoint: endpoint.replace(/\/+$/, ""), apiKey, deployment, apiVersion };
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const nonRetryable = (status) => status === 400 || status === 401 || status === 404;

async function callOnce(prompt, size, quality) {
  const { endpoint, apiKey, deployment, apiVersion } = azureConfig();
  const url = `${endpoint}/openai/deployments/${encodeURIComponent(deployment)}/images/generations?api-version=${encodeURIComponent(apiVersion)}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "api-key": apiKey, "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, n: 1, size, quality }),
  });
  const text = await res.text();
  if (!res.ok) {
    const err = new Error(`Azure image gen HTTP ${res.status}: ${text.slice(0, 800)}`);
    err.status = res.status;
    throw err;
  }
  const json = JSON.parse(text);
  const item = json?.data?.[0];
  if (item?.b64_json) return Buffer.from(item.b64_json, "base64");
  if (item?.url) {
    const dl = await fetch(item.url);
    if (!dl.ok) throw new Error(`Download failed: ${dl.status}`);
    return Buffer.from(await dl.arrayBuffer());
  }
  throw new Error(`Unexpected Azure response: ${JSON.stringify(json).slice(0, 400)}`);
}

async function generateImagePng(prompt, { size = "1536x1024", quality = "high", attempts = 3 } = {}) {
  let lastErr;
  for (let i = 1; i <= attempts; i++) {
    try {
      return await callOnce(prompt, size, quality);
    } catch (e) {
      lastErr = e;
      if (nonRetryable(e.status)) throw e;
      if (i < attempts) await sleep(2500 * i);
    }
  }
  throw lastErr;
}

async function main() {
  const [prompt, outPath, size = "1536x1024", quality = "high"] = process.argv.slice(2);
  if (!prompt || !outPath) {
    console.error('Usage: node scripts/generate-image.mjs "<prompt>" out/file.png [size] [quality]');
    process.exit(1);
  }
  console.log(`Generating (${size}, ${quality})…`);
  const buf = await generateImagePng(prompt, { size, quality });
  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, buf);
  console.log(`Saved ${outPath} (${(buf.length / 1024).toFixed(0)} KB)`);
}

main().catch((e) => {
  console.error("FAILED:", e.message);
  process.exit(1);
});

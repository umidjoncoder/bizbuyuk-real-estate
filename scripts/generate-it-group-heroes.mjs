#!/usr/bin/env node
// One dedicated hero image per IT discipline (12 total), replacing the single
// shared workspace shot every group page used before. Same contemporary,
// no-vintage-props rule as the hub hero/CTA — thin-bezel screens, matte-black
// hardware, no brass, no chunky retro keyboards.

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

async function generateImagePng(prompt, { size = "1024x1024", quality = "high", attempts = 3, timeoutMs = 90000 } = {}) {
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
  "ivory / graphite / champagne palette in the room tones, warm ambient accent lighting balanced with a cool " +
  "white-blue screen glow, muted contrast, photorealistic, natural depth of field, no people, no readable " +
  "text, no logos, no watermark. Strictly contemporary: thin-bezel displays, minimal matte-black hardware, " +
  "clean uncluttered surfaces. No vintage or antique objects, no brass fixtures, no chunky retro hardware.";

const GROUPS = [
  { slug: "web", scene: "A thin-bezel monitor on a minimal desk showing a softly blurred, glowing modern website layout with a hero image and clean typography" },
  { slug: "mobile", scene: "A modern smartphone standing on a minimal stand, its screen showing a softly blurred, glowing modern app interface with rounded cards" },
  { slug: "business-systems", scene: "A thin-bezel monitor showing a softly blurred, glowing CRM-style dashboard with a pipeline of cards and a sidebar" },
  { slug: "integrations", scene: "Two thin-bezel devices — a laptop and a phone — connected by a soft glowing line of light between them on a minimal desk" },
  { slug: "ai", scene: "A thin-bezel monitor showing a softly blurred, glowing abstract neural network visualisation of connected nodes and light particles" },
  { slug: "data", scene: "A thin-bezel monitor showing a softly blurred, glowing dashboard full of charts, bar graphs and a line graph" },
  { slug: "cloud", scene: "A minimal server rack with a few status LEDs glowing softly in a clean modern server room, blurred background" },
  { slug: "security", scene: "A thin-bezel monitor showing a softly blurred, glowing status dashboard with green checkmark indicators and a network diagram" },
  { slug: "design", scene: "A thin-bezel monitor and a graphics tablet on a minimal desk, the screen showing a softly blurred, glowing UI design canvas with colour swatches" },
  { slug: "marketing", scene: "A thin-bezel monitor showing a softly blurred, glowing marketing analytics dashboard with an upward growth chart" },
  { slug: "consulting", scene: "A glass whiteboard wall with a softly blurred, glowing roadmap of sticky notes and connecting lines, a minimal desk in the foreground" },
  { slug: "uae", scene: "A thin-bezel monitor showing a softly blurred, glowing digital identity verification screen with a subtle geometric UAE-inspired pattern accent" },
];

const outDir = join(__dirname, "../../../../BIZBUYUK/generated-renders/it-groups");
await mkdir(outDir, { recursive: true });

const already = new Set((await readdir(outDir).catch(() => [])).filter((f) => f.endsWith(".png")).map((f) => f.replace(".png", "")));
const todo = GROUPS.filter((g) => !already.has(g.slug));
console.log(`${already.size} already done, ${todo.length} to go.`);

for (const g of todo) {
  const prompt = `${g.scene}. ${GRADE}`;
  const outPath = join(outDir, `${g.slug}.png`);
  console.log(`\n→ ${g.slug}`);
  try {
    const buf = await generateImagePng(prompt);
    await writeFile(outPath, buf);
    console.log(`  saved (${(buf.length / 1024).toFixed(0)} KB)`);
  } catch (e) {
    console.error(`  FAILED: ${e.message}`);
  }
}
console.log("\nDone.");

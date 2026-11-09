// Renders every still layer of the hero to a transparent WebP so the page ships a handful of images instead of
// ~30k SVG nodes. Each image is trimmed to its content and recorded in public/hero/baked/manifest.json under the
// layer's id (a hash of its markup), which the hero uses whenever the id still matches. File names carry a hash
// of the image itself, so a re-bake never collides with a copy the image optimizer or a CDN has cached.
// usage: (dev server running) node scripts/bake-hero-layers.mjs [http://localhost:3210/]
import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import sharp from "sharp";

const url = process.argv[2] || "http://localhost:3210/";
const OUT = "public/hero/baked";
const MANIFEST = path.join(OUT, "manifest.json");
const SCALE = 2;
const W = 1600, H = 1100;

fs.mkdirSync(OUT, { recursive: true });
// Without a manifest the page renders every layer inline, which is what gets photographed.
const previous = fs.existsSync(MANIFEST) ? fs.readFileSync(MANIFEST, "utf8") : null;
if (previous) fs.rmSync(MANIFEST);

const exe = process.env.CHROME || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const port = 9400 + Math.floor(Math.random() * 400);
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "hero-bake-"));
const chrome = spawn(exe, ["--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "--hide-scrollbars", "about:blank"], { stdio: "ignore" });
const sleep = ms => new Promise(r => setTimeout(r, ms));

try {
  let ws;
  for (let i = 0; i < 50 && !ws; i++) {
    try {
      const page = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find(t => t.type === "page");
      ws = new WebSocket(page.webSocketDebuggerUrl);
    } catch { await sleep(200); }
  }
  await new Promise(r => (ws.onopen = r));
  let id = 0;
  const pending = new Map();
  ws.onmessage = e => { const m = JSON.parse(e.data); pending.get(m.id)?.(m); pending.delete(m.id); };
  const send = (method, params = {}) => new Promise(r => { pending.set(++id, r); ws.send(JSON.stringify({ id, method, params })); });
  const evaluate = async expression => (await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true })).result.result.value;

  await send("Page.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: SCALE, mobile: false });
  await send("Emulation.setDefaultBackgroundColorOverride", { color: { r: 0, g: 0, b: 0, a: 0 } });
  await send("Page.navigate", { url });
  await sleep(4000);

  // Pin the hero to the top-left at its design size and hide everything but the layer being photographed. The DOM
  // is left alone (React would restore it); a stylesheet does all of it.
  const ids = await evaluate(`(async () => {
    const st = document.createElement("style");
    st.id = "bake";
    document.head.appendChild(st);
    const hero = document.querySelector(".fl-hero");
    hero.classList.add("paused");
    await document.fonts.ready;
    await Promise.all([...hero.querySelectorAll("img")].map(i => i.decode().catch(() => {})));
    return [...hero.querySelectorAll(".fl-layer[data-bake]")].map(l => l.dataset.bake);
  })()`);
  if (!ids.length) throw new Error("no still layers found: is the dev server running this branch?");

  const manifest = {};
  for (const layer of ids) {
    await evaluate(`(() => { document.getElementById("bake").textContent = \`
      html, body { background: transparent !important; }
      body * { visibility: hidden !important; }
      .fl-hero { position: fixed !important; left: 0 !important; top: 0 !important; width: ${W}px !important; transform: none !important; translate: none !important; margin: 0 !important; z-index: 2147483647 !important; }
      .fl-hero .fl-layer[data-bake="${layer}"], .fl-hero .fl-layer[data-bake="${layer}"] * { visibility: visible !important; }\`; })()`);
    await sleep(300);
    const shot = await send("Page.captureScreenshot", { format: "png", clip: { x: 0, y: 0, width: W, height: H, scale: 1 }, captureBeyondViewport: true });
    const png = Buffer.from(shot.result.data, "base64");
    const { data, info } = await sharp(png).trim({ threshold: 0 }).toBuffer({ resolveWithObject: true });
    const webp = await sharp(data).webp({ quality: 92, alphaQuality: 100, effort: 6 }).toBuffer();
    const file = `${layer}-${createHash("sha1").update(webp).digest("hex").slice(0, 8)}.webp`;
    fs.writeFileSync(path.join(OUT, file), webp);
    const left = -(info.trimOffsetLeft || 0), top = -(info.trimOffsetTop || 0);
    manifest[layer] = { src: `/hero/baked/${file}`, box: [left / SCALE, top / SCALE, info.width / SCALE, info.height / SCALE] };
    console.log(layer, manifest[layer].box.join(" "), `${Math.round(fs.statSync(path.join(OUT, file)).size / 1024)}KB`);
  }

  const kept = new Set(Object.values(manifest).map(m => path.basename(m.src)));
  for (const f of fs.readdirSync(OUT)) if (f.endsWith(".webp") && !kept.has(f)) fs.rmSync(path.join(OUT, f));
  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 1) + "\n");
} catch (e) {
  if (previous) fs.writeFileSync(MANIFEST, previous);
  throw e;
} finally {
  chrome.kill();
}
process.exit(0);

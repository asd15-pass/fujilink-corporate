// Measures the bounding box of every hero symbol in Chrome and writes src/components/hero/symbol-boxes.json.
// render.ts uses the boxes to decide which drawings overlap when it splits the scene into static and animated layers.
// usage: (dev server running) node scripts/measure-hero-symbols.mjs [http://localhost:3210/]
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const url = process.argv[2] || "http://localhost:3210/";
const exe = process.env.CHROME || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const port = 9400 + Math.floor(Math.random() * 400);
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "hero-measure-"));
const chrome = spawn(exe, ["--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "about:blank"], { stdio: "ignore" });
const sleep = ms => new Promise(r => setTimeout(r, ms));

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

await send("Page.enable");
await send("Page.navigate", { url });
await sleep(5000);
const { result } = await send("Runtime.evaluate", {
  returnByValue: true,
  expression: `(() => {
    const NS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("width", "2000"); svg.setAttribute("height", "2000");
    svg.style.cssText = "position:absolute;left:0;top:0";
    document.body.appendChild(svg);
    const out = {};
    for (const g of document.querySelectorAll(".fl-defs defs > g[id]")) {
      if (g.id.includes("__")) continue;
      const u = document.createElementNS(NS, "use");
      u.setAttribute("href", "#" + g.id);
      svg.appendChild(u);
      const b = u.getBBox();
      if (b.width || b.height) out[g.id] = [b.x, b.y, b.width, b.height].map(v => Math.round(v * 10) / 10);
      u.remove();
    }
    return out;
  })()`,
});
const boxes = result.result.value;
fs.writeFileSync("src/components/hero/symbol-boxes.json", JSON.stringify(boxes, null, 0) + "\n");
console.log(Object.keys(boxes).length, "symbols");
chrome.kill();
process.exit(0);

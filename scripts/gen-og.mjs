#!/usr/bin/env node
/**
 * Renders the OG card for both routes: the screen-print portrait beside the
 * name, role and hook, in the site's Editorial Noir palette. Composed as HTML
 * with the self-hosted fonts and screenshotted at 2x through agent-browser
 * (the same renderer scripts/capture-shots.mjs uses), then downscaled to the
 * canonical 1200x630.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const pub = (p) => fileURLToPath(new URL("../public/" + p, import.meta.url));
const dataUri = (p, mime) => `data:${mime};base64,${readFileSync(pub(p)).toString("base64")}`;
const font = (p) => dataUri(p, "font/woff2");
const portrait = dataUri("ronaldo-scotti-print.webp", "image/webp");

const CARDS = [
  {
    png: "og-image.png",
    eyebrow: "Staff Software Engineer",
    hook: ["Software engineer, architect,", "founder with an exit."],
  },
  {
    png: "og-image-pt.png",
    eyebrow: "Staff Software Engineer",
    hook: ["Engenheiro de software, arquiteto,", "fundador com exit."],
  },
];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

const html = (c) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Playfair;src:url(${font("fonts/playfair.woff2")}) format("woff2");font-weight:900}
@font-face{font-family:PlayfairIt;src:url(${font("fonts/playfair-italic.woff2")}) format("woff2");font-style:italic}
@font-face{font-family:Mono;src:url(${font("fonts/jetbrains.woff2")}) format("woff2")}
*{margin:0;padding:0;box-sizing:border-box}
body{width:1200px;height:630px;overflow:hidden;background:#17140f;position:relative;font-synthesis:none}
.bloom{position:absolute;right:70px;top:52%;width:640px;height:640px;transform:translateY(-50%);
  background:radial-gradient(circle,rgba(233,201,135,.34),rgba(201,155,69,.12) 46%,transparent 70%)}
.portrait{position:absolute;right:-40px;bottom:-14px;height:648px;width:auto;
  -webkit-mask-image:linear-gradient(100deg,transparent 6%,#000 34%),linear-gradient(to bottom,#000 88%,transparent);
  mask-image:linear-gradient(100deg,transparent 6%,#000 34%),linear-gradient(to bottom,#000 88%,transparent);
  -webkit-mask-composite:source-in;mask-composite:intersect}
.text{position:absolute;left:80px;top:0;height:630px;width:560px;display:flex;flex-direction:column;justify-content:center;gap:26px}
.role{font-family:Mono;font-size:17px;letter-spacing:.04em;line-height:1.4;color:#e9c987;text-transform:uppercase;white-space:nowrap}
.name{font-family:Playfair;font-weight:900;font-size:76px;line-height:.96;color:#f4efe6}
.rule{width:180px;height:1px;background:linear-gradient(to right,rgba(201,155,69,.75),transparent)}
.hook{font-family:PlayfairIt;font-style:italic;font-size:37px;line-height:1.2;color:#cfc6b4}
</style></head><body>
<div class="bloom"></div>
<img class="portrait" src="${portrait}">
<div class="text">
  <div class="role">${esc(c.eyebrow)}</div>
  <div class="name">Ronaldo Scotti</div>
  <div class="rule"></div>
  <div class="hook">${c.hook.map(esc).join("<br>")}</div>
</div>
</body></html>`;

const ab = (...args) => execFileSync("agent-browser", args, { stdio: "pipe", timeout: 60_000 });

ab("set", "viewport", "1200", "630", "2");
for (const c of CARDS) {
  const tmpHtml = `/tmp/${c.png}.html`;
  const tmpPng = `/tmp/${c.png}`;
  writeFileSync(tmpHtml, html(c));
  ab("open", "file://" + tmpHtml);
  ab("wait", "600");
  ab("screenshot", tmpPng);
  execFileSync("sips", ["-z", "630", "1200", tmpPng, "--out", pub(c.png)], { stdio: "pipe" });
  console.log("→ public/" + c.png);
}
try {
  ab("close");
} catch {}

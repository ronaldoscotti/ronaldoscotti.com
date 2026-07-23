#!/usr/bin/env node
/** Captures project screenshots via agent-browser and converts them to WebP. */

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public", "products");
const TMP = "/tmp/shots";

/** The viewport scrollbar bakes into the screenshot otherwise. */
const HIDE_SCROLLBAR = `(()=>{const s=document.createElement('style');s.textContent='html,body{scrollbar-width:none!important;-ms-overflow-style:none!important}::-webkit-scrollbar{display:none!important;width:0!important;height:0!important}';document.head.appendChild(s);return 'ok'})()`;

const TARGETS = [
  { slug: "meu-feed-catolico", url: "https://use.meufeedcatolico.com.br", wait: 4000 },
  { slug: "temperamentos-online", url: "https://temperamentos.online", wait: 3000 },
  { slug: "nova-aba-catolica", url: "https://nova-aba-catolica.ronaldoscotti.com", wait: 3000 },
  { slug: "orbit-pages", url: "https://www.orbitpages.com", wait: 4000 },
];

const run = (cmd, args, opts = {}) =>
  execFileSync(cmd, args, { encoding: "utf8", stdio: "pipe", timeout: 120_000, ...opts });

mkdirSync(TMP, { recursive: true });
mkdirSync(OUT, { recursive: true });

run("agent-browser", ["set", "viewport", "1440", "900", "2"]);

for (const target of TARGETS) {
  const png = join(TMP, `${target.slug}.png`);
  try {
    run("agent-browser", ["open", target.url]);
    try {
      run("agent-browser", ["wait", "--load", "networkidle"]);
    } catch {
      // Sites that poll never reach networkidle; the fixed wait covers it.
    }
    run("agent-browser", ["wait", String(target.wait)]);
    run("agent-browser", ["eval", HIDE_SCROLLBAR]);
    run("agent-browser", ["screenshot", png]);

    if (!existsSync(png) || statSync(png).size < 5000) throw new Error("empty screenshot");

    const jpg = join(TMP, `${target.slug}.jpg`);
    run("sips", ["-Z", "1280", "-s", "format", "jpeg", png, "--out", jpg]);
    run("cwebp", ["-q", "80", "-quiet", jpg, "-o", join(OUT, `${target.slug}.webp`)]);

    const kb = Math.round(statSync(join(OUT, `${target.slug}.webp`)).size / 1024);
    console.log(`✓ ${target.slug} (${kb} KB)`);
  } catch (err) {
    console.warn(`! ${target.slug}: ${String(err.message).split("\n")[0]}`);
    console.warn("  keeping the previous image, if any");
  }
}

try {
  run("agent-browser", ["close"]);
} catch {}

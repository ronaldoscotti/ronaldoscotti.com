#!/usr/bin/env node
/** Generates the og-image for both routes as SVG, in the site's template. */
import { writeFileSync } from "node:fs";

const CARDS = [
  { file: "og-image.svg", line1: "I founded a SaaS, scaled it,", line2: "and sold it. I never",
    line3: "stopped writing code.", role: "Staff Software Engineer · Software Architect" },
  { file: "og-image-pt.svg", line1: "Fundei um SaaS, escalei", line2: "e vendi. Nunca parei",
    line3: "de programar.", role: "Staff Software Engineer · Arquiteto de software" },
];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

for (const c of CARDS) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#EFE6D6"/>
  <g font-family="Newsreader, Georgia, serif" fill="#1A1410">
    <text x="80" y="215" font-size="72" font-weight="500">${esc(c.line1)}</text>
    <text x="80" y="300" font-size="72" font-weight="500">${esc(c.line2)}</text>
    <text x="80" y="385" font-size="72" font-weight="500">${esc(c.line3)}</text>
  </g>
  <line x1="80" y1="470" x2="1120" y2="470" stroke="#D8CBB6" stroke-width="1"/>
  <text x="80" y="522" font-family="Inter, system-ui, sans-serif" font-size="26" font-weight="600" fill="#1A1410">Ronaldo Scotti</text>
  <text x="80" y="558" font-family="JetBrains Mono, monospace" font-size="19" fill="#6D5949">${esc(c.role)}</text>
</svg>`;
  writeFileSync(new URL(`../public/${c.file}`, import.meta.url), svg);
  console.log("→ public/" + c.file);
}

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
  <rect width="1200" height="630" fill="#17140F"/>
  <g font-family="Playfair Display, Georgia, serif" fill="#F4EFE6" font-weight="800">
    <text x="80" y="215" font-size="70">${esc(c.line1)}</text>
    <text x="80" y="298" font-size="70">${esc(c.line2)}</text>
    <text x="80" y="381" font-size="70">${esc(c.line3)}</text>
  </g>
  <line x1="80" y1="470" x2="1120" y2="470" stroke="#C99B45" stroke-opacity="0.45" stroke-width="1"/>
  <text x="80" y="522" font-family="Inter, system-ui, sans-serif" font-size="26" font-weight="600" fill="#F4EFE6">Ronaldo Scotti</text>
  <text x="80" y="558" font-family="JetBrains Mono, monospace" font-size="19" fill="#A99F8E">${esc(c.role)}</text>
</svg>`;
  writeFileSync(new URL(`../public/${c.file}`, import.meta.url), svg);
  console.log("→ public/" + c.file);
}

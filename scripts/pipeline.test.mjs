/**
 * Guardrails for the activity pipeline. The refresh jobs commit
 * src/data/activity.json to main on their own, so these run before the commit
 * (in the job and again in CI on the PR) and fail loudly rather than let a
 * malformed file reach the site, where it would break Activity.astro at runtime.
 *
 * Stdlib node:test only — no framework.
 */

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { toSlices } from "./fetch-languages.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DATA = JSON.parse(readFileSync(join(ROOT, "src", "data", "activity.json"), "utf8"));

test("toSlices returns [] for empty totals", () => {
  assert.deepEqual(toSlices({}), []);
  assert.deepEqual(toSlices({ TypeScript: 0 }), []);
});

test("toSlices percentages never exceed 100", () => {
  const slices = toSlices({ TypeScript: 500, PHP: 300, Vue: 200 });
  const sum = slices.reduce((s, l) => s + l.percent, 0);
  assert.ok(sum <= 100.5, `sum was ${sum}`);
  assert.ok(sum >= 99, `sum was ${sum}`);
});

test("toSlices drops slices below 0.5% and groups the tail into __other__", () => {
  const totals = { TypeScript: 990, PHP: 5, Vue: 3, Python: 1, Ruby: 1 };
  const slices = toSlices(totals);
  // Nothing under 0.5% survives as its own slice.
  assert.ok(slices.every((l) => l.percent >= 0.5));
  // TypeScript dominates and stays first.
  assert.equal(slices[0].name, "TypeScript");
});

test("toSlices caps at 6 named slices plus an optional __other__", () => {
  const totals = {};
  for (let i = 0; i < 12; i++) totals[`L${i}`] = 100 - i; // 12 languages, all >0.5%
  const slices = toSlices(totals);
  const named = slices.filter((l) => l.name !== "__other__");
  assert.ok(named.length <= 6, `got ${named.length} named slices`);
  const other = slices.find((l) => l.name === "__other__");
  assert.ok(other, "the tail should be grouped into __other__");
});

test("every slice has a string name and a numeric percent", () => {
  const slices = toSlices({ TypeScript: 3, PHP: 2, Vue: 1 });
  for (const l of slices) {
    assert.equal(typeof l.name, "string");
    assert.equal(typeof l.percent, "number");
    assert.ok(Number.isFinite(l.percent));
  }
});

test("committed activity.json has a well-formed github block", () => {
  const gh = DATA.github;
  assert.ok(gh, "github key is present");
  assert.equal(typeof gh.total, "number");
  assert.equal(typeof gh.activeDays, "number");
  assert.match(gh.from, /^\d{4}-\d{2}-\d{2}$/);
  assert.match(gh.to, /^\d{4}-\d{2}-\d{2}$/);
  assert.ok(Array.isArray(gh.weeks) && gh.weeks.length >= 50, "at least 50 weeks");
  for (const week of gh.weeks) {
    assert.ok(Array.isArray(week), "each week is an array");
    for (const day of week) assert.equal(typeof day, "number");
  }
});

test("committed activity.json has a well-formed languages block", () => {
  const langs = DATA.languages;
  assert.ok(langs && Array.isArray(langs.items), "languages.items is an array");
  assert.ok(langs.items.length > 0, "at least one language");
  for (const l of langs.items) {
    assert.equal(typeof l.name, "string");
    assert.ok(l.name.length > 0);
    assert.equal(typeof l.percent, "number");
    assert.ok(l.percent >= 0 && l.percent <= 100, `percent out of range: ${l.percent}`);
  }
  const sum = langs.items.reduce((s, l) => s + l.percent, 0);
  assert.ok(sum <= 100.5, `language percentages sum to ${sum}`);
});

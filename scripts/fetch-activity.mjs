#!/usr/bin/env node
/**
 * Builds src/data/activity.json. Runs on prebuild, so every deploy is fresh.
 *
 * The public contributions endpoint needs no token and already includes private
 * contributions. GITHUB_TOKEN switches to the GraphQL API when available.
 *
 * Language data comes from scripts/fetch-languages.mjs, not from here.
 * A network failure falls back to the committed JSON and never breaks the build.
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "data", "activity.json");
const GH_USER = "ronaldoscotti";
const TIMEOUT = 12_000;

const previous = existsSync(OUT) ? JSON.parse(readFileSync(OUT, "utf8")) : null;

const get = (url, headers = {}) =>
  fetch(url, { headers: { "User-Agent": "ronaldoscotti.com build", ...headers }, signal: AbortSignal.timeout(TIMEOUT) });

/** Groups days into Sunday-to-Saturday weeks, padding the first one. */
function toWeeks(days) {
  const weeks = [];
  let week = [];
  for (const { date, count } of days) {
    const weekday = (new Date(`${date}T00:00:00Z`).getUTCDay() + 7) % 7;
    if (weekday === 0 && week.length) {
      weeks.push(week);
      week = [];
    }
    if (!weeks.length && !week.length && weekday > 0) week = Array(weekday).fill(0);
    week.push(count);
  }
  if (week.length) weeks.push(week);
  return weeks;
}

const summarize = (days) => ({
  total: days.reduce((sum, d) => sum + d.count, 0),
  activeDays: days.filter((d) => d.count > 0).length,
  from: days[0].date,
  to: days[days.length - 1].date,
  weeks: toWeeks(days),
});

async function githubGraphQL(token) {
  const query = `query($login:String!){user(login:$login){contributionsCollection{contributionCalendar{
    totalContributions weeks{ contributionDays{ contributionCount date } } }}}}`;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: { login: GH_USER } }),
    signal: AbortSignal.timeout(TIMEOUT),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const json = await res.json();
  if (json.errors) throw new Error(json.errors.map((e) => e.message).join("; "));

  const days = json.data.user.contributionsCollection.contributionCalendar.weeks
    .flatMap((w) => w.contributionDays)
    .map((d) => ({ date: d.date, count: d.contributionCount }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return summarize(days);
}

/** Token-free path: each cell carries data-date + id, counts live in <tool-tip>. */
async function githubPublic() {
  const res = await get(`https://github.com/users/${GH_USER}/contributions`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const html = await res.text();

  const tips = new Map(
    [...html.matchAll(/<tool-tip\b[^>]*?for="([^"]+)"[^>]*?>([\s\S]*?)<\/tool-tip>/g)].map((m) => [m[1], m[2]]),
  );

  const days = [...html.matchAll(/data-date="(\d{4}-\d{2}-\d{2})"\s+id="([^"]+)"/g)]
    .map(([, date, id]) => {
      const label = (tips.get(id) || "").trim();
      const match = label.match(/^([\d,]+)\s+contribution/);
      return { date, count: match ? Number(match[1].replace(/,/g, "")) : 0 };
    })
    .sort((a, b) => a.date.localeCompare(b.date));

  if (days.length < 300) throw new Error(`only ${days.length} days parsed, markup changed`);
  return summarize(days);
}

async function wakatime(key) {
  const res = await get("https://wakatime.com/api/v1/users/current/stats/last_year", {
    Authorization: `Basic ${Buffer.from(key).toString("base64")}`,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const { data } = await res.json();
  const langs = (data.languages || []).filter((l) => l.percent >= 1);

  const top = langs.slice(0, 6).map((l) => ({ name: l.name, percent: Number(l.percent.toFixed(1)) }));
  const rest = langs.slice(6).reduce((sum, l) => sum + l.percent, 0);
  if (rest >= 1) top.push({ name: "__other__", percent: Number(rest.toFixed(1)) });

  return { languages: top };
}

const out = { fetchedAt: new Date().toISOString().slice(0, 10) };

const token = process.env.GITHUB_TOKEN;
try {
  out.github = token ? await githubGraphQL(token) : await githubPublic();
  console.log(
    `✓ GitHub (${token ? "graphql" : "public"}): ${out.github.total} contributions, ${out.github.activeDays} active days`,
  );
} catch (err) {
  console.warn(`! GitHub failed: ${err.message}`);
  if (!previous?.github) {
    console.warn("  no previous data: the Activity section will not render");
    process.exit(0);
  }
  out.github = previous.github;
  console.warn(`  using snapshot from ${previous.fetchedAt}`);
  out.stale = true;
}

// Must be preserved: this runs on prebuild and would otherwise wipe the key
// written by fetch-languages.mjs.
if (previous?.languages) out.languages = previous.languages;

const wakaKey = process.env.WAKATIME_API_KEY;
if (wakaKey) {
  try {
    const waka = await wakatime(wakaKey);
    out.languages = { items: waka.languages, source: "wakatime" };
    console.log(`✓ WakaTime: ${waka.languages.length} languages`);
  } catch (err) {
    console.warn(`! WakaTime failed: ${err.message}`);
  }
}

writeFileSync(OUT, JSON.stringify(out, null, 2) + "\n");
console.log(`→ src/data/activity.json`);

#!/usr/bin/env node
/**
 * Language breakdown without WakaTime.
 *
 * LOCAL_REPOS (preferred): scans local git repos and counts lines changed per
 * file extension in the last year, authored by him. Measures effort, and reaches
 * work code that never lands on his personal GitHub.
 *
 * GITHUB_TOKEN (fallback): sums language bytes across his repos, weighted by
 * recent activity so a large idle repo doesn't dominate.
 *
 * Writes only the "languages" key of src/data/activity.json.
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import { homedir } from "node:os";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "data", "activity.json");
const MAX_SLICES = 6;

const BY_EXT = {
  ts: "TypeScript", tsx: "TypeScript", mts: "TypeScript",
  js: "JavaScript", jsx: "JavaScript", mjs: "JavaScript", cjs: "JavaScript",
  php: "PHP",
  vue: "Vue",
  py: "Python",
  sql: "SQL",
  astro: "Astro",
  css: "CSS", scss: "CSS",
  blade: "Blade",
  go: "Go", rb: "Ruby", java: "Java", rs: "Rust", sh: "Shell", kt: "Kotlin", swift: "Swift",
};

const IGNORE = /(^|\/)(node_modules|vendor|dist|build|\.next|\.astro|coverage|public\/build)\//;
const LOCKS = /(package-lock\.json|yarn\.lock|composer\.lock|pnpm-lock\.yaml)$/;

/** Collapses raw totals into at most MAX_SLICES slices, with a grouped remainder. */
export function toSlices(totals) {
  const sum = Object.values(totals).reduce((a, b) => a + b, 0);
  if (!sum) return [];

  const sorted = Object.entries(totals)
    .map(([name, value]) => ({ name, percent: (value / sum) * 100 }))
    .filter((l) => l.percent >= 0.5)
    .sort((a, b) => b.percent - a.percent);

  const top = sorted
    .slice(0, MAX_SLICES)
    .map((l) => ({ name: l.name, percent: Number(l.percent.toFixed(1)) }));
  const rest = sorted.slice(MAX_SLICES).reduce((s, l) => s + l.percent, 0);
  // Locale-neutral key; the component translates it.
  if (rest >= 1) top.push({ name: "__other__", percent: Number(rest.toFixed(1)) });
  return top;
}

async function fromGitHub(token) {
  const gh = async (path) => {
    const res = await fetch(`https://api.github.com${path}`, {
      headers: {
        Authorization: `bearer ${token}`,
        Accept: "application/vnd.github+json",
        "User-Agent": "ronaldoscotti.com build",
      },
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) throw new Error(`GitHub ${path}: HTTP ${res.status}`);
    return res.json();
  };

  const repos = [];
  for (let page = 1; page <= 5; page++) {
    const batch = await gh(`/user/repos?per_page=100&page=${page}&affiliation=owner,collaborator`);
    repos.push(...batch);
    if (batch.length < 100) break;
  }

  const yearAgo = Date.now() - 365 * 864e5;
  const totals = {};
  let counted = 0;

  for (const repo of repos) {
    if (repo.fork || repo.archived) continue;

    const weight = new Date(repo.pushed_at).getTime() >= yearAgo ? 3 : 1;

    let langs;
    try {
      langs = await gh(`/repos/${repo.full_name}/languages`);
    } catch {
      continue;
    }

    for (const [name, bytes] of Object.entries(langs)) {
      totals[name] = (totals[name] || 0) + bytes * weight;
    }
    counted++;
  }

  if (!counted) throw new Error("no repository with detectable language");
  return { items: toSlices(totals), source: "github", repos: counted };
}

function fromLocal(dirs) {
  const since = new Date(Date.now() - 365 * 864e5).toISOString().slice(0, 10);
  const emails = (process.env.GIT_EMAILS || "ronaldoscottis@hotmail.com,ronaldoscottis@gmail.com")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);

  const totals = {};
  let scanned = 0;

  for (const dir of dirs) {
    const path = resolve(dir.trim().replace(/^~/, homedir()));
    if (!existsSync(join(path, ".git"))) continue;

    let out;
    try {
      out = execFileSync(
        "git",
        [
          "-C", path,
          "log",
          `--since=${since}`,
          ...emails.map((e) => `--author=${e}`),
          "--numstat",
          "--pretty=format:",
          "--no-merges",
        ],
        { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 },
      );
    } catch {
      continue;
    }

    for (const line of out.split("\n")) {
      const [add, del, file] = line.split("\t");
      if (!file || add === "-") continue;
      if (IGNORE.test(file) || LOCKS.test(file)) continue;

      const lang = BY_EXT[file.split(".").pop()?.toLowerCase()];
      if (!lang) continue;

      totals[lang] = (totals[lang] || 0) + Number(add) + Number(del);
    }
    scanned++;
  }

  if (!scanned) throw new Error("no git repository found in LOCAL_REPOS");
  return { items: toSlices(totals), source: "local-git", repos: scanned };
}

async function main() {
  const current = existsSync(OUT) ? JSON.parse(readFileSync(OUT, "utf8")) : {};
  const local = process.env.LOCAL_REPOS;
  const token = process.env.GITHUB_TOKEN;

  let languages;
  try {
    if (local) languages = fromLocal(local.split(","));
    else if (token) languages = await fromGitHub(token);
    else {
      console.warn("! neither LOCAL_REPOS nor GITHUB_TOKEN set");
      process.exit(0);
    }
  } catch (err) {
    console.warn(`! failed: ${err.message}`);
    process.exit(0);
  }

  if (!languages.items.length) {
    console.warn("! nothing above threshold, keeping previous data");
    process.exit(0);
  }

  current.languages = languages;
  writeFileSync(OUT, JSON.stringify(current, null, 2) + "\n");
  console.log(
    `✓ languages (${languages.source}, ${languages.repos} repos): ` +
      languages.items.map((l) => `${l.name} ${l.percent}%`).join(", "),
  );
}

// Only fetch when run directly; importing (for tests) must have no side effects.
if (process.argv[1] === fileURLToPath(import.meta.url)) await main();

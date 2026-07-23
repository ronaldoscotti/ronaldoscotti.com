#!/usr/bin/env bash
# Refreshes heatmap + languages, commits if changed. Invoked by launchd.
set -euo pipefail
cd "$(dirname "$0")/.."

echo "--- $(date '+%Y-%m-%d %H:%M')"

node scripts/fetch-activity.mjs

LOCAL_REPOS="$(find "$HOME/work" -maxdepth 3 -name .git -type d 2>/dev/null | sed 's|/.git$||' | tr '\n' ',')" \
  node scripts/fetch-languages.mjs

# --porcelain, not "git diff": diff cannot see an untracked file.
if [ -z "$(git status --porcelain src/data/activity.json)" ]; then
  echo "no change"
  exit 0
fi

git add src/data/activity.json
git commit -m "chore: refresh activity"
git push
echo "committed and pushed"

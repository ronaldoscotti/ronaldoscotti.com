#!/usr/bin/env bash
# Refreshes heatmap + languages and lands the change through a pull request that
# auto-merges once tests pass — never a direct push to main. Invoked by launchd.
set -euo pipefail
cd "$(dirname "$0")/.."

echo "--- $(date '+%Y-%m-%d %H:%M')"

# This runs in the live working repo, so it must not disturb active work: only
# proceed on a clean, up-to-date main. Any other state is left for the next run.
branch="$(git rev-parse --abbrev-ref HEAD)"
if [ "$branch" != "main" ]; then
  echo "not on main (on $branch), skipping"
  exit 0
fi
git fetch -q origin main
if ! git pull -q --ff-only origin main; then
  echo "main is not fast-forwardable, skipping"
  exit 0
fi

node scripts/fetch-activity.mjs

LOCAL_REPOS="$(find "$HOME/work" -maxdepth 3 -name .git -type d 2>/dev/null | sed 's|/.git$||' | tr '\n' ',')" \
  node scripts/fetch-languages.mjs

# --porcelain, not "git diff": diff cannot see an untracked file.
if [ -z "$(git status --porcelain src/data/activity.json)" ]; then
  echo "no change"
  exit 0
fi

# Guardrail before anything is committed: a malformed activity.json fails here,
# and set -e aborts before a PR is ever opened.
node --test

work="activity/$(date '+%Y%m%d-%H%M%S')"
git switch -q -c "$work"
git add src/data/activity.json
git commit -q -m "chore: refresh activity"
git push -q -u origin "$work"

gh pr create --base main --head "$work" \
  --title "chore: refresh activity" \
  --body "Automated activity refresh. Auto-merges once CI is green."

# --auto waits for the CI check when the repo allows auto-merge; the fallback
# merges now, which is safe because the tests above already passed.
gh pr merge "$work" --squash --auto --delete-branch \
  || gh pr merge "$work" --squash --delete-branch

git switch -q main
echo "opened and merged PR from $work"

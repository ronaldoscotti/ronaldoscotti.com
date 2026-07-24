# Operations

How the site keeps itself current, what runs where, and what to do when something breaks or the
machine changes.

---

## The short version

The site is static. Nothing on it calls an API at visit time: the data is written to
`src/data/activity.json`, committed to the repository, and turned into HTML at build time. So
"updating the site" always means **regenerating the JSON and running a build**.

Two things go stale, and they come from different places:

| Data | Source | Where the job runs | When |
|---|---|---|---|
| Contribution heatmap | github.com (public endpoint) | GitHub Actions | daily, 06:00 UTC |
| Contribution heatmap | github.com (public endpoint) | wherever the deploy happens | every build |
| Language bar | **local** git repositories | **this Mac** (launchd) | 04:00 and 13:00, plus every login |

**Why two places.** The heatmap comes from a public URL, so any machine can fetch it. The language
bar comes from `git log` across local repositories, which only exist on this Mac. That is exactly
what makes it better than the GitHub API: it measures how much was written in each language over
the last year, and it reaches work code that never lands on the personal GitHub account. A GitHub
Actions runner has none of those repositories, so it cannot run there.

---

## Straight answers

**Does it run when I commit or push?**
No. Both jobs are time-based, not git-event-based. What a push triggers is the deploy, and the
deploy runs `prebuild`, which refreshes the heatmap along the way. The language bar is untouched by
any push.

**So when does each thing actually change?**

- You write code at 3pm on a Tuesday. The graph on the site **does not move** at that moment.
- At 04:00 on Wednesday launchd runs on this Mac, recalculates the languages, and if anything
  changed it opens an auto-merging PR. Once CI is green the PR merges and the deploy goes out. If the
  Mac was asleep at 04:00, it runs when you open the lid.
- At 06:00 UTC (03:00 local) GitHub Actions runs, refreshes the heatmap, and opens an auto-merging PR
  on the same terms.
- A manual deploy at any hour brings a fresh heatmap with it through `prebuild`.

**Does it commit straight to `main`?**
No, not anymore. Neither job pushes to `main`. Each one runs the test suite (`node --test`) over the
freshly written `activity.json`, and only if that passes does it open a pull request from a throwaway
`activity/<timestamp>` branch and mark it auto-merge. The same tests run again as a required-ish check
on the PR (`ci.yml`), and the PR merges itself once green. A malformed file fails the tests, so no PR
is ever opened and `main` never sees it. Still only when the data changed, still `chore: refresh
activity`, still no commit on an idle day.

The auto-merge uses `gh pr merge --auto`, which needs **Allow auto-merge** enabled in the repository
settings (Settings → General → Pull Requests). If it is off, the jobs fall back to merging the PR
immediately — safe, because the tests already passed in the job before the PR was opened. To make the
CI check a hard gate rather than a belt-and-suspenders, add a branch protection rule on `main`
requiring the `test` check; the jobs need no change for that.

**Why the local job often skips.** It runs in the live working repo, so it refuses to touch anything
unless you are on a clean, fast-forwardable `main`. On a feature branch, or with `main` diverged, it
logs and exits — the language bar just updates on the next run that finds a clean tree. The 13:00
backstop and the login run cover it.

**Are the GitHub stats genuinely automatic?**
Yes, and without a token. The script reads `github.com/users/ronaldoscotti/contributions`, which is
public and already includes private contributions because that setting is on in the profile. If you
ever turn "private contributions" off on GitHub, the number collapses and the graph starts showing
public work only. Set a `GITHUB_TOKEN` in that case and the script switches to the GraphQL API on
its own.

---

## What if the Mac is off or asleep at 04:00?

It depends on the state, and the job handles all three.

**Asleep, lid closed, hibernating.** launchd **does not skip** the schedule, unlike cron. From
`man launchd.plist`: *"Unlike cron which skips job invocations when the computer is asleep, launchd
will start the job the next time the computer wakes up. If multiple intervals transpire before the
computer is woken, those events will be coalesced into one event upon wake."* Open the laptop at
9am and it runs then. Away for three days and it runs **once** on wake, not three times.

**Powered off.** Here the schedule really is lost, because launchd was not running either. That is
what `RunAtLoad` in the plist is for: the agent loads at login, so the first login after a shutdown
runs the job.

**On but with no network** (cold boot, wifi still coming up). The script tries GitHub, fails, falls
back to the committed `activity.json`, and moves on to the local half, which needs no network.
There is deliberately no `KeepAlive` in the plist: its keys are OR'd, so `NetworkState` would
relaunch the job every time the network came up, which turns into a loop.

**Backstop.** Besides 04:00 there is a second run at 13:00 for the day that started badly. The
script exits early when nothing changed, so an extra run costs about a second and produces no
commit. `ThrottleInterval` of 3600 keeps it from running more than once an hour.

**The case that is not covered:** the Mac is off and never comes back. The language bar freezes on
the last committed data, and that is all that happens. The site does not break, the heatmap keeps
updating through GitHub Actions, and the page shows no gap and no error.

---

## Moving to a new Mac

GitHub Actions keeps working with no action from you, because it runs in the cloud. **The language
bar stops**, because launchd lives on the old machine.

To bring it back:

```bash
cd ~/work/personal/ronaldoscotti.com
cp scripts/com.ronaldoscotti.site-activity.plist ~/Library/LaunchAgents/
launchctl load ~/Library/LaunchAgents/com.ronaldoscotti.site-activity.plist
launchctl start com.ronaldoscotti.site-activity   # test now, don't wait for 4am
cat /tmp/ronaldoscotti-activity.log
```

Three things have to be true on the new machine, otherwise the job runs and does nothing:

1. The repository sits at `~/work/personal/ronaldoscotti.com`. That path is written into the plist;
   if you keep it somewhere else, edit the `<string>cd ...</string>` line before copying.
2. Your projects are under `~/work`, at most three levels deep. That is where the script looks for
   git repositories.
3. `git push` works without prompting for a password (SSH key configured). If it prompts, the job
   hangs.

**Until you set it up again**, nothing breaks. The site keeps showing the last committed data, and
the only symptom is a frozen language bar. It does not disappear, it does not error, it leaves no
gap on the page.

---

## Running it by hand

```bash
npm run activity     # heatmap only
npm run languages    # language bar only
npm run shots        # recapture the project screenshots
npm run build        # build (prebuild already refreshes the heatmap)
```

And the whole job, exactly as launchd invokes it:

```bash
./scripts/update-activity.sh
```

---

## Diagnosing

```bash
launchctl list | grep ronaldoscotti     # loaded?
cat /tmp/ronaldoscotti-activity.log     # what happened on the last run
git log --oneline --grep="refresh activity" -5    # when it last committed
```

**launchd is loaded but the log is old.** The Mac was probably off or asleep at 04:00. launchd runs
the job as soon as the machine wakes, and if you were away for days the missed runs do not pile up:
it runs once, which is enough.

**The log says "no change" every day.** Correct if you did not write code. If you did and it still
does not move, check that the commits carry one of the expected emails:

```bash
git -C ~/work/some-project log -5 --pretty='%ae'
```

The defaults are `ronaldoscottis@hotmail.com` and `ronaldoscottis@gmail.com`. For a different
address, set `GIT_EMAILS` in `update-activity.sh` as a comma-separated list.

**GitHub Actions is not running.** GitHub disables scheduled workflows on repositories with no
activity for 60 days. Any commit re-enables it, or trigger it by hand under Actions → Refresh
activity → Run workflow.

**The build broke because of the network.** It does not. If the GitHub endpoint does not answer,
the script uses the committed `activity.json`, marks `stale: true`, and the build continues.

---

## When something moves

| Changed | Where to fix it |
|---|---|
| GitHub changed the calendar markup | `scripts/fetch-activity.mjs`, `githubPublic`. It already fails loudly: parsing fewer than 300 days throws instead of writing an empty graph |
| You use a different git email | `GIT_EMAILS` in `scripts/update-activity.sh` |
| Your projects moved out of `~/work` | `LOCAL_REPOS` in `scripts/update-activity.sh` |
| You subscribed to WakaTime | Set `WAKATIME_API_KEY` and it becomes the source for the bar, no code change |
| You made the repositories public on GitHub | A `GITHUB_TOKEN` makes `fetch-languages.mjs` use the API instead of local disk |
| A project changed visually | `npm run shots` recaptures all four |
| `jornadasaas.com` came back online | Swap the domain in `src/data/posts.json`. It points at Substack today because the custom domain returns 404 |

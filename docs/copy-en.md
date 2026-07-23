# Copy (EN)

English copy for `ronaldoscotti.com`. Same structure as `copy-pt.md`. The English is pulled
from `cv-nagringa.md` and `linkedin.md`, which were written natively for the US reader, not
translated from the Portuguese.

---

## Header

```
Ronaldo Scotti      About  Activity  Experience  Projects  Writing  Contact   [Résumé (PDF)]
```

---

## Top

```
Staff Software Engineer · Software Architect

Ronaldo Scotti

Software engineer, architect, founder with an exit.

I design architecture, solve whatever comes up, and get AI coding agents to ship code a senior
would sign off on. PHP/Laravel, TypeScript/React, LLM systems in production.
```

---

## About

```
I founded a SaaS, grew it to 67,000 users, and sold it to Eduzz. I never stopped writing code.
Today I'm the technical reference for a team of nine and I ship every day, much of it with AI
coding agents. I've been the one who had to make payroll and keep the product up at the same
time. Catholic, married to Poli, father to Bento, living near the countryside in southern Brazil
where I grew up.
```

---

## Activity

```
Activity
```

GitHub contribution graph (the heatmap, direct).

WakaTime language breakdown (the chart, direct).

**Stack:**

```
TypeScript · Node.js · React · Vue · PHP/Laravel · Capacitor · SQL
PostgreSQL · SQL Server · MySQL · MongoDB · Redis · AWS · Docker · Kubernetes · Databricks
LLM apps · AI agents & MCP · prompt engineering · Claude Code
```

---

## Experience

```
Experience
```

`→ Download résumé`

### Staff Software Engineer · Eduzz

`Mar 2023 · present · remote`

The technical reference for a nine-person team at one of Brazil's largest creator-economy
platforms (~R$1.2B annual GMV). I own the commercial operation's automation and data layer end to
end, and the technical calls that come with it.

```
· Multi-program scoring engine (Strategy Pattern core, 40+ rules) that replaced manual commercial
  decisions with an automated ranking pipeline, with Bayesian confidence-weighting so low-volume
  sellers aren't judged on noisy data.
· Chargebacks and disputes event layer across four payment providers (Stripe, Pagar.me, Mercado
  Pago, Iugu), built idempotent on top of unreliable webhooks.
· The product-pipeline API the commercial team runs on: parallel fan-out across four databases
  (SQL Server, MySQL, MongoDB, Postgres), with a cache that cuts latency 50-70% and database load
  ~90%.
· Config-driven qualification engine, 2M+ qualifications processed, publishing completion events
  to RabbitMQ through an idempotent outbox.
· Living documentation for the automations: a read-only pipeline turns the HubSpot and Botpress
  APIs into versioned docs, and an AI layer fills intent without inventing structure.
· I ship daily with AI coding agents (Claude Code) and own the prompts, evals, and review loop
  that keep that code production-safe.
```

### Founder & CEO (exit) · Orbit, acquired by Eduzz

`Sep 2019 · Aug 2023`

I founded Orbit Pages, a landing-page SaaS for digital creators, and ran it for four years to the
acquisition.

```
· Built the product solo. Eight months to first sale, then 67,000 free users, 1,500 paying
  customers, and R$100k+ MRR.
· The planned VC round fell through in the pandemic and I took the company to profit without it.
  MRR from R$30k to R$100k, and annual-plan revenue from 20% to 80% by reworking pricing and
  defaults, with zero new features.
· Stayed lead architect throughout. Re-platformed the V1 for near-infinite scale (S3 and Vercel
  for pages, critical integrations on Kubernetes) while running the business, investors, and
  support. It still runs today, years after the exit.
· Grew the team from 2 to 18 and back to the lean 7 that ran it to the acquisition.
```

### Full-stack engineer · on my own

`2015 · 2019`

Hundreds of projects on my own. I started building websites to spec and ended up designing the
payment systems clients trusted with real money. PHP, JavaScript, WordPress, React, Vue, Node.

```
· Custom checkout (Doutor Nature): five months to move the client off a closed full-suite
  provider and keep the installment interest. Gateways behind one interface, idempotency keyed on
  cart and product, reconciliation against the processor API. ~R$3M in its first full production
  month.
· A bitcoin-transacting store, from scratch, in raw PHP.
· Selected clients: Bruno Souza, the Java Champion, who trusted me with his businesses; ACE
  Startups, engineering for Natura, Banco BMG, and Algar Telecom; and TDC, Brazil's largest
  developer conference.
```

### Education

```
MBA, Technology for Business: AI, Data Science and Big Data · PUCRS · 2019-2020
B.Sc., Computer Science · Unifacvest · 2012-2015
```

---

## Projects

```
Projects

Built and run solo, from the database to the app store.
```

### Meu Feed Católico

```
A Catholic devotional platform I build and run solo. Laravel API, Vue 3 front end, one codebase
shipping to web, PWA, and native iOS/Android via Capacitor. The hard parts are multi-canon Bible
versification mapping, idempotent ingestion pipelines, and SPA prerendering for crawlers. 300+
tests.
```

### Temperamentos Online

```
A temperament assessment with a versioned, fully deterministic scoring engine isolated from the
framework, with its own test suite, so results stay reproducible as the method changes. Laravel,
Inertia, React 19, TypeScript.
```

### Nova Aba Católica

```
A Chrome extension (Manifest V3) that turns every new tab into a moment of prayer. Serverless
backend on Vercel, PT/EN.
```

---

## Writing

```
Writing

I write to think. 50+ issues telling the Orbit story from the inside, no filter, and now I'm
writing again.
```

**Post list.** Four visible, a button reveals the remaining six. Each item opens the article on
Substack, with cover, date, the newsletter badge, and a `PT` tag: the archive is in Portuguese.

```
[cover]  [date]   JORNADA SAAS   PT
         [title]
         [one line]

[ Show more +6 ]      See the full archive
```

---

## Contact

```
Contact

ronaldoscottis@gmail.com

LinkedIn · GitHub · Résumé (PDF)

Florianópolis, Brazil · UTC-3, overlaps US business hours · remote since 2015
```

**Footer:**

```
Ronaldo Scotti · Ora et labora · PT · EN
```

---

Nota: não existe perfil de voz EN mineirado (o `write-in-my-voice` marca o inglês como estado-alvo,
não amostrado). Então usei o inglês que você mesmo já escreveu no CV e no LinkedIn como fonte, que
é o registro que você está mirando. Se algum trecho não soar como você quando ler em voz alta, me
diz qual que eu ajusto.

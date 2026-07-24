import type { Language, Translations } from "./types";

// EN is not a translation of PT: both derive from the CV, and audience-specific
// lines belong to one side only.

export const translations: Record<Language, Translations> = {
  "pt-BR": {
    seo: {
      title: "Ronaldo Scotti · Staff Software Engineer e arquiteto de software",
      description:
        "Fundei um SaaS, escalei e vendi. Nunca parei de programar. Arquitetura, sistemas de pagamento e automação em produção, com agente de IA entregando código que passa em revisão de sênior.",
      ogTitle: "Ronaldo Scotti · Fundei um SaaS, escalei e vendi. Nunca parei de programar.",
      ogDescription: "Staff Software Engineer e arquiteto de software. Florianópolis, remoto.",
    },

    nav: {
      links: [
        { href: "#sobre", label: "Sobre" },
        { href: "#atividade", label: "Atividade" },
        { href: "#experiencia", label: "Experiência" },
        { href: "#projetos", label: "Projetos" },
        { href: "#escrita", label: "Escrita" },
        { href: "#contato", label: "Contato" },
      ],
      resume: "Currículo",
      skipToContent: "Pular para o conteúdo",
      switchLabel: "Read in English",
      theme: { toDark: "Usar tema escuro", toLight: "Usar tema claro" },
    },

    hero: {
      role: "Staff Software Engineer · Arquiteto de software",
      name: "Ronaldo Scotti",
      tagline: "Engenheiro de software, arquiteto, fundador com exit.",
      intro:
        "Desenho arquitetura, resolvo o que aparece e faço agente de IA entregar código que passa em revisão de sênior. PHP e Laravel, TypeScript e React, LLM em produção.",
      photoAlt: "Ronaldo Scotti",
    },

    about: {
      heading: "Sobre",
      body: "Fundei um SaaS, cheguei a 67 mil usuários e vendi pra Eduzz. Nunca parei de programar. Hoje sou a referência técnica de um time de nove e subo código todo dia, boa parte com agente de IA. Já fui o responsável por pagar os salários e por manter o produto no ar ao mesmo tempo. Católico, casado com a Poli, pai do Bento, morando perto do interior de Santa Catarina onde cresci.",
    },

    activity: {
      heading: "Atividade",
      contributions: "{total} contribuições no último ano, em {days} dias",
      githubCta: "Ver no GitHub",
      languagesHeading: "Linguagens",
      otherLanguages: "Outras",
      stackHeading: "Stack",
      stack: [
        "TypeScript · Node.js · React · Vue · PHP/Laravel · Capacitor · SQL",
        "PostgreSQL · SQL Server · MySQL · MongoDB · Redis · AWS · Docker · Kubernetes · Databricks",
        "LLM em aplicação · agentes e MCP · engenharia de prompt · Claude Code",
      ],
      updated: "Atualizado em",
    },

    experience: {
      heading: "Experiência",
      intro: "{years} anos escrevendo software, do primeiro estágio até aqui.",
      resumeCta: "Baixar currículo",
      jobs: [
        {
          role: "Staff Software Engineer",
          org: "Eduzz",
          period: "mar 2023 · atual · remoto",
          summary:
            "Referência técnica de um time de nove numa plataforma que movimenta perto de R$1,2 bilhão por ano. A camada de automação e dados da operação comercial é minha, de ponta a ponta, e as decisões técnicas também.",
          bullets: [
            "Motor de scoring multiprograma (Strategy Pattern, 40+ regras) que trocou decisão comercial no olho por ranqueamento automático, com ponderação bayesiana pra não julgar vendedor de pouco volume por dado ainda ruidoso.",
            "Eventos de chargeback e disputa em quatro adquirentes (Stripe, Pagar.me, Mercado Pago, Iugu), idempotente em cima de webhook que ninguém garante que chega.",
            "API de pipeline que o comercial usa o dia todo: busca em quatro bancos ao mesmo tempo (SQL Server, MySQL, MongoDB, Postgres) e o cache corta latência em 50% a 70% e carga de banco em cerca de 90%.",
            "Motor de qualificação por configuração, mais de 2 milhões de qualificações processadas, com eventos saindo pro RabbitMQ por um outbox idempotente.",
            "Documentação viva das automações: um pipeline só de leitura transforma as APIs do HubSpot e do Botpress em doc versionada, e a IA preenche a intenção sem inventar estrutura.",
            "Entrego todo dia com agente de IA (Claude Code), cuidando dos prompts, das avaliações e da revisão que seguram isso em produção.",
          ],
        },
        {
          role: "Fundador e CEO (até a venda)",
          org: "Orbit, comprada pela Eduzz",
          period: "set 2019 · ago 2023",
          summary:
            "Fundei o Orbit Pages, SaaS de landing page pra criador de conteúdo, e toquei por quatro anos até a venda.",
          bullets: [
            "Construí o produto sozinho. Oito meses até a primeira venda, depois 67 mil usuários no gratuito, 1.500 pagantes e mais de R$100 mil por mês de receita recorrente.",
            "A rodada de investimento caiu na pandemia e levei a empresa ao lucro sem ela: subi o MRR de R$30 mil pra R$100 mil e a receita de plano anual de 20% pra 80% mexendo em preço e cobrança, sem feature nova.",
            "Fui o arquiteto principal o tempo todo. Reconstruí a V1 pra escalar sem teto (S3 e Vercel nas páginas, integração crítica em Kubernetes) enquanto tocava negócio, investidor e suporte. Ela continua rodando hoje, anos depois da venda.",
            "O time foi de 2 pra 18, e voltou pras 7 que levaram a empresa até o fim.",
          ],
        },
        {
          role: "Desenvolvedor full-stack",
          org: "por conta própria",
          period: "2015 · 2019",
          summary:
            "Centenas de projetos por conta própria. Comecei fazendo site sob encomenda e terminei desenhando os sistemas de pagamento em que o cliente confiava dinheiro de verdade. PHP, JavaScript, WordPress, React, Vue, Node.",
          bullets: [
            "Checkout sob medida (Doutor Nature): cinco meses pra tirar o cliente de um provedor fechado e deixar o juro do parcelado com ele. Adquirentes atrás de uma interface só, idempotência por carrinho e produto, reconciliação contra a API do processador. Passaram cerca de R$3 milhões no primeiro mês cheio no ar.",
            "Loja transacionando em bitcoin, do zero, em PHP puro.",
            "Alguns clientes: Bruno Souza, o Java Champion, que me confiou os negócios dele; a ACE Startups, com engenharia pra Natura, Banco BMG e Algar Telecom; e o TDC.",
          ],
        },
        {
          role: "Front-end e primeiros empregos",
          org: "Lands Agência, Lages",
          period: "2013 · 2015",
          summary:
            "Comecei estagiando e virei front-end na Lands. Transformava layout em código e cuidava do front inteiro dos sites e sistemas que a agência entregava.",
          bullets: [],
        },
      ],
      educationHeading: "Formação",
      education: [
        "MBA em Tecnologia para Negócios: IA, Data Science e Big Data · PUCRS · 2019 a 2020",
        "Bacharelado em Ciência da Computação · Unifacvest · 2012 a 2015",
      ],
    },

    projects: {
      heading: "Projetos",
      intro: "Feitos e mantidos sozinho, do banco de dados até a loja de aplicativos.",
      featuredLabel: "Em destaque",
      items: [
        {
          name: "Meu Feed Católico",
          description:
            "Plataforma devocional católica que eu construo e opero sozinho. API em Laravel, front em Vue 3, e um código só que vira web, PWA e app nativo pelo Capacitor. O que tem de difícil ali é o mapeamento de versificação entre cânones e edições da Bíblia, os pipelines de ingestão idempotentes e a pré-renderização da SPA pros robôs de busca. Mais de 300 testes.",
          links: [{ label: "Abrir o app", url: "https://use.meufeedcatolico.com.br" }],
          image: "/products/meu-feed-catolico.webp",
        },
        {
          name: "Temperamentos Online",
          description:
            "Teste de temperamento com um motor de pontuação versionado e determinístico, isolado do framework e com a própria suíte de testes, pro resultado continuar reproduzível conforme o método muda. Laravel, Inertia, React 19, TypeScript.",
          links: [{ label: "Abrir", url: "https://temperamentos.online" }],
          image: "/products/temperamentos-online.webp",
        },
        {
          name: "Nova Aba Católica",
          description:
            "Extensão de Chrome (Manifest V3) que transforma cada aba nova num momento de oração. Backend serverless na Vercel, em português e inglês.",
          links: [{ label: "Abrir", url: "https://nova-aba-catolica.ronaldoscotti.com" }],
          image: "/products/nova-aba-catolica.webp",
        },
        {
          name: "Orbit Pages",
          description:
            "O SaaS de landing page que fundei em 2019 e vendi pra Eduzz em 2023. A V1 continua servindo cliente até hoje.",
          links: [{ label: "Abrir", url: "https://www.orbitpages.com" }],
          image: "/products/orbit-pages.webp",
        },
      ],
    },

    writing: {
      heading: "Escrita",
      intro:
        "Escrevo pra pensar. Já foram 50 edições contando a construção do Orbit por dentro, sem filtro nenhum, e agora estou voltando a escrever.",
      more: "Ver mais",
      archive: "Ver o arquivo completo",
      badge: "Jornada SaaS",
    },

    contact: {
      heading: "Contato",
      email: "ronaldoscottis@gmail.com",
      links: [
        { label: "LinkedIn", url: "https://linkedin.com/in/ronaldoscottis" },
        { label: "GitHub", url: "https://github.com/ronaldoscotti" },
      ],
      location:
        "Florianópolis, Santa Catarina · trabalho remoto desde 2015",
    },

    footer: {
      motto: "Ora et labora",
    },

    schema: {
      jobTitle: "Staff Software Engineer",
      description:
        "Staff Software Engineer e arquiteto de software. Fundou um SaaS, escalou e vendeu. Arquitetura, sistemas de pagamento, automação e LLM em produção.",
      knowsAbout: [
        "Software Architecture",
        "System Design",
        "AI Agents",
        "LLM Applications",
        "PHP",
        "Laravel",
        "TypeScript",
        "React",
        "Payment Systems",
        "Data Pipelines",
      ],
    },
  },

  en: {
    seo: {
      title: "Ronaldo Scotti · Staff Software Engineer & Software Architect",
      description:
        "Exited SaaS founder who never stopped writing code. Payments, scale and automation in production. I get AI coding agents to ship code a senior would sign off on. Laravel, TypeScript, LLM systems. Remote, UTC-3.",
      ogTitle:
        "Ronaldo Scotti · I founded a SaaS, scaled it, and sold it. I never stopped writing code.",
      ogDescription: "Staff Software Engineer and software architect. Florianópolis, remote.",
    },

    nav: {
      links: [
        { href: "#about", label: "About" },
        { href: "#activity", label: "Activity" },
        { href: "#experience", label: "Experience" },
        { href: "#projects", label: "Projects" },
        { href: "#writing", label: "Writing" },
        { href: "#contact", label: "Contact" },
      ],
      resume: "Résumé",
      skipToContent: "Skip to content",
      switchLabel: "Ler em português",
      theme: { toDark: "Switch to dark theme", toLight: "Switch to light theme" },
    },

    hero: {
      role: "Staff Software Engineer · Software Architect",
      name: "Ronaldo Scotti",
      tagline: "Software engineer, architect, founder with an exit.",
      intro:
        "I design architecture, solve whatever comes up, and get AI coding agents to ship code a senior would sign off on. PHP/Laravel, TypeScript/React, LLM systems in production.",
      photoAlt: "Ronaldo Scotti",
    },

    about: {
      heading: "About",
      body: "I founded a SaaS, grew it to 67,000 users, and sold it to Eduzz. I never stopped writing code. Today I'm the technical reference for a team of nine and I ship every day, much of it with AI coding agents. I've been the one who had to make payroll and keep the product up at the same time. Catholic, married to Poli, father to Bento, living near the countryside in southern Brazil where I grew up.",
    },

    activity: {
      heading: "Activity",
      contributions: "{total} contributions in the last year, across {days} days",
      githubCta: "See it on GitHub",
      languagesHeading: "Languages",
      otherLanguages: "Other",
      stackHeading: "Stack",
      stack: [
        "TypeScript · Node.js · React · Vue · PHP/Laravel · Capacitor · SQL",
        "PostgreSQL · SQL Server · MySQL · MongoDB · Redis · AWS · Docker · Kubernetes · Databricks",
        "LLM apps · AI agents & MCP · prompt engineering · Claude Code",
      ],
      updated: "Updated",
    },

    experience: {
      heading: "Experience",
      intro: "{years} years writing software, from the first internship to here.",
      resumeCta: "Download résumé",
      jobs: [
        {
          role: "Staff Software Engineer",
          org: "Eduzz",
          period: "Mar 2023 · present · remote",
          summary:
            "The technical reference for a nine-person team at one of Brazil's largest creator-economy platforms (~R$1.2B annual GMV). I own the commercial operation's automation and data layer end to end, and the technical calls that come with it.",
          bullets: [
            "Multi-program scoring engine (Strategy Pattern core, 40+ rules) that replaced manual commercial decisions with an automated ranking pipeline, with Bayesian confidence-weighting so low-volume sellers aren't judged on noisy data.",
            "Chargebacks and disputes event layer across four payment providers (Stripe, Pagar.me, Mercado Pago, Iugu), built idempotent on top of unreliable webhooks.",
            "The product-pipeline API the commercial team runs on: parallel fan-out across four databases (SQL Server, MySQL, MongoDB, Postgres), with a cache that cuts latency 50-70% and database load by roughly 90%.",
            "Config-driven qualification engine, 2M+ qualifications processed, publishing completion events to RabbitMQ through an idempotent outbox.",
            "Living documentation for the automations: a read-only pipeline turns the HubSpot and Botpress APIs into versioned docs, and an AI layer fills intent without inventing structure.",
            "I ship daily with AI coding agents (Claude Code) and own the prompts, evals, and review loop that keep that code production-safe.",
          ],
        },
        {
          role: "Founder & CEO (exit)",
          org: "Orbit, acquired by Eduzz",
          period: "Sep 2019 · Aug 2023",
          summary:
            "I founded Orbit Pages, a landing-page SaaS for digital creators, and ran it for four years to the acquisition.",
          bullets: [
            "Built the product solo. Eight months to first sale, then 67,000 free users, 1,500 paying customers, and R$100k+ MRR.",
            "The planned VC round fell through in the pandemic and I took the company to profit without it: MRR from R$30k to R$100k, and annual-plan revenue from 20% to 80% by reworking pricing and defaults, with zero new features.",
            "Stayed lead architect throughout. Re-platformed the V1 for near-infinite scale (S3 and Vercel for pages, critical integrations on Kubernetes) while running the business, investors, and support. It still runs today, years after the exit.",
            "Grew the team from 2 to 18 and back to the lean 7 that ran it to the acquisition.",
          ],
        },
        {
          role: "Full-stack engineer",
          org: "on my own",
          period: "2015 · 2019",
          summary:
            "Hundreds of projects on my own. I started building websites to spec and ended up designing the payment systems clients trusted with real money. PHP, JavaScript, WordPress, React, Vue, Node.",
          bullets: [
            "Custom checkout (Doutor Nature): five months to move the client off a closed full-suite provider and keep the installment interest. Gateways behind one interface, idempotency keyed on cart and product, reconciliation against the processor API. ~R$3M in its first full production month.",
            "A bitcoin-transacting store, from scratch, in raw PHP.",
            "Selected clients: Bruno Souza, the Java Champion, who trusted me with his businesses; ACE Startups, engineering for Natura, Banco BMG, and Algar Telecom; and TDC, Brazil's largest developer conference.",
          ],
        },
        {
          role: "Front-end engineer and first jobs",
          org: "Lands Agência, Lages",
          period: "2013 · 2015",
          summary:
            "Started as an intern and moved into front-end work at Lands. Turning layouts into code and owning the entire front end of whatever the agency shipped.",
          bullets: [],
        },
      ],
      educationHeading: "Education",
      education: [
        "MBA, Technology for Business: AI, Data Science and Big Data · PUCRS · 2019-2020",
        "B.Sc., Computer Science · Unifacvest · 2012-2015",
      ],
    },

    projects: {
      heading: "Projects",
      intro: "Built and run solo, from the database to the app store.",
      featuredLabel: "Featured",
      items: [
        {
          name: "Meu Feed Católico",
          description:
            "A Catholic devotional platform I build and run solo. Laravel API, Vue 3 front end, one codebase shipping to web, PWA, and native iOS/Android via Capacitor. The hard parts are multi-canon Bible versification mapping, idempotent ingestion pipelines, and SPA prerendering for crawlers. 300+ tests.",
          links: [{ label: "Open the app", url: "https://use.meufeedcatolico.com.br" }],
          image: "/products/meu-feed-catolico.webp",
        },
        {
          name: "Temperamentos Online",
          description:
            "A temperament assessment with a versioned, fully deterministic scoring engine isolated from the framework, with its own test suite, so results stay reproducible as the method changes. Laravel, Inertia, React 19, TypeScript.",
          links: [{ label: "Open", url: "https://temperamentos.online" }],
          image: "/products/temperamentos-online.webp",
        },
        {
          name: "Catholic New Tab",
          description:
            "A Chrome extension (Manifest V3) that turns every new tab into a moment of prayer. Serverless backend on Vercel, shipped in English and Portuguese.",
          links: [{ label: "Open", url: "https://nova-aba-catolica.ronaldoscotti.com/en" }],
          image: "/products/catholic-new-tab.webp",
        },
        {
          name: "Orbit Pages",
          description:
            "The landing-page SaaS I founded in 2019 and sold to Eduzz in 2023. The V1 still serves customers today.",
          links: [{ label: "Open", url: "https://www.orbitpages.com" }],
          image: "/products/orbit-pages.webp",
        },
      ],
    },

    writing: {
      heading: "Writing",
      intro:
        "I write to think. 50+ issues telling the Orbit story from the inside, no filter, and now I'm writing again. The archive is in Portuguese, titles below are translated.",
      more: "Show more",
      archive: "See the full archive",
      badge: "Jornada SaaS",
      languageNote: "Written in Portuguese",
      languageTag: "PT",
    },

    contact: {
      heading: "Contact",
      email: "ronaldoscottis@gmail.com",
      links: [
        { label: "LinkedIn", url: "https://linkedin.com/in/ronaldoscottis" },
        { label: "GitHub", url: "https://github.com/ronaldoscotti" },
      ],
      location: "Florianópolis, Brazil · UTC-3, overlaps US business hours · remote since 2015",
    },

    footer: {
      motto: "Ora et labora",
    },

    schema: {
      jobTitle: "Staff Software Engineer",
      description:
        "Staff Software Engineer and software architect. Founded a SaaS, scaled it, and sold it. Architecture, payment systems, automation, and LLM systems in production.",
      knowsAbout: [
        "Software Architecture",
        "System Design",
        "AI Agents",
        "LLM Applications",
        "PHP",
        "Laravel",
        "TypeScript",
        "React",
        "Payment Systems",
        "Data Pipelines",
      ],
    },
  },
};

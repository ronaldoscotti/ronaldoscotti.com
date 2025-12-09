import type { Language, Translations } from './types';

export const translations: Record<Language, Translations> = {
  'pt-BR': {
    seo: {
      title: 'Ronaldo Scotti - Desenvolvedor SaaS e Automações com IA | Consultor',
      description: 'Desenvolvedor com 12 anos construindo produtos digitais. Especialista em SaaS, automações inteligentes e agentes de IA. Fundei e vendi o Orbit Pages. Consultoria para startups.',
      keywords: 'desenvolvedor saas, consultor automações, agentes ia, arquiteto saas, mvp validação, ronaldo scotti, orbit pages, automações inteligentes, eduzz',
      ogTitle: 'Ronaldo Scotti - Desenvolvedor SaaS e Automações IA',
      ogDescription: '12 anos construindo produtos digitais. Fundei e vendi o Orbit Pages. Hoje ajudo empresas com SaaS e automações inteligentes.',
      twitterTitle: 'Ronaldo Scotti - Desenvolvedor SaaS',
      twitterDescription: 'Especialista em SaaS, automações e agentes de IA. Consultoria para startups.',
    },

    nav: {
      links: [
        { href: '#trajetoria', label: 'Trajetória' },
        { href: '#projetos', label: 'Projetos' },
        { href: '#ajuda', label: 'Soluções' },
      ],
      contactButton: 'Contato',
      contactHref: '#contato',
    },

    hero: {
      heading: '12 anos construindo produtos digitais que resolvem problemas reais',
      subheading: 'Casado com a Poli, pai do Bento. Às vezes ajudo empresas a construir SaaS e automações do jeito certo.',
    },

    problems: {
      heading: 'Você já passou por isso?',
      description: 'Eu também. E aprendi algumas coisas no caminho.',
      closingStatement: 'Se você se identificou com algum desses cenários, talvez eu possa ajudar.',
      scenarios: [
        'Passou meses construindo algo que ninguém quer pagar',
        'Tem uma ideia mas não sabe se vale a pena investir tempo e dinheiro',
        'Seu time passa horas em tarefas manuais que poderiam ser automatizadas',
        'Travou em decisões técnicas e não sabe qual caminho seguir',
        'Seu SaaS começou a escalar e agora tudo está quebrado',
      ],
    },

    journey: {
      heading: 'A trajetória (ou: como aprendi do jeito mais caro)',
      timeline: [
        {
          period: '2013-2015',
          title: 'Aprendendo o ofício',
          description: 'Comecei transformando layouts em código por uma merreca. Absorvi tudo que pude. Em 2015 larguei a agência e abri minha "eugência" — eu sozinho fazendo freela no quarto.',
          icon: 'code',
        },
        {
          period: '2015-2019',
          title: '4 anos construindo pra todo mundo',
          description: 'Landing pages, e-commerces, áreas de membros. WordPress, Laravel, React, Node. Aprendi que linguagem é ferramenta — o que importa é resolver o problema do jeito mais simples possível.',
          icon: 'laptop_chromebook',
        },
        {
          period: '2019-2023',
          title: 'O Orbit (a escola mais cara que tive)',
          description: 'Criei o Orbit Pages — plataforma onde qualquer um montava páginas sem código. Construí features que ninguém pediu. Pivotamos 3 vezes. Conseguimos investimento. O dinheiro secou em 2022 — quase quebramos. Mas reconstruímos. Em 2023, vendi a empresa pra Eduzz.',
          icon: 'rocket_launch',
        },
        {
          period: '2023-hoje',
          title: 'Aplicando o que aprendi',
          description: 'Hoje trabalho na Eduzz como Arquiteto de Automações. Automatizo processos críticos, construo agentes de IA e faço sistemas que não foram feitos pra conversar se entenderem. Entrego valor rápido, depois itero. Tecnologia é meio, não fim.',
          icon: 'psychology',
        },
      ],
    },

    clients: {
      heading: 'Já trabalhei com',
    },

    projects: {
      heading: 'Projetos pessoais',
      subtitle: '(quando trabalho deixa de ser só trabalho)',
      intro: 'Quero usar o que sei fazer pra deixar algo bom no mundo.',
      items: [
        {
          name: 'Meu Feed Católico',
          url: 'https://use.meufeedcatolico.com.br',
          description: 'App que substitui tempo perdido no Instagram por conteúdo católico formativo. Feed diário, liturgia, orações, vidas de santos. Fiz primeiro pra mim, usei por meses, depois compartilhei.',
          image: '/products/meu-feed-catolico.webp',
        },
        {
          name: 'Nova Aba Católica',
          url: 'https://nova-aba-catolica.ronaldoscotti.com',
          description: 'Extensão para o navegador que transforma cada nova aba em momento de paz. Porque se você abre 50 abas por dia, que algumas te lembrem de respirar.',
          image: '/products/nova-aba-catolica.webp',
        },
        {
          name: 'Jornada SaaS',
          url: 'https://jornadasaas.com',
          description: '50 edições contando a história real do Orbit. Os R$ 437 da primeira venda após 8 meses. O investimento. As demissões. O burnout. A venda. Sem filtro.',
          image: '/products/jornada-saas.webp',
        },
        {
          name: 'Orbit Pages',
          url: 'https://www.orbitpages.com',
          description: 'SaaS de construção de landing pages e funis de venda que construí e vendi em 2023 para a Eduzz (criei em 2019 e continua de pé até hoje)',
          image: '/products/orbit-pages.webp',
        },
      ],
    },

    services: {
      heading: 'Posso te ajudar com 3 coisas',
      intro: 'Passei anos construindo, quebrando e consertando um SaaS até vendê-lo. Aprendi do jeito mais caro. Hoje uso essa experiência pra ajudar quem tá onde eu já estive.',
      items: [
        {
          number: '1',
          title: 'Validar sua ideia antes de gastar meses codando',
          description: 'Aqueles vários meses que passei programando sozinho? Podia ter validado em 2 semanas com um MVP de verdade. Te ajudo a testar se alguém pagaria pela sua ideia antes de construir tudo.',
        },
        {
          number: '2',
          title: 'Automatizar processos que estão drenando seu time',
          description: 'Se você tem alguém copiando dados entre sistemas ou fazendo trabalho repetitivo — dá pra automatizar. Construo automações e agentes de IA que resolvem problemas específicos do seu negócio.',
        },
        {
          number: '3',
          title: 'Destravar decisões técnicas do seu SaaS',
          description: 'Arquitetura, stack, como escalar sem quebrar. Se você está travado em decisões técnicas ou não sabe qual próximo passo dar — vamos conversar. Trabalho em projetos pontuais como consultor técnico/estratégico.',
        },
      ],
    },

    contact: {
      heading: 'Vamos conversar?',
      description: 'Manda um oi. Respondo tudo pessoalmente.',
      whatsappButton: 'Chamar no WhatsApp',
      contactInfo: 'Florianópolis, SC • Disponível para projetos remotos',
      motto: 'Ora et labora',
    },

    schema: {
      person: {
        jobTitle: 'Arquiteto de Automações',
        description: 'Desenvolvedor com 12 anos de experiência construindo produtos digitais. Fundou e vendeu o Orbit Pages. Especialista em SaaS, automações inteligentes e agentes de IA.',
      },
      website: {
        name: 'Ronaldo Scotti',
        description: 'Desenvolvedor SaaS e especialista em automações com IA. Consultoria para startups.',
      },
      professionalService: {
        name: 'Consultoria SaaS - Ronaldo Scotti',
        description: 'Consultoria técnica e estratégica para desenvolvimento de SaaS, automações inteligentes e agentes de IA.',
        catalogName: 'Serviços de Consultoria',
        offers: [
          {
            name: 'Validação de MVP',
            description: 'Ajudo a testar se alguém pagaria pela sua ideia antes de construir tudo',
          },
          {
            name: 'Automações Inteligentes',
            description: 'Construo automações e agentes de IA que resolvem problemas específicos do seu negócio',
          },
          {
            name: 'Arquitetura de SaaS',
            description: 'Decisões técnicas certas na hora certa - escalar sem quebrar',
          },
        ],
      },
    },
  },

  en: {
    seo: {
      title: 'Ronaldo Scotti - SaaS Developer & AI Automation Specialist | Consultant',
      description: '12 years building digital products. Expert in SaaS, intelligent automations, and AI agents. Founded and sold Orbit Pages. Startup consulting.',
      keywords: 'saas developer, automation consultant, ai agents, saas architect, mvp validation, ronaldo scotti, orbit pages, intelligent automations, eduzz',
      ogTitle: 'Ronaldo Scotti - SaaS Developer & AI Automations',
      ogDescription: '12 years building digital products. Founded and sold Orbit Pages. Now helping companies with SaaS and intelligent automations.',
      twitterTitle: 'Ronaldo Scotti - SaaS Developer',
      twitterDescription: 'Expert in SaaS, automations, and AI agents. Consulting for startups.',
    },

    nav: {
      links: [
        { href: '#trajetoria', label: 'Journey' },
        { href: '#projetos', label: 'Projects' },
        { href: '#ajuda', label: 'Solutions' },
      ],
      contactButton: 'Contact',
      contactHref: '#contato',
    },

    hero: {
      heading: '12 years building digital products that solve real problems',
      subheading: 'Married to Poli, father of Bento. Sometimes I help companies build SaaS and automations the right way.',
    },

    problems: {
      heading: 'Have you been through this?',
      description: 'I have too. And I learned a few things along the way.',
      closingStatement: 'If any of these scenarios resonate with you, maybe I can help.',
      scenarios: [
        'Spent months building something nobody wants to pay for',
        'Have an idea but don\'t know if it\'s worth your time and money',
        'Your team spends hours on manual tasks that could be automated',
        'Stuck on technical decisions and don\'t know which path to take',
        'Your SaaS started scaling and now everything is breaking',
      ],
    },

    journey: {
      heading: 'The journey (or: how I learned the hard way)',
      timeline: [
        {
          period: '2013-2015',
          title: 'Learning the craft',
          description: 'Started turning layouts into code for peanuts. Absorbed everything I could. In 2015 I left the agency and opened my "me-gency" — just me doing freelance in my room.',
          icon: 'code',
        },
        {
          period: '2015-2019',
          title: '4 years building for everyone',
          description: 'Landing pages, e-commerces, membership areas. WordPress, Laravel, React, Node. Learned that language is just a tool — what matters is solving the problem as simply as possible.',
          icon: 'laptop_chromebook',
        },
        {
          period: '2019-2023',
          title: 'Orbit (the most expensive school I had)',
          description: 'Created Orbit Pages — a platform where anyone could build pages without code. Built features nobody asked for. Pivoted 3 times. Got investment. Money dried up in 2022 — almost went bankrupt. But we rebuilt. In 2023, sold the company to Eduzz.',
          icon: 'rocket_launch',
        },
        {
          period: '2023-today',
          title: 'Applying what I learned',
          description: 'Today I work at Eduzz as Automation Architect. I automate critical processes, build AI agents and make systems that weren\'t meant to talk understand each other. Ship value fast, then iterate. Technology is a means, not an end.',
          icon: 'psychology',
        },
      ],
    },

    clients: {
      heading: 'I\'ve worked with',
    },

    projects: {
      heading: 'Personal projects',
      subtitle: '(when work stops being just work)',
      intro: 'I want to use what I know to leave something good in the world.',
      items: [
        {
          name: 'Meu Feed Católico',
          url: 'https://use.meufeedcatolico.com.br',
          description: 'App that replaces time wasted on Instagram with formative Catholic content. Daily feed, liturgy, prayers, lives of saints. Built it for myself first, used it for months, then shared it.',
          image: '/products/meu-feed-catolico.webp',
        },
        {
          name: 'Nova Aba Católica',
          url: 'https://nova-aba-catolica.ronaldoscotti.com',
          description: 'Browser extension that turns each new tab into a moment of peace. Because if you open 50 tabs a day, let some remind you to breathe.',
          image: '/products/nova-aba-catolica.webp',
        },
        {
          name: 'Jornada SaaS',
          url: 'https://jornadasaas.com',
          description: '50 editions telling the real story of Orbit. The $80 from the first sale after 8 months. The investment. The layoffs. The burnout. The sale. Unfiltered.',
          image: '/products/jornada-saas.webp',
        },
        {
          name: 'Orbit Pages',
          url: 'https://www.orbitpages.com',
          description: 'Landing page and sales funnel builder SaaS I built and sold in 2023 to Eduzz (created in 2019 and still running today)',
          image: '/products/orbit-pages.webp',
        },
      ],
    },

    services: {
      heading: 'I can help you with 3 things',
      intro: 'I spent years building, breaking, and fixing a SaaS until I sold it. Learned the hard way. Today I use that experience to help those who are where I\'ve been.',
      items: [
        {
          number: '1',
          title: 'Validate your idea before spending months coding',
          description: 'Those several months I spent coding alone? Could have validated in 2 weeks with a real MVP. I help you test if someone would pay for your idea before building everything.',
        },
        {
          number: '2',
          title: 'Automate processes draining your team',
          description: 'If you have someone copying data between systems or doing repetitive work — it can be automated. I build automations and AI agents that solve your specific business problems.',
        },
        {
          number: '3',
          title: 'Unblock your SaaS technical decisions',
          description: 'Architecture, stack, how to scale without breaking. If you\'re stuck on technical decisions or don\'t know the next step — let\'s talk. I work on specific projects as a technical/strategic consultant.',
        },
      ],
    },

    contact: {
      heading: 'Let\'s talk?',
      description: 'Say hi. I respond to everything personally.',
      whatsappButton: 'Message on WhatsApp',
      contactInfo: 'Florianópolis, SC • Available for remote projects',
      motto: 'Ora et labora',
    },

    schema: {
      person: {
        jobTitle: 'Automation Architect',
        description: 'Developer with 12 years of experience building digital products. Founded and sold Orbit Pages. Expert in SaaS, intelligent automations, and AI agents.',
      },
      website: {
        name: 'Ronaldo Scotti',
        description: 'SaaS developer and AI automation specialist. Consulting for startups.',
      },
      professionalService: {
        name: 'SaaS Consulting - Ronaldo Scotti',
        description: 'Technical and strategic consulting for SaaS development, intelligent automations, and AI agents.',
        catalogName: 'Consulting Services',
        offers: [
          {
            name: 'MVP Validation',
            description: 'I help you test if someone would pay for your idea before building everything',
          },
          {
            name: 'Intelligent Automations',
            description: 'I build automations and AI agents that solve your specific business problems',
          },
          {
            name: 'SaaS Architecture',
            description: 'Right technical decisions at the right time - scale without breaking',
          },
        ],
      },
    },
  },
};

# COPY-SITE.md

Copy do `ronaldoscotti.com`. Página única, curta, no formato do `yuriytkach.com`: currículo em
forma de site, não carta de vendas. Os fatos saem do `cv-nagringa.md`. As frases são escritas na
voz do Ronaldo (`write-in-my-voice`), não traduzidas do inglês.

Ordem: **cabeçalho → topo → sobre → atividade → experiência → projetos → escrita → contato**

---

## Cabeçalho

```
Ronaldo Scotti      Sobre  Atividade  Experiência  Projetos  Escrita  Contato   [Currículo (PDF)]
```

---

## Topo

```
Staff Software Engineer · Arquiteto de software

Ronaldo Scotti

Engenheiro de software, arquiteto, fundador com exit.

Desenho arquitetura, resolvo o que aparece e faço agente de IA entregar código que passa em
revisão de sênior. PHP e Laravel, TypeScript e React, LLM em produção.
```

---

## Sobre

```
Fundei um SaaS, cheguei a 67 mil usuários e vendi pra Eduzz. Nunca parei de programar. Hoje sou a
referência técnica de um time de nove e subo código todo dia, boa parte com agente de IA. Já fui o
responsável por pagar os salários e por manter o produto no ar ao mesmo tempo. Católico, casado
com a Poli, pai do Bento, morando perto do interior de Santa Catarina onde cresci.
```

---

## Atividade

```
Atividade
```

Gráfico de contribuições do GitHub (o heatmap, direto).

Distribuição de linguagens do WakaTime (o gráfico, direto).

**Stack (texto corrido):**

```
TypeScript · Node.js · React · Vue · PHP/Laravel · Capacitor · SQL
PostgreSQL · SQL Server · MySQL · MongoDB · Redis · AWS · Docker · Kubernetes · Databricks
LLM em aplicação · agentes e MCP · engenharia de prompt · Claude Code
```

---

## Experiência

```
Experiência
```

`→ Baixar currículo`

### Staff Software Engineer · Eduzz

`mar 2023 · atual · remoto`

Referência técnica de um time de nove numa das maiores plataformas de creator economy do Brasil,
que movimenta perto de R$1,2 bilhão por ano. A camada de automação e dados da operação comercial
é minha, de ponta a ponta, e as decisões técnicas também.

```
· Motor de scoring multiprograma (Strategy Pattern, 40+ regras) que trocou decisão comercial no
  olho por ranqueamento automático, com ponderação bayesiana pra não julgar vendedor de pouco
  volume por dado ainda ruidoso.
· Eventos de chargeback e disputa em quatro adquirentes (Stripe, Pagar.me, Mercado Pago, Iugu),
  idempotente em cima de webhook que ninguém garante que chega.
· API de pipeline que o comercial usa o dia todo: busca em quatro bancos ao mesmo tempo (SQL
  Server, MySQL, MongoDB, Postgres) e o cache corta latência em 50% a 70% e carga de banco em ~90%.
· Motor de qualificação por configuração, 2M+ qualificações processadas, com eventos saindo pro
  RabbitMQ por um outbox idempotente.
· Documentação viva das automações: um pipeline só de leitura transforma as APIs do HubSpot e do
  Botpress em doc versionada, e a IA preenche a intenção sem inventar estrutura.
· Entrego todo dia com agente de IA (Claude Code), cuidando dos prompts, das avaliações e da
  revisão que seguram isso em produção.
```

### Fundador e CEO (até a venda) · Orbit, comprada pela Eduzz

`set 2019 · ago 2023`

Fundei o Orbit Pages, SaaS de landing page pra criador de conteúdo, e toquei por quatro anos até
a venda.

```
· Construí o produto sozinho. Oito meses até a primeira venda, depois 67 mil usuários no gratuito,
  1.500 pagantes e mais de R$100 mil por mês de receita recorrente.
· A rodada de investimento caiu na pandemia e levei a empresa ao lucro sem ela: subi o MRR de R$30
  mil pra R$100 mil e a receita de plano anual de 20% pra 80% mexendo em preço e cobrança, sem
  feature nova.
· Fui o arquiteto principal o tempo todo. Reconstruí a V1 pra escalar sem teto (S3 e Vercel nas
  páginas, integração crítica em Kubernetes) enquanto tocava negócio, investidor e suporte. Ela
  continua rodando hoje, anos depois da venda.
· O time foi de 2 pra 18, e voltou pras 7 que levaram a empresa até o fim.
```

### Desenvolvedor full-stack · por conta própria

`2015 · 2019`

Centenas de projetos por conta própria. Comecei fazendo site sob encomenda e terminei desenhando
os sistemas de pagamento em que o cliente confiava dinheiro de verdade. PHP, JavaScript, WordPress,
React, Vue, Node.

```
· Checkout sob medida (Doutor Nature): cinco meses pra tirar o cliente de um provedor fechado e
  deixar o juro do parcelado com ele. Adquirentes atrás de uma interface só, idempotência por
  carrinho e produto, reconciliação contra a API do processador. Passaram cerca de R$3 milhões no
  primeiro mês cheio no ar.
· Loja transacionando em bitcoin, do zero, em PHP puro.
· Alguns clientes: Bruno Souza, o Java Champion, que me confiou os negócios dele; a ACE Startups,
  com engenharia pra Natura, Banco BMG e Algar Telecom; e o TDC, a maior conferência de
  desenvolvedores do Brasil.
```

### Formação

```
MBA em Tecnologia para Negócios: IA, Data Science e Big Data · PUCRS · 2019 a 2020
Bacharelado em Ciência da Computação · Unifacvest · 2012 a 2015
```

---

## Projetos

```
Projetos

Feitos e mantidos sozinho, do banco de dados até a loja de aplicativos.
```

### Meu Feed Católico

```
Plataforma devocional católica que eu construo e opero sozinho. API em Laravel, front em Vue 3, e
um código só que vira web, PWA e app nativo pelo Capacitor. O que tem de difícil ali é o
mapeamento de versificação entre cânones e edições da Bíblia, os pipelines de ingestão
idempotentes e a pré-renderização da SPA pros robôs de busca. Mais de 300 testes.
```

### Temperamentos Online

```
Teste de temperamento com um motor de pontuação versionado e determinístico, isolado do framework
e com a própria suíte de testes, pro resultado continuar reproduzível conforme o método muda.
Laravel, Inertia, React 19, TypeScript.
```

### Nova Aba Católica

```
Extensão de Chrome (Manifest V3) que transforma cada aba nova num momento de oração. Backend
serverless na Vercel, em português e inglês.
```

---

## Escrita

```
Escrita

Escrevo pra pensar. Já foram 50 edições contando a construção do Orbit por dentro, sem filtro
nenhum, e agora estou voltando a escrever.
```

**Lista dos textos recentes** (data, título, uma linha). Cinco por página, com paginação, cada item
abrindo em `/escrita/[slug]`. O link no fim leva pra `/escrita`, com o arquivo inteiro.

```
[data]   [título]
         [uma linha]

← anterior   1 2 3   próxima →

→ Ver todos os textos
```

---

## Contato

```
Contato

ronaldoscottis@gmail.com

LinkedIn · GitHub · Currículo (PDF)

Florianópolis · UTC-3, meu dia útil bate com o dos Estados Unidos · remoto desde 2015
```

**Rodapé:**

```
Ronaldo Scotti · Ora et labora · PT · EN
```

---

## Decisões que dependem de você

- **Ano do exit:** o CV e o LinkedIn dizem 2023; o `README.md` do posicionamento e sua bio do
  GitHub dizem 2022.
- **WakaTime:** `wakatime.com/@ronaldoscotti` dá 404. Preciso do handle, e o plugin tem que rodar
  também no código de trabalho, senão o gráfico mostra só projeto pessoal.
- **Testes do Meu Feed Católico:** usei "mais de 300" (do `cv.md`); o `cv-nagringa.md` diz 770.
- **Frase de busca ativa:** deixei de fora por ser a única linha que envelhece quando o quadro
  muda. Se quiser, entra no fim do Sobre.
- **Espanhol:** mantém ou aposenta.

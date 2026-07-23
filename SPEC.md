# SPEC.md

Especificação de implementação do `ronaldoscotti.com`. Copy em `COPY-SITE.md` (PT) e
`COPY-SITE-EN.md` (EN). Direção visual em `DIRECAO-VISUAL-SITE.md`.

---

## 1. Escopo

Reconstruir o site como **one-page** em Astro estático, com PT e EN, e uma seção de artigos
alimentada por **JSON estático** apontando pro Substack. Sem blog, sem CMS, sem rota de post.

**Entra:** topo, sobre, atividade (GitHub + WakaTime), experiência, projetos, escrita (10 posts
com load more), contato.
**Sai:** `Problems.astro`, `Services.astro`, schema `ProfessionalService`, CTA de WhatsApp,
Material Symbols, Google Fonts via CDN, espanhol.

---

## 2. Rotas

| Rota | Conteúdo |
|---|---|
| `/` | One-page EN (default do site) |
| `/pt` | One-page PT |
| `/cv.pdf` | Currículo EN, arquivo estático em `public/` |
| `/404` | Página de erro no sistema visual do site |
| `/en`, `/es` | Redirect pra `/` |

O redirect existe em três camadas: `meta refresh` com `canonical` e `noindex` na página (funciona
em qualquer host), mais `public/_redirects` (Netlify, Cloudflare) e `vercel.json` com 301 de
verdade onde a plataforma suporta.

`hreflang` cruzado entre `/` e `/pt`, `canonical` por rota, `og:locale` por rota.

---

## 3. Dados

### 3.1 `src/data/posts.json`

Fonte única dos artigos. Formato:

```json
{
  "source": { "name": "Jornada SaaS", "url": "https://jornadasaas.substack.com" },
  "posts": [
    {
      "slug": "primeira-venda",
      "title": "8 Meses Para Fazer a Primeira Venda",
      "subtitle": "O que aprendi enquanto esperava (e quase desistia de) meu primeiro cliente pagante",
      "date": "2025-03-18",
      "url": "https://jornadasaas.substack.com/p/primeira-venda",
      "image": "/posts/primeira-venda.webp"
    }
  ]
}
```

**Os 10 escolhidos**, na ordem em que aparecem no site (curada, não cronológica). O critério foi
aberturas do export (proxy de views), densidade de primeira pessoa e o que prova entrega:

| # | slug | Ed. | Aberturas | Por que entrou |
|---|---|---|---|---|
| 1 | `primeira-venda` | 44 | 328 | Maior alcance da newsletter inteira e a história da primeira venda de R$437 depois de 8 meses |
| 2 | `burnout` | 43 | 223 | Maior densidade de primeira pessoa (26,6 por mil palavras). O celular na parede |
| 3 | `desapego` | 49 | 276 | Segundo maior alcance. Saber a hora de largar uma ideia |
| 4 | `fim` | 50 | 273 | Fechamento da temporada, reflexão pessoal |
| 5 | `5-licoes-2025` | 34 | 218 | Da ideia ao exit, as lições que vendem julgamento |
| 6 | `risco-de-plataforma` | 48 | 222 | O mais técnico dos de alto alcance, julgamento de arquitetura |
| 7 | `equity` | 24 | 202 | Mais menções a exit e Eduzz de todos, cabeça de negócio |
| 8 | `pontos-cegos` | 21 | 188 | Alto alcance com narrativa pessoal forte |
| 9 | `metodo-degrau-a-degrau` | 11 | 90 | O arco dev vira founder, que é o posicionamento dele |
| 10 | `o-que-a-roca-me-ensinou-sobre-saas` | 12 | 85 | A origem no sítio, o que amarra o site inteiro |

As aberturas dos itens 9 e 10 são baixas porque a lista ainda era pequena em ago/2024. Entraram
por conteúdo, não por número.

**Domínio correto:** `jornadasaas.com` **está fora do ar** (404, não aponta mais pro Substack).
Todos os links usam `jornadasaas.substack.com`. Se ele reapontar o domínio, é trocar uma string
no JSON.

**Imagens:** as capas foram baixadas do Substack, redimensionadas pra 1200px e convertidas em
WebP, em `public/posts/`. 624 KB no total. Sem hotlink de CDN externo.

### 3.2 `src/data/activity.json`

**Atualiza sozinho.** `scripts/fetch-activity.mjs` roda no `prebuild`, então todo deploy traz
dado fresco. Dois níveis de automação:

1. **A cada build:** o `prebuild` busca o GitHub. **Sem token**, usando o endpoint público
   `github.com/users/ronaldoscotti/contributions`, que já traz as contribuições privadas porque o
   perfil está com esse sinal ligado. Se `GITHUB_TOKEN` existir, usa a GraphQL, que é a fonte
   oficial.
2. **Todo dia, 6h UTC (3h em Florianópolis):** `.github/workflows/refresh-activity.yml` roda o
   script e comita o JSON se ele mudou, o que dispara o deploy. Sem isso o heatmap congelaria na
   data do último deploy, já que o site é estático. Dia sem commit não gera commit, então o
   histórico não enche de ruído.

Falha de rede nunca quebra o build: cai pro JSON commitado e marca `stale: true`.

```json
{
  "github": { "total": 4464, "activeDays": 240, "from": "2025-07-20", "to": "2026-07-23",
              "weeks": [[0,2,5,...], ...] },
  "languages": { "items": [{ "name": "TypeScript", "percent": 33.9 }, ...],
                 "source": "local-git", "repos": 18 },
  "fetchedAt": "2026-07-23"
}
```

### 3.3 Barra de linguagens, sem WakaTime

O WakaTime é pago, então `scripts/fetch-languages.mjs` faz o mesmo trabalho de graça, e melhor.

**Fonte usada: os repositórios git locais.** O script varre as pastas de trabalho, conta linhas
alteradas por extensão nos commits dos últimos 12 meses com o email dele, e escreve a chave
`languages`. Mede **esforço**, que é o que o WakaTime mede, e não tamanho de repositório, que é o
que a API do GitHub mediria. E alcança o código de trabalho, que não vive no GitHub pessoal.

Resultado real de hoje, com 18 repositórios: TypeScript 33,9%, PHP 32,4%, Vue 19,9%, Python 3,9%,
JavaScript 3,6%, CSS 3,3%, Outras 2,5%. Bate com o que o CV afirma.

Detalhes que importam: ignora `node_modules`, `vendor`, `dist` e lockfile; conta adições mais
remoções, porque refatorar também é trabalho; corta abaixo de 0,5% e agrupa tudo depois da sexta
fatia em "Outras", senão a barra vira confete.

**Como roda sozinho:** os repositórios são locais, então isso não pode rodar no GitHub Actions.
Roda no launchd, todo dia às 4h, por `scripts/com.ronaldoscotti.site-activity.plist`, que chama
`scripts/update-activity.sh`. O script atualiza heatmap e linguagens, e só comita se mudou.

```
cp scripts/com.ronaldoscotti.site-activity.plist ~/Library/LaunchAgents/
launchctl load ~/Library/LaunchAgents/com.ronaldoscotti.site-activity.plist
```

Duas alternativas ficaram implementadas como fallback e não precisam de nada agora:
`GITHUB_TOKEN` soma bytes por linguagem via API (ponderando repositório mexido no último ano com
peso 3), e `WAKATIME_API_KEY` continua funcionando caso ele assine um dia.

**Armadilha resolvida:** `fetch-activity.mjs` roda no `prebuild` e reescreve o JSON inteiro. Ele
preserva a chave `languages` de propósito. Sem isso, cada build apagaria a barra que o outro script
acabou de escrever.

---

## 4. Componentes

```
src/
├── data/           posts.json · activity.json · site.ts (nav, links, i18n)
├── components/
│   ├── Header.astro        nome + nav âncora + botão do currículo + troca de idioma
│   ├── Hero.astro          cargo, nome, aposto, parágrafo, foto
│   ├── About.astro         um parágrafo
│   ├── Activity.astro      heatmap + linguagens + stack
│   ├── Heatmap.astro       SVG inline a partir de activity.json
│   ├── Languages.astro     barra empilhada, SVG inline
│   ├── Experience.astro    3 cargos + formação
│   ├── Projects.astro      3 projetos
│   ├── Writing.astro       lista de posts + load more
│   ├── Contact.astro
│   └── Footer.astro
├── layouts/Layout.astro    head, SEO, schema, fontes
├── pages/index.astro       EN
├── pages/pt/index.astro    PT
└── styles/global.css       tokens, tipografia, reset
```

Conteúdo de texto vem de `src/i18n/translations.ts` (já existe, reescrito). Componentes recebem
`lang` e leem a chave correspondente. Nenhum texto hardcoded em componente.

---

## 5. Seção de escrita

- Renderiza **4 posts** no carregamento inicial. Botão `Ver mais` revela os 6 restantes.
- **Sem JavaScript de framework.** Os 10 já vêm no HTML; o botão usa `<details>` nativo ou 15
  linhas de JS inline que removem um atributo `hidden`. Preferir a segunda pela semântica de
  lista.
- Cada item: capa (300×214, `loading="lazy"`, dimensões declaradas), data em mono, título em
  serifa, subtítulo em sans, e um selo discreto `Jornada SaaS`.
- O item inteiro é um link pro Substack, com `target="_blank"` e `rel="noopener"`.
- Quando os 6 extras aparecem, o botão some e o foco vai pro primeiro item revelado.
- Abaixo da lista, um link pro arquivo completo no Substack.

**Estado de rolagem:** o `Ver mais` não muda a URL nem a posição de rolagem.

---

## 6. Gráficos

### Heatmap (GitHub)

- SVG inline, 53 colunas × 7 linhas, célula de 11px com 3px de gap, cantos de 2px.
- Cinco níveis de cor derivados de `--accent`: vazio em `--rule` a 40%, depois 25%, 45%, 70% e
  100% de opacidade do acento.
- `role="img"` com `aria-label` trazendo o total e os dias ativos. O número também aparece em
  texto ao lado, então ninguém depende do desenho.
- **Mobile:** contêiner com `overflow-x: auto`, células no mesmo tamanho, com `scroll-snap` no
  fim (mostra o mês mais recente primeiro).

### Linguagens

- Barra horizontal empilhada única, altura de 10px, cantos arredondados só nas pontas.
- Máximo de 6 fatias, o resto agrupado em `Outras`.
- Legenda embaixo, em mono, com nome e percentual.
- Tons derivados do acento, do 50% ao cheio. Abaixo disso a primeira fatia some no papel.

**Se `activity.json` não tiver `wakatime`**, a seção renderiza só o heatmap e a stack. Nada de
espaço vazio nem de "em breve".

---

## 7. Design tokens

```css
--paper:#EFE6D6  --ink:#1A1410  --ink-soft:#3E2B23  --rule:#D6C9B3  --accent:#B5793A
--font-display: Newsreader, Georgia, serif
--font-body: Inter, system-ui, sans-serif
--font-mono: "JetBrains Mono", ui-monospace, monospace
```

Fontes auto-hospedadas em `public/fonts/`, subset latino, `woff2`, `font-display: swap`, com
`preload` só do Newsreader do topo. Sem dark mode nesta versão.

Escala, ritmo e regras por seção estão em `DIRECAO-VISUAL-SITE.md`, seções 4 a 6. A implementação
segue aquele documento; esta spec não repete os valores.

---

## 8. SEO e schema

- `Person` com `name`, `jobTitle: "Staff Software Engineer"`, `image`, `url`, `sameAs`
  (LinkedIn, GitHub), `knowsAbout`, `alumniOf`. **Sem `worksFor`**, que é o campo que envelhece.
- `WebSite`. **Deletar `ProfessionalService`** e o catálogo de ofertas nos dois idiomas.
- `og:image` por rota, gerada no build a partir de um template (fundo `--paper`, frase em serifa,
  nome embaixo, uma regra fina, sem foto e sem gradiente).
- `sitemap.xml` e `robots.txt` regenerados pras rotas novas.
- Favicon: monograma `RS` em serifa sobre `--ink`, em SVG.

---

## 9. Acessibilidade e performance

- Um `h1` por página, `h2` por seção, sem pular nível.
- `skip to content` como primeiro elemento focável, foco visível desenhado em `--accent`.
- Link do corpo sublinhado por padrão.
- `prefers-reduced-motion: reduce` desliga o fade e a rolagem suave.
- Contraste: `--accent` sobre `--paper` só em texto de 16px ou maior. Verificar o par no build.
- Toda imagem com `width` e `height`. CLS 0.
- Zero dependência nova. Zero JavaScript além do `Ver mais`.
- Meta: Lighthouse 100 em performance e acessibilidade nas duas rotas, LCP abaixo de 1,5s em 4G.

---

## 10. Ordem de execução

1. `global.css` com os tokens e a tipografia, fontes auto-hospedadas.
2. `translations.ts` reescrito com a copy nova PT e EN, sem as chaves mortas.
3. `Layout.astro`: head, SEO, schema corrigido, `hreflang`.
4. Componentes de cima pra baixo: Header, Hero, About, Experience, Projects, Contact, Footer.
5. `posts.json` e `Writing.astro` com o load more.
6. `scripts/fetch-activity.mjs`, `activity.json`, `Heatmap.astro`, `Languages.astro`.
7. Deletar `Problems.astro`, `Services.astro`, `Clients.astro`, `/es`, chaves ES.
8. `og-image`, favicon, sitemap, robots.
9. Rodar build e Lighthouse.

---

## 11. Estado da implementação

**Feito e verificado no build:**

- Um `h1` por página, `h2` por seção, hierarquia correta.
- `ProfessionalService` e `worksFor` fora do schema.
- Zero Material Symbols, zero Google Fonts via CDN, zero recurso externo carregado.
- **0 KB de JavaScript de bundle.** Só três blocos inline: revelar no scroll, marcar a seção ativa
  na nav, e o `Ver mais`.
- 12 imagens, todas com `width` e `height` declarados, todas locais. CLS 0 por construção.
- 207 KB de fonte, 62 KB de HTML.
- `rel="noopener"` em todo link externo.
- Heatmap real com 4.464 contribuições em 240 dias, 369 células, escala por quantil (linear
  achataria o ano inteiro por causa de um dia de 202 commits).
- Load more testado: 4 visíveis, botão revela os 6 restantes e some, foco vai pro primeiro item.
- Mobile a 390px: nav rola horizontal sem hambúrguer, heatmap rola no próprio contêiner.

**Pendências:**

- **`public/cv.pdf` não existe ainda.** É o CTA primário do cabeçalho e aparece em mais dois
  lugares. Enquanto não existir, os três apontam pra 404.
- **`og-image.png` está com fonte errada.** O template está certo (papel, frase em serifa, nome,
  regra fina), mas o `sips` rasterizou com Helvetica porque não tem a Newsreader instalada. O SVG
  em `public/og-image.svg` está correto; falta rasterizar com a fonte certa.
- **Barra de linguagens:** ver seção 3.2. Decidir a fonte.
- **Ano do exit:** o CV e o LinkedIn dizem 2023; o `README.md` do posicionamento e a bio do GitHub
  dizem 2022.
- **Bio do GitHub:** `hireable: true` é sinal público de busca ativa, o que contraria a decisão
  registrada no `linkedin.md` de não ligar o Open to Work.
- **Espanhol aposentado:** `/es` virou redirect com `noindex`. Se ele quiser manter, é recriar a
  rota e a chave no `translations.ts`.

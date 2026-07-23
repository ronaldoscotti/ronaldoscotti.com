# Direção visual

Direção de arte do `ronaldoscotti.com`. A copy está em `copy-pt.md` e `copy-en.md`.

**Referência de estrutura:** `yuriytkach.com`. Página única, curta, seções separadas por título,
sem card, sem ilustração, sem hero de tela cheia. Ele acerta a estrutura e erra a estética: é
genérico. A estrutura fica, a estética sobe.

**Tom:** sênior, sóbrio, adulto, com peso editorial. É o site de um engenheiro que fundou e vendeu
uma empresa. A referência é publicação editorial e memorando técnico, não landing page de SaaS e
não site de palestrante.

**Teste de aprovação:** imprima a página em preto e branco. Se a hierarquia continuar correta e a
página continuar boa, passou.

---

## O que morre

Inter em tudo · azul `#135bec` · Material Symbols (foguete, lâmpada, cérebro) · cards com sombra e
canto arredondado · avatar redondo pequeno · gradiente, glow, parallax, contador animado · Google
Fonts via CDN · widget de stats de terceiro.

---

## Tipografia

O contraste tipográfico é o principal recurso visual do site. Não há ícone, não há ilustração.

- **Display** (nome, títulos de seção, títulos de cargo): serifa editorial com caráter.
  **Newsreader** (variável, gratuita, auto-hospedável). Alternativas: Source Serif 4, Instrument
  Serif, Fraunces.
- **Corpo:** **Inter**, auto-hospedada, subset latino. Ela não compete, e o contraste já vem da
  serifa.
- **Mono:** **JetBrains Mono**, só onde significa: datas e períodos, rótulos, nomes de tecnologia,
  legenda dos gráficos. Mono decorativa é ruído.

```
nome         clamp(2.5rem, 6vw, 4.5rem)    serifa 400-500, line-height 1.05, tracking -0.02em
seção        clamp(1.6rem, 3vw, 2.25rem)   serifa
cargo/item   1.25rem                        serifa
corpo        1.0625rem                      sans, line-height 1.65
apoio        0.875rem                       sans, cor secundária
mono         0.8125rem                      tracking 0.02em
```

Medida de leitura de 60 a 70 caracteres (34rem a 38rem). Blocos de gráfico podem ir a 60rem.

---

## Cor

Base quase monocromática, tinta escura sobre papel quente, com um acento que aparece pouco.

**Recomendada, Cerne:**

```
--paper #EFE6D6   --ink #1A1410   --ink-soft #3E2B23   --rule #D6C9B3   --accent #B5793A
```

**Alternativa, Prumo:**

```
--paper #F7F8F9   --ink #14233A   --ink-soft #33373B   --rule #DCE0E4   --accent #2E6FA7
```

Escolher uma. O acento aparece no máximo uma vez por dobra de tela: link, item ativo, um dado.
**Dark mode fica fora da primeira versão**, porque tema escuro mal calibrado custa mais
credibilidade do que a ausência dele.

---

## Layout

- Coluna única centralizada, sem sidebar, sem hero dividido com imagem à direita.
- Espaço vertical generoso entre seções: `clamp(5rem, 10vh, 8rem)`.
- Regra fina de 1px em `--rule` como único ornamento e único divisor.
- **Cabeçalho não fixo.** Rola junto e vai embora. No mobile, os seis itens ficam numa faixa
  horizontal com rolagem, sem hambúrguer.
- Item ativo da navegação: regra fina embaixo, não cor, não pílula com fundo.
- O botão do currículo é o único elemento com contorno no site inteiro.

**Por seção:**

- **Abertura.** Cargo em mono pequena, nome em serifa grande, a frase de uma linha e o parágrafo.
  Sem foto, sem botão gigante, sem 100vh forçado. Termina rápido.
- **Sobre.** Quatro parágrafos, medida curta, muito ar.
- **Atividade.** Heatmap à esquerda e barra de linguagens à direita no desktop, empilhados no
  mobile. Legenda em mono pequena embaixo de cada um. A stack vem como texto corrido separado por
  `·`, nunca como nuvem de tags ou grade de logotipos.
- **Experiência.** Período em mono na coluna estreita à esquerda, conteúdo na coluna larga à
  direita, regra fina entre cargos. No mobile empilha, com o período virando rótulo acima. Sem
  linha do tempo com bolinha, sem ícone, sem card.
- **Projetos.** Lista com regra entre itens, no mesmo padrão da experiência. O Meu Feed Católico
  pode ganhar um screenshot bem enquadrado; os outros dois ficam em texto.
- **Escrita.** Data em mono à esquerda, título em serifa, resumo em sans. Sem imagem de capa, sem
  tag colorida, sem tempo estimado de leitura. Paginação em números discretos.
- **Contato.** E-mail em serifa, do tamanho de um título de seção. É a última coisa da página e
  merece peso.

---

## Os gráficos

- **Heatmap do GitHub e barra de linguagens do WakaTime: SVG inline, gerados no build** a partir
  das APIs. Nada de `ghchart.rshah.org`, de `github-profile-summary-cards` nem de
  `wakatime.com/share/...`, que é o que o Yuriy usa. São imagens de terceiro, que quebram sem
  aviso, custam requisição externa e chegam numa paleta que não é a sua.
- Escala de cor derivada do `--accent`, quatro níveis, célula vazia em `--rule`. **Nada de verde do
  GitHub**, que importa a marca de outro produto para dentro da paleta.
- No mobile, o heatmap rola dentro do próprio contêiner ou mostra os últimos seis meses e diz isso
  na legenda. Célula não encolhe até virar poeira.
- `role="img"` e `aria-label` com o texto da legenda. O número real está no texto ao lado, não
  preso no desenho.

---

## Escrita: `/escrita` e `/escrita/[slug]`

Content collection do Astro, frontmatter mínimo (`title`, `date`, `summary`, `lang`, `draft`), um
layout de índice e um de post. Quando a newsletter voltar, o trabalho é colar `.md` numa pasta.

No post: título em serifa, data em mono, e o texto começa. Sem imagem de capa, sem bio do autor no
topo, sem botão de compartilhar, sem barra de progresso. Código destacado em build com Shiki, zero
JavaScript em runtime. Citação com recuo e regra vertical fina, nunca aspas gigantes. RSS
obrigatório, com link no rodapé.

---

## Comportamento

- Navegação por âncora com rolagem suave, respeitando `prefers-reduced-motion`.
- Prefetch no hover para `/escrita`. Transição de view discreta entre a home e os posts.
- Zero deslocamento de layout: dimensão declarada em toda imagem, altura reservada para os
  gráficos, métrica de fallback ajustada na fonte.
- Teclado inteiro: foco visível e desenhado, `skip to content` como primeiro elemento focável.
- Link do corpo de texto sublinhado por padrão, com `text-underline-offset` respirando. Link que só
  se distingue por cor falha no teste do preto e branco.
- Fade-up no scroll pode ficar: 12px, 400ms, uma vez só. Nada de parallax, glow, texto que digita
  sozinho ou qualquer efeito que sinalize "feito com IA".

---

## Performance e acessibilidade

Fontes auto-hospedadas em woff2, subset latino. Imagens em AVIF com fallback WebP e dimensão
declarada. Zero JavaScript além do roteador do Astro. Contraste AA no mínimo, com atenção ao âmbar
sobre creme, que só serve em texto de 16px ou maior. Um `h1`, `h2` por seção. Meta: Lighthouse 100
em performance e acessibilidade, LCP abaixo de 1,5s em 4G.

**Fora da página:** `og-image` refeita no template novo (fundo `--paper`, frase em serifa, nome
embaixo, sem foto e sem gradiente), favicon com monograma `RS` em serifa, CV em PDF servido do
próprio domínio, `sitemap.xml` atualizado.

---

## Decisões que dependem de você

Paleta (Cerne ou Prumo) · serifa de display · foto: entra ou não entra · espanhol: mantém ou
aposenta.

# ronaldoscotti.com

Currículo em forma de site. Uma página, inglês em `/` e português em `/pt`, estático, sem
JavaScript de bundle.

**No ar:** [ronaldoscotti.com](https://ronaldoscotti.com)

## Rodando

```bash
npm install
npm run dev
```

| Comando | O que faz |
|---|---|
| `npm run dev` | servidor de desenvolvimento |
| `npm run build` | build (o `prebuild` atualiza o heatmap antes) |
| `npm run preview` | serve o build local |
| `npm run activity` | atualiza o heatmap do GitHub |
| `npm run languages` | recalcula a barra de linguagens pelos repositórios locais |
| `npm run shots` | recaptura os screenshots dos projetos |

## O que tem dentro

Astro 5 estático com Tailwind 4. Três blocos de JavaScript inline (revelar no scroll, seção ativa
na navegação, botão de ver mais) e nada além disso: zero bundle, zero requisição a domínio externo,
fontes auto-hospedadas.

Tema claro e escuro são paletas calibradas separadamente, não inversão uma da outra, com switcher e
sem flash no carregamento.

Duas coisas na página se atualizam sozinhas e viram commit automático:

- **Heatmap de contribuições**, do endpoint público do GitHub, sem token. Roda no `prebuild` e num
  cron diário do GitHub Actions.
- **Barra de linguagens**, calculada a partir do `git log` dos repositórios locais. Substitui o
  WakaTime, que é pago, e alcança código que não vive no GitHub pessoal. Como lê o disco, roda no
  launchd da máquina e não em CI.

Os artigos vêm de `src/data/posts.json` e apontam para o Substack. Não há blog neste repositório.

## Documentação

| Arquivo | Para quê |
|---|---|
| [`CLAUDE.md`](CLAUDE.md) | Convenções e arquitetura, para agentes e para humanos |
| [`docs/operacao.md`](docs/operacao.md) | Como a automação roda, onde, e o que fazer quando parar |
| [`docs/direcao-visual.md`](docs/direcao-visual.md) | Direção de arte: tipografia, paleta, regras de layout |
| [`docs/copy-pt.md`](docs/copy-pt.md) | Copy em português, com o critério de escolha dos artigos |
| [`docs/copy-en.md`](docs/copy-en.md) | Copy em inglês, escrita a partir do CV e não traduzida da PT |

A copy publicada mora em `src/i18n/translations.ts`. Os dois documentos de copy são a fonte
editorial: ao editar um, edite o outro.

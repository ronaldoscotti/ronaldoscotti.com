# DIREÇÃO-SITE.md

> **O que é este arquivo:** o briefing de direção do site `ronaldoscotti.com`, escrito no formato de
> prompt para o agente que vai executar a reforma. Não contém copy final. Contém o que o site precisa
> comunicar, para quem, com que provas, com que cara, e o que precisa morrer.
>
> **Regra zero:** antes de escrever uma linha de código ou de copy, leia os arquivos de contexto
> listados na seção 1. O posicionamento não está neste repo; está no repo irmão `../posicionamento`.
> Escrever copy sem ter lido aquilo produz exatamente o site que existe hoje e que precisa ser
> substituído.

---

## 1. Contexto obrigatório (leia nesta ordem, tudo em `../posicionamento/`)

**Núcleo (obrigatório, sem exceção):**

| Arquivo | O que extrair |
|---|---|
| `README.md` | O mapa do projeto de carreira: eixo, três futuros forkáveis, três pools-alvo, inegociáveis, e a **régua de honestidade** que vale para todo texto público. |
| `marca-identidade/MANIFESTO.md` | A alma e a voz. Seção I é o credo (a voz dele, literal). Seção II tem o posicionamento, quem compra, a prova, o que fica de fora e as travas. **É o documento mais importante da lista.** |
| `marca-identidade/vitrine/linkedin.md` | A vitrine EN **já publicada e viva**. Headline, About, experiências. O site tem que ser consistente com isso, palavra por palavra nos fatos e números. |
| `marca-identidade/vitrine/cv-nagringa.md` | O CV internacional principal. Fonte dos fatos, métricas e ordem de importância das evidências. |
| `ANDAMENTOS.md` | Onde o projeto está hoje (22/07/2026): o que está fechado, o que está pendente, o que **não** pode ser afirmado ainda (ex.: o nome da newsletter). |

**Complementar (leia se for mexer na área correspondente):**

| Arquivo | Quando |
|---|---|
| `marca-identidade/POSICIONAMENTO-E-NOMES.md` | Se for tocar em qualquer coisa de marca/newsletter/nome. Contém a teoria de naming e os 10 finalistas **ainda não decididos**. |
| `cv-e-design/INSTRUCOES-CLAUDE-DESIGN.md` | Antes de qualquer decisão visual. A direção de arte global ali (seção "Direção de arte global") vale para o site inteiro, não só para o deck de nomes. |
| `marca-identidade/meu-feed-catolico-leverage.md` | Se for construir a seção de prova/projetos. Define por que o MFC é a prova un-fakeable e **por quais partes técnicas ele deve ser apresentado**. |
| `marca-identidade/vitrine/cv.md` e `cv-christian.md` | Se a dúvida for quanto de fé mostrar e em que registro. |
| `livros/_convertidos/DIGEST_staff_engineer.md` | Se precisar calibrar altitude (Architect/Solver, não "senior melhorado"). |
| `livros/_convertidos/DIGEST_show_your_work.md` e `DIGEST_this_is_marketing.md` | Se for desenhar a seção de escrita/ensaios. |

**Não leia** `_arquivo/`, `lawnstarter/`, `aplicacoes/`: é material de processo seletivo e histórico, ruído para o site.

---

## 2. O diagnóstico (por que o site precisa mudar)

O site atual foi feito para um posicionamento que **foi explicitamente rejeitado** no projeto de
posicionamento. Comparação direta:

| O site diz hoje | O posicionamento atual diz |
|---|---|
| "Posso te ajudar com 3 coisas": validar MVP, automatizar processos, destravar decisões técnicas | Freela e venda de projetos de automação estão **fora** (`MANIFESTO.md`, "O que fica de fora"). Foi nomeado como "ser freela de novo" e regressão à zona de conforto. |
| CTA principal: "Chamar no WhatsApp" | Aquisição por **inbound e autoridade**, nunca prospecção nem canal de freela. Um hiring manager americano não chama ninguém no WhatsApp. |
| Hero: "12 anos construindo produtos digitais" + "Casado com a Poli, pai do Bento. Às vezes ajudo empresas..." | A frase de abertura desperdiça o único gatilho raro que ele tem: **founder com exit que nunca largou o teclado**. "Às vezes ajudo empresas" é a subvalorização (risco nº1 do projeto) escrita no H1. |
| Default em pt-BR, EN e ES como traduções | O comprador-alvo é VP/head de engenharia de startup americana. **EN é a língua-mãe do site**, PT é a casa. |
| Schema `ProfessionalService` + catálogo de serviços | Ele não vende serviço avulso. Schema é `Person`. |
| Seção "Você já passou por isso?" com 5 dores | Copy de página de vendas de infoproduto. A altitude do posicionamento é executiva: quem decide não se reconhece numa lista de dores, reconhece julgamento. |
| Visual: Inter + azul `#135bec` + Material Symbols + cards | É o template genérico que `INSTRUCOES-CLAUDE-DESIGN.md` manda evitar ("nada de visual startup de 2021"). Não diz nada sobre quem assina. |

**O que já está certo e deve sobreviver:** a honestidade da timeline (inclusive "quase quebramos"),
os projetos pessoais como prova, "Ora et labora" como assinatura sóbria de fé, a stack (Astro SSG +
Tailwind, rápido e sem firula), o i18n já montado.

---

## 3. A direção nova, em uma frase

> **De vitrine de serviços para vitrine de julgamento.**
> O site deixa de perguntar "posso te ajudar?" e passa a demonstrar **founder-grade judgment**:
> alguém que fundou, escalou e vendeu um SaaS, nunca largou a arquitetura, e hoje faz agentes de IA
> entregarem código de nível staff. O visitante certo sai com uma conclusão: *este cara decide bem, e
> o que ele constrói dura.*

**Eixo (do manifesto):** tecnologia com julgamento de dono. Código, produto e negócio na mesma cabeça.

**A palavra que o site tem que fazer o leitor pensar:** *julgamento* (EN: *judgment*). Não
"produtividade", não "soluções", não "inovação".

### Para quem, em ordem de prioridade

1. **Hiring manager / VP de engenharia / recrutador técnico de startup founder-led (EUA, seed a série B).**
   É quem decide a vaga em dólar, o caminho ativo hoje. Chega pelo LinkedIn, pelo CV, ou por busca do
   nome depois de receber uma candidatura. **O site é a página que confirma ou destrói a impressão do CV.**
   Ele lê em inglês, em 90 segundos, provavelmente no celular, e está procurando motivo para descartar.
2. **Founder / futuro sócio / cliente de CTO-as-a-service.** Não compra serviço na página, compra
   autoridade. Precisa enxergar altitude executiva, não catálogo.
3. **A tribo de builders** (leitores, pares, indicações). É a casa, não o alvo. Ganha a seção de escrita.

O site tem que servir os **três futuros** (dev path, consultant path, entrepreneur path) sem se
algemar a nenhum. Na prática isso significa: demonstrar julgamento e prova, e **não** publicar tabela
de serviços nem preço.

### A prova disponível (o fosso, use nesta ordem de força)

1. **Exit:** fundou o Orbit Pages, 67 mil usuários, 1.500 pagantes, R$100k+ MRR, vendido à Eduzz em 2023. A V1 roda até hoje.
2. **Nunca largou o teclado:** hoje é a referência técnica de um time de 9 na Eduzz, dono da camada de automação e dados da operação comercial.
3. **Agent-craft:** ship diário com AI coding agents; o ofício é fazer o agente escrever código que um senior assinaria (prompts, evals, guardrails, review loop). É o diferencial mais contemporâneo e mais raro da lista.
4. **A parábola da V1/V2:** construiu uma V2 linda que nunca subiu; a V1 imperfeita pagou salários e foi comprada. É a história que **prova julgamento econômico**, e é o antídoto contra a leitura de "artesão".
5. **Meu Feed Católico:** a prova un-fakeable, presente e clicável (multi-canon/versificação, tri-target Capacitor, prerendering para crawler, pipelines idempotentes). Ver `meu-feed-catolico-leverage.md` e liderar pelas partes difíceis, nunca por "app católico com muitos testes".
6. **Escrita:** 50+ edições publicadas (Jornada SaaS). Autoridade por ensaio, na linhagem engenheiro-ensaísta.

---

## 4. Arquitetura da página

Continua página única com âncoras, em inglês por padrão. Sequência proposta (a ordem é argumento,
não decoração: **quem é > por que confiar > o que provou > como pensa > como falar comigo**):

1. **Hero / statement.**
   Uma afirmação, não um resumo de currículo. Tem que carregar em uma linha: *exited founder + staff/principal IC que ainda arquiteta*. A frase de credibilidade abaixo é fato duro (exit + o que faz hoje), não adjetivo.
   Sem "às vezes", "posso ajudar", "apaixonado por". Nada que peça licença.
   Família e fé **não abrem** o site. Elas fecham (seção 8), onde soam como caráter e não como preâmbulo.
   CTA primário: currículo (PDF EN). Secundário: e-mail / LinkedIn.

2. **Proof bar (nova).**
   3 a 5 fatos curtos, sem card decorativo: exit; anos que a V1 roda; time do qual é referência técnica; escala da plataforma atual. Números que passam a régua de honestidade e o crivo de confidencialidade da Eduzz.

3. **The work / What I own today (nova, substitui "Serviços").**
   Não é catálogo de serviço. São 3 ou 4 **sistemas reais** com a decisão técnica por trás de cada um: scoring engine em Strategy Pattern, camada de chargebacks idempotente sobre quatro PSPs, API de pipeline com fan-out em quatro bancos e cache, qualification engine com outbox. Cada um em duas ou três linhas, com a decisão em evidência, não a lista de tecnologias.
   **Esta é a seção que substitui "Posso te ajudar com 3 coisas". Aquela seção é deletada.**

4. **The judgment call (nova, o coração do site).**
   A parábola da V1/V2 contada como decisão econômica, não como humildade de artesão. É a única seção onde ele fala em primeira pessoa e longa. É o que diferencia este site de um portfólio.
   Puxar de `MANIFESTO.md` seção I, sem reescrever a voz dele para "marketing".

5. **Journey.**
   Mantém a timeline (funciona), mas reescrita para a altitude nova: cada período termina no que **passou a saber decidir**, não no que fez. Corte o autodepreciativo onde ele vira desconto ("por uma merreca", "eugência" fica só se soar como origem e não como pedido de desculpa).
   Cuidado factual travado no projeto: **"PHP since 2015, Laravel since 2019 (Orbit Pages)"**.

6. **Built / Proof of work.**
   Projetos, com o MFC promovido a destaque e apresentado pelas partes difíceis. Orbit Pages entra como exit, não como produto em catálogo. Screenshots decentes valem mais que texto.

7. **Writing (nova ou expandida).**
   O engenheiro-ensaísta. Hoje "Jornada SaaS" aparece como produto; deveria aparecer como corpo de escrita. **Atenção:** o nome novo da newsletter **ainda não foi decidido** (`ANDAMENTOS.md`, Fase 2, parada). Não invente nome, não hardcode marca. Construa a seção de forma que aceite um nome depois: por ora, "Writing" com link para o arquivo existente.

8. **Who I am / Contact.**
   Aqui entram família, interior de Santa Catarina, fé ("Ora et labora" fica). Sóbrio, uma frase cada, sem confissão de fé militante. Percebido, nunca anunciado.
   Contato: e-mail e LinkedIn. **Remover o WhatsApp como CTA primário** (pode ficar escondido no rodapé em PT, se ele quiser manter para contatos brasileiros).
   Incluir localização e fuso: Florianópolis, UTC-3, overlap com horário dos EUA, disponível remoto. Isso responde uma objeção real de recrutador americano.

**Seções deletadas:** `Problems.astro` (as 5 dores) e `Services.astro` (os 3 serviços). Deletar de
verdade, dos três idiomas e do schema, não comentar.

---

## 5. Idioma e i18n

- **EN vira o default em `/`.** PT-BR passa para `/pt`, ES fica em `/es` (ou é descontinuado, se não houver público real; decisão dele).
- Isso exige: redirect/canonical corretos, `hreflang` revisto, `og:locale` por rota, sitemap atualizado. Nada de conteúdo EN morando em rota PT.
- **A versão PT não é tradução literal da EN.** A EN fala com quem contrata lá fora; a PT fala com a casa (tribo, leitores, rede). Mesma espinha, ênfases diferentes: a PT pode dar mais espaço à escrita e à fé.
- Voz EN: a do `linkedin.md`. Direta, factual, sem hype, primeira pessoa. Voz PT: a do `MANIFESTO.md` seção I.

---

## 6. Direção visual (impacto sem firula)

A régua está em `../posicionamento/cv-e-design/INSTRUCOES-CLAUDE-DESIGN.md`, seção "Direção de arte
global". Traduzida para o site:

**O tom.** Sênior, sóbrio, adulto, com peso editorial. É o site de um fundador que vendeu uma empresa
e escreve ensaios. A referência mental é publicação editorial e memorando técnico, não landing page
de SaaS.

**O que muda em relação ao site atual:**

- **Tipografia carrega o impacto, não o efeito.** Hoje tudo é Inter. A direção nova pede uma **serifa
  editorial com caráter** para display (headline, aberturas de seção) contra uma sans neutra e discreta
  no corpo. O contraste tipográfico é o principal recurso visual do site. Escala grande e confiante no
  hero: uma frase pode ocupar a tela inteira. Medida de leitura curta no corpo (60 a 70 caracteres).
- **Restrição cromática.** Fora o azul `#135bec` genérico. Uma base quase-monocromática (tinta escura
  sobre papel quente, ou o inverso) com **um único acento**, e o acento aparece pouco. Paletas de
  referência aceitáveis estão nas fichas de Cerne (nogueira/âmbar/creme), Prumo (grafite/azul-planta)
  e Esteio (ardósia/carvalho/osso) no doc de design. Escolher **uma** e ser consistente.
  Teste obrigatório: **o site tem que funcionar em uma cor só.** Se a página perde sentido em preto e
  branco, a hierarquia está apoiada em cor, e está errada.
- **Fora os Material Symbols.** Ícone de foguete, lâmpada, cérebro e afins são o clichê que o doc de
  arte proíbe nominalmente. Se precisar de marcadores, use tipografia (numeração, versaletes, regras
  horizontais finas) ou um símbolo próprio desenhado.
- **Espaço negativo é o material principal.** Menos seções, mais ar dentro de cada uma. Cards com
  sombra e borda arredondada são a estética do template atual: reduzir a régua, linha e espaço.
- **Fotografia com intenção.** Uma foto boa, humana, em escala generosa vale mais que o avatar redondo
  atual. Se não houver foto à altura, é um item de backlog explícito, não algo para disfarçar.
- **Movimento discreto.** O fade-up em scroll pode ficar, mas contido. Nada de parallax, glow, gradiente
  animado, contador subindo. Nenhum efeito de "IA".
- **Densidade de prova.** O impacto visual de um site de engenheiro staff vem de mostrar coisa real:
  um diagrama de arquitetura desenhado a sério, um trecho de código legível, um screenshot bem
  enquadrado. Vale mais que qualquer ilustração comprada.
- **Performance é parte do argumento.** Fonte auto-hospedada em vez de Google Fonts via CDN, imagens
  em AVIF/WebP com dimensão declarada, zero JS que não seja necessário. Um site lento contradiz o
  posicionamento. Meta: Lighthouse 100/100 em performance e acessibilidade, LCP abaixo de 1,5s em 4G.
- **Acessibilidade não é opcional.** Contraste AA no mínimo, foco visível, navegação por teclado,
  `prefers-reduced-motion` respeitado, hierarquia de headings correta.
- **Dark mode:** só se sair bem feito nos dois. Um tema escuro mal calibrado custa mais credibilidade
  do que a ausência dele.

---

## 7. SEO, schema e metadados

- **Schema:** manter `Person` (enriquecido: `alumniOf`, `worksFor`, `knowsAbout`, `sameAs` com LinkedIn/GitHub) e `WebSite`. **Remover `ProfessionalService`** e o catálogo de ofertas: não corresponde mais ao que ele é.
- **Title/description EN** alinhados à headline do LinkedIn. Palavras que importam para o comprador: *staff software engineer, software architect, exited SaaS founder, AI coding agents, LLM systems in production, Laravel, TypeScript, remote*. As keywords atuais ("consultor automações", "validação de MVP") atraem exatamente o público errado.
- `og-image.png` precisa ser refeito com a marca visual nova e a mensagem nova (hoje é o material antigo). É o que aparece quando alguém cola o link no Slack de um time contratante.
- Manter `robots.txt`/`sitemap.xml` corretos após a troca de rotas.
- Adicionar link para o CV em PDF (EN) servido do próprio domínio. Um recrutador que acha o site tem que conseguir baixar o CV sem pedir.

---

## 8. Réguas invioláveis (valem para toda copy do site)

Vêm do `README.md` e do `MANIFESTO.md` do repo de posicionamento. Não são preferências de estilo:

1. **Sem inflar.** Nada de "real-time" onde é batch, "high-throughput" onde é baixo volume, "$100M"
   onde é R$1,2B de GMV. O entrevistador técnico pega. Reframe na altitude certa é válido; mentir não.
2. **Sem travessão (—) em nenhum texto de perfil.** É tell de IA. Pontuação de caneta.
3. **Crivo de confidencialidade Eduzz** para qualquer número interno (GMV, 2M qualifications, % de cache).
   Na dúvida, arredonde sem perder a escala.
4. **Nunca se apresentar abaixo de senior**, e por padrão apresentar-se como staff. Risco nº1 do projeto
   é subvalorização. Toda frase que começa com "às vezes", "um pouco de", "ajudo com" é candidata a corte.
5. **Voz dele:** direta, sem hype, julgamento de dono, pragmatismo que entrega. V1 que sobe vale mais
   que V2 que não sobe.
6. **Fé:** presente, sóbria, sem proselitismo. Percebida pelo modo, não anunciada em banner.
7. **IC por escolha, não por falta de opção.** Se o site tocar em ambição de carreira, é "build and make
   the calls", não "gerir pessoas".

---

## 9. O que não fazer

- Não escrever tabela de serviços, pacote, escopo ou preço. Não é o que ele vende.
- Não inventar nome de newsletter nem identidade de marca nova: a decisão está aberta e é dele.
- Não colocar depoimento fabricado, logo de cliente sem direito de uso, ou métrica sem lastro.
- Não usar copy de página de vendas (dor, agitação, escassez, "vagas limitadas"). Altitude errada.
- Não transformar o site em blog completo agora. A seção de escrita é uma porta, não um CMS.
- Não adicionar dependência nova sem necessidade real (analytics pesado, biblioteca de animação,
  framework de UI). Astro estático com Tailwind resolve tudo que este briefing pede.
- Não traduzir a copy EN mecanicamente para PT e ES. Ver seção 5.

---

## 10. Ordem de execução sugerida

**Fase 1, o que muda a leitura do site (faz o maior efeito com o menor diff):**
1. Reescrever hero, deletar `Problems.astro` e `Services.astro`, criar "The work" e "The judgment call".
2. Trocar CTA de WhatsApp para CV + e-mail + LinkedIn.
3. EN como default em `/`, PT em `/pt`, canonical e hreflang corretos.
4. Corrigir schema (fora o `ProfessionalService`) e os metadados EN.

**Fase 2, a cara:**
5. Sistema tipográfico e paleta novos, fontes auto-hospedadas, fora os Material Symbols.
6. Refazer `og-image.png` e a apresentação dos projetos (MFC em destaque, pelas partes difíceis).

**Fase 3, o que compõe com o tempo:**
7. Seção de escrita ligada ao arquivo existente, pronta para receber o nome quando ele for fechado.
8. Diagrama de arquitetura ou writeup técnico próprio como peça-âncora EN.

**Pronto quando:** um VP de engenharia americano abre o site no celular, em 90 segundos entende que é
um founder com exit que ainda arquiteta e faz agentes entregarem código de nível staff, consegue baixar
o CV, e não encontra uma única frase que soe como freelancer procurando projeto.

---

## 11. Decisões que dependem dele (não decidir sozinho)

- Manter ou aposentar o espanhol.
- Manter o WhatsApp em algum lugar da versão PT.
- Qual das paletas de referência adotar (o doc de design tem dez; o site precisa de uma).
- Se o código do Meu Feed Católico será público (muda o quanto a seção de prova pode mostrar).
  Está aberto em `meu-feed-catolico-leverage.md`.
- Foto nova: sim ou não.

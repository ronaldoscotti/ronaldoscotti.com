# Operação

Como o site se mantém sozinho, o que roda onde, e o que fazer quando alguma coisa quebra ou você
troca de máquina.

---

## O resumo

O site é estático. Nada nele consulta API em tempo de visita: os dados são gravados em
`src/data/activity.json`, commitados no repositório, e viram HTML no build. Então "atualizar o
site" sempre significa **gerar o JSON de novo e fazer um build**.

São dois dados que envelhecem, e eles vêm de lugares diferentes:

| Dado | De onde vem | Onde o job roda | Quando |
|---|---|---|---|
| Heatmap de contribuições | github.com (endpoint público) | GitHub Actions | todo dia, 06:00 UTC |
| Heatmap de contribuições | github.com (endpoint público) | onde o deploy acontece | a cada build |
| Barra de linguagens | seus repositórios git **locais** | **seu Mac** (launchd) | 04:00 e 13:00, mais todo login |

**Por que dois lugares.** O heatmap sai de uma URL pública, então qualquer máquina do mundo busca.
A barra de linguagens sai de `git log` nos seus repositórios, que só existem no seu Mac. É
justamente isso que a torna melhor que a API do GitHub: ela mede quanto você mexeu em cada
linguagem no último ano, e enxerga o código de trabalho que não vive no seu GitHub pessoal. O
runner do GitHub Actions não tem esses repositórios, então não há como rodar lá.

---

## Respondendo direto

**Roda quando eu commito ou faço push?**
Não. Os dois jobs são por horário, não por evento de git. O que acontece no push é o deploy, e o
deploy roda o `prebuild`, que atualiza o heatmap. A barra de linguagens não é tocada por push
nenhum.

**Então em que momento cada coisa muda?**

- Você programa às 15h de terça. O gráfico do site **não muda** naquele momento.
- Às 04:00 de quarta o launchd roda no seu Mac, recalcula as linguagens, e se mudou, commita e dá
  push. O push dispara o deploy, o site sai no ar com o dado novo. Se o Mac estava dormindo às
  04:00, roda quando você abrir a tampa.
- Às 06:00 UTC (03:00 aqui) o GitHub Actions roda, atualiza o heatmap, e se mudou, commita e dá
  push. Mesmo efeito.
- Se você fizer um deploy manual a qualquer hora, o `prebuild` já traz o heatmap fresco junto.

**O commit é automático mesmo?**
Sim, os dois jobs commitam e fazem push no `main` sozinhos, e só quando o dado realmente mudou.
Dia sem programar não gera commit. As mensagens são sempre `chore: refresh activity`.

**As estatísticas do GitHub são automáticas de verdade?**
São, e sem token. O script lê `github.com/users/ronaldoscotti/contributions`, que é público e já
inclui suas contribuições privadas porque você tem esse sinal ligado no perfil. Se um dia você
desligar "private contributions" no GitHub, o número despenca e o gráfico passa a mostrar só o
público. Nesse caso, defina um `GITHUB_TOKEN` e o script muda sozinho para a API GraphQL.

---

## E se o Mac estiver desligado ou dormindo às 04:00?

Depende do estado, e o job cobre os três casos.

**Dormindo, tampa fechada, hibernando.** O launchd **não perde** o horário, diferente do cron. O
`man launchd.plist` é explícito: *"Unlike cron which skips job invocations when the computer is
asleep, launchd will start the job the next time the computer wakes up. If multiple intervals
transpire before the computer is woken, those events will be coalesced into one event upon wake."*
Você abre o notebook às 9h, o job roda ali. Ficou três dias fora, roda **uma vez** ao acordar, não
três.

**Desligado.** Aí o horário é perdido de verdade, porque o launchd nem estava rodando. Por isso o
plist tem `RunAtLoad`: o agente carrega no login, e o primeiro login depois de um desligamento
executa o job.

**Ligado mas sem rede** (cold boot, wifi ainda subindo). O script tenta o GitHub, falha, usa o
`activity.json` commitado e segue para a parte local, que não precisa de rede. Não existe
`KeepAlive` no plist de propósito: as chaves dele são OR, então `NetworkState` faria o job
reiniciar toda vez que a rede estivesse no ar, o que vira loop.

**Backstop.** Além das 04:00 há uma segunda execução às 13:00, para o dia que começou torto. O
script sai cedo quando nada mudou, então execução extra custa cerca de um segundo e não gera
commit. `ThrottleInterval` de 3600 impede que ele rode mais de uma vez por hora.

**O caso que não é coberto:** Mac desligado e você nunca mais liga. A barra de linguagens congela
no último dado commitado, e é só isso. O site não quebra, o heatmap continua atualizando pelo
GitHub Actions, e a página não mostra buraco nem erro.

---

## Se você trocar de Mac

O GitHub Actions continua funcionando sem você fazer nada, porque roda na nuvem. **A barra de
linguagens para**, porque o launchd vive na máquina antiga.

Para religar na máquina nova:

```bash
cd ~/work/personal/ronaldoscotti.com
cp scripts/com.ronaldoscotti.site-activity.plist ~/Library/LaunchAgents/
launchctl load ~/Library/LaunchAgents/com.ronaldoscotti.site-activity.plist
launchctl start com.ronaldoscotti.site-activity   # testa agora, não espera as 4h
cat /tmp/ronaldoscotti-activity.log
```

Três coisas precisam ser verdade na máquina nova, senão o job roda e não faz nada:

1. O repositório está em `~/work/personal/ronaldoscotti.com`. O caminho está escrito no plist; se
   você guardar em outro lugar, edite o `<string>cd ...</string>` antes de copiar.
2. Seus projetos estão em `~/work`, até três níveis de profundidade. É onde o script procura
   repositório git.
3. O `git push` funciona sem pedir senha (chave SSH configurada). Se pedir senha, o job trava.

**Enquanto você não religar**, nada quebra. O site continua mostrando o último dado commitado, e o
único sintoma é a barra de linguagens congelar. Não some, não vira erro, não deixa buraco na
página.

---

## Rodar na mão

```bash
npm run activity     # só o heatmap
npm run languages    # só a barra de linguagens
npm run shots        # recaptura os screenshots dos projetos
npm run build        # build (já roda o activity antes, via prebuild)
```

E o job inteiro, do jeito que o launchd chama:

```bash
./scripts/update-activity.sh
```

---

## Diagnóstico

```bash
launchctl list | grep ronaldoscotti     # carregado?
cat /tmp/ronaldoscotti-activity.log     # o que aconteceu na última execução
git log --oneline --grep="refresh activity" -5    # quando ele commitou pela última vez
```

**O launchd está carregado mas o log está velho.** O Mac provavelmente estava desligado ou
dormindo às 04:00. O launchd roda o job assim que a máquina acorda, mas se você ficou dias fora,
as execuções perdidas não se acumulam: roda uma vez e pronto, o que já basta.

**O log diz "no change" todo dia.** Correto se você não programou. Se você programou e mesmo assim
não muda, confira se os commits saíram com um dos emails da lista:

```bash
git -C ~/work/algum-projeto log -5 --pretty='%ae'
```

O padrão são `ronaldoscottis@hotmail.com` e `ronaldoscottis@gmail.com`. Email diferente, defina
`GIT_EMAILS` no `update-activity.sh` com a lista separada por vírgula.

**O GitHub Actions não roda.** O GitHub desliga cron de repositório sem atividade por 60 dias.
Basta um commit qualquer para religar, ou dispare na mão em Actions → Refresh activity → Run
workflow.

**O build quebrou por causa da rede.** Não quebra. Se o endpoint do GitHub não responder, o script
usa o `activity.json` commitado, marca `stale: true` e o build segue.

---

## Quando alguma coisa muda de lugar

| Mudou | Onde arrumar |
|---|---|
| GitHub trocou o HTML do calendário | `scripts/fetch-activity.mjs`, função `githubPublic`. Ela já falha alto: se parsear menos de 300 dias, lança erro em vez de gravar um gráfico vazio |
| Você usa outro email no git | `GIT_EMAILS` em `scripts/update-activity.sh` |
| Seus projetos saíram de `~/work` | `LOCAL_REPOS` em `scripts/update-activity.sh` |
| Você assinou o WakaTime | Defina `WAKATIME_API_KEY` e ele passa a ser a fonte da barra, sem mexer em código |
| Você abriu os repositórios no GitHub | Um `GITHUB_TOKEN` faz o `fetch-languages.mjs` usar a API em vez do disco local |
| Um projeto mudou de visual | `npm run shots` recaptura os quatro |
| `jornadasaas.com` voltou ao ar | Troque o domínio em `src/data/posts.json`. Hoje aponta pro Substack porque o domínio dá 404 |

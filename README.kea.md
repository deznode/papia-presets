> **DRAFT — needs native-speaker review.** Pull requests welcome.

> [English](./README.md) | **Kriolu**

# papia-presets

Presetis di glosáriu kuratoriadu pa komunidadi pa [Skrebe](https://papia.studio), editor di traduson markdown pa Kriolu di Kabu Verdi (ALUPEC).

Kada preset é un vokabuláriu pikenu i fokadu na un duminiu spesífiku — saúdi, edukason, sirvisus sivikus, tekenolojia, relijaun, etc. Uzuárius di Skrebe ta navega na katalogu li dentu di aplikason, ta instala kes ki es ta meste, i ta resebe sujeston di termu i tcheku di konsistensia apropriadu pa duminiu, kantu sta tradusi.

## Navega katalogu

Abri **Marketplace** na Skrebe. Lista ki bu ta odja ta ben di [`index.json`](./index.json) di es repo, regeradu otomatikamenti tudu bes ki un preset é adisionadu ô atualizadu.

## Kontribui un preset

Bu ka meste ser dezenvolvedor. Si bu sabe edita un folha di kálkulu i kore dôs komandu na terminal, bu pode kontribui. Guia kumpletu pasu-a-pasu: **[CONTRIBUTING.kea.md](./CONTRIBUTING.kea.md)**.

Verson kurtu:

1. Faze fork di es repo.
2. Kore `pnpm install` un bes.
3. Kore `pnpm new-preset <id>` pa kria un folder novu di preset.
4. Inxi `glossary.json` (ô esporta un di Skrebe i poi-l la).
5. Kore `pnpm validate <id>` te ki ta pasa.
6. Abri un pull request.

Un maintainer ta reviza. CI ta verifika ortografia i strutura. Dipos di merge, bu preset ta parese na Skrebe na poku minutu.

## Strutura di repositóriu

```
presets/
  <preset-id>/
    manifest.json      ← metadatu (nomi, duminiu, verson, autoris, fontis)
    glossary.json      ← entradas di termu propi
    README.md          ← kontestu, públiku-alvu, notas di dialetu
    CHANGELOG.md       ← ke ki mudou na kada verson
schema/                ← JSON Schemas ki ta defini formatu di fitxeru
scripts/               ← validate, build-index, new-preset
index.json             ← otu-geradu; ka edita-l a mon
```

## Lisensia

Tudu presetis i dokumentason na es repo sta lisensiadu sob [CC BY-SA 4.0](./LICENSE). Kontributoris ta manten autoria; uzuárius downstream debe da kreditu a kontributoris orijinal i partilha trabadjus derivadu sob mesmu lisensia.

Kantu bu submeti un pull request, bu ta konkorda libra bu kontribuison sob CC BY-SA 4.0.

## Governason

Es katalogu é parti di prujetu [Papia Studio](https://github.com/deznode/papia-studio). Maintainers ta triadja PRs, ta mediadja disputas sobri terminolojia, i ta disidi kal presetis ta resebe flag "Recomendadu" na marketplace di Skrebe.

Diskorda di un dizizon di kuradoria? Bu pode **faze fork di katalogu** i hospeda un alternativu. Skrebe ta dexa uzuárius adisiona URLs di katalogu kustumizadu na setings — pluralizmu sta konstruidu na sistema.

## Perguntas

- **Atxa un termu eradu?** Abri un issue na preset, ô manda un PR ku korreson.
- **Kre un duminiu novu ki ka inda eziste?** Abri un [pididu di preset](./.github/ISSUE_TEMPLATE/preset-request.md) — alguen pode voluntaria pa autoria.
- **Sta konstrui ferramenta riba di es katalogu?** Schemas na [`schema/`](./schema) é kontratu stabel. Pin `schemaVersion: 1` i bu sta siguru.

> **DRAFT — needs native-speaker review.** Pull requests welcome.

> [English](./CONTRIBUTING.md) | **Kriolu**

# Kontribui un preset

Obrigadu pa kre djuda konstrui es komuns di glosáriu di Kriolu. Es guia ta leba-u pa tudu fluxu, di idea te preset merged.

Si algun kuza li ka sta klaru, é bug di nos — favor abri un issue i nu ta fixa dokumentu.

---

## Antis di kumesa

Disidi três kuza:

1. **Duminiu.** Kal sentu ki bu preset ta kobri? Saúdi, edukason, agrikultura, relijaun, múzika, tek, sirvisus sivikus, etc. Mante-l strétu — un preset apertadu di 80 termu é midjor ki un di 800 termu spadjadu.
2. **Públiku.** Ken ki ta uza es kuza? Materiál pa pasienti ta lê diferenti di notas klínika; tekstu di skola ta diferensia di artigu akadémiku. Marka es kuza na README di bu preset.
3. **Kobertura di dialetu.** Santiagu (Badiu)? Sãu Visenti (Sanpajudu)? Tudu dôs? Marka es kuza na manifest. Mistura dialetu sen sinaliza é problema más kumun na rivizon.

Si bu duminiu ka inda eziste, ka ten problema — bai en frenti i kria-l.

---

## Setup di un bes

Bu ta meste [Node.js 20+](https://nodejs.org/) i [pnpm](https://pnpm.io/installation).

```sh
git clone https://github.com/YOUR-USERNAME/papia-presets.git
cd papia-presets
pnpm install
```

É só si. Repo ka ten dipendénsia di runtime alén di un validador di JSON schema.

---

## Fluxu di autoria

### Opson A — Konstrui-l na Skrebe i esporta

Es é di lonji kaminhu más fásil. É tanbé más konfiabel, pamodi linter ALUPEC di Skrebe ta panha errus di ortografia kantu bu sta skrebi.

1. Abri Skrebe, kria ô abri kualker dokumentu.
2. Abri panel di Glosáriu. Adisiona bu termus un pa un, ô importa un CSV.
3. Esporta komo `.glossary.json` (Panel di Glosáriu → Esporta → JSON).
4. Poi fitxeru esportadu na `presets/<bu-preset-id>/glossary.json`.

### Opson B — Skrebe JSON diretamenti

1. Kria un preset novu:

   ```sh
   pnpm new-preset health-basic
   ```

   Es ta kria `presets/health-basic/` ku stub di `manifest.json`, `glossary.json`, `README.md`, i `CHANGELOG.md`.

2. Edita `manifest.json` — inxi nomi, diskrison, autoris, fontis. Odja [`schema/preset-manifest.schema.json`](./schema/preset-manifest.schema.json) pa kada kampu.

3. Edita `glossary.json` — adisiona bu entradas. Formatu sta dokumentadu na [`schema/glossary-entry.schema.json`](./schema/glossary-entry.schema.json). Entrada mínimu:

   ```json
   {
     "source": "informed consent",
     "targets": [{ "term": "konsentimentu informadu", "preferred": true }],
     "policy": "must"
   }
   ```

4. Atualiza `entryCount` di `manifest.json` pa korresponde a númeru di entradas.

---

## Valida antis di submeti

Kore validador lokalmenti — el ta panha mesmu kuzas ki CI, más rápidu.

```sh
pnpm validate health-basic
```

Un kore verdi ta sinifika:

- Anbus fitxeru ta parse i ta korresponde ku si schema
- `entryCount` ta korresponde ku entradas reál
- Sen termu `source` dupliku dentu di preset
- Tudu kampu obrigatóriu di manifest sta prezenti

Un kore vermedju ta imprimi izatamenti ke ki sta eradu i undi. Fixa-l i kore di novu te bira verdi.

---

## Submeti

1. Faze commit di bu mudansas na un branch:

   ```sh
   git checkout -b add-health-basic
   git add presets/health-basic
   git commit -m "Add health-basic preset (87 entries)"
   git push origin add-health-basic
   ```

2. Abri un pull request. Uza template **"New preset"** — el ta pidi duminiu, fontis, i kobertura di dialetu. Inxi-l kumpletu ta atrijinha rivizon.

   **Skodje template Kriolu:** GitHub ka ta mostra un menu di template di PR otomatikamenti kantu ten múltipu template. Pa uza bersãu Kriolu, adisiona `?template=new-preset.kea.md` na fin di URL di kriason di PR. Ezemplu:

   ```
   https://github.com/deznode/papia-presets/compare/main...bu-branch?template=new-preset.kea.md
   ```

   Pa atualizason di preset, uza `update-preset.md` ô `update-preset.kea.md`.

3. CI ta kore otomatikamenti (~1 minutu). Odja painel di checks:
   - **Validason di schema** — formatu di fitxeru sta korretu
   - **Integridadi di entrada** — kontas ta korresponde, sen dupliku
   - **Linter ALUPEC** — kada termu alvu ta pasa tcheku di ortografia (eru ta bloka merge; avisu ta komentadu ma é permitidu)
   - **Bump di verson** — só obrigatóriu kantu sta atualiza un preset ki ja ta eziste

4. Un maintainer ta reviza. Nu pode sujeri mudansa — terminolojia, alkance, notas di dialetu. Es ka é rejeson; é manera ki nu ta manten katalogu útil.

5. Na merge, `index.json` ta regenera i bu preset ta fika sta na marketplace di Skrebe dentu di próxiumu siklu di cache (≤1 ora).

---

## Atualiza un preset ki ja ta eziste

Maintainers di un preset sta listadu na si `manifest.json` sob `maintainers`. Es pode faze merge di atualizason sen un rivizon separadu. Otu kontributoris é mutu ben-vindu pa manda atualizason — só meste sign-off di un maintainer.

Kada atualizason **ten ki bumpa verson** na `manifest.json` siginu [semver](https://semver.org/):

- **Patch** (1.0.0 → 1.0.1) — korreson di tipo, klarifikason di notas
- **Minor** (1.0.0 → 1.1.0) — entradas novu adisionadu, sen mudansa ki ta keba
- **Major** (1.0.0 → 2.0.0) — termus tiradu ô tradusãu preferida mudadu (es ta afeta tradusons aprovadu di uzuárius downstream)

Dokumenta kada mudansa na `CHANGELOG.md` di preset.

---

## Kritériu di rivizon

Un maintainer ta verifika:

1. **Alkance é klaru.** Duminiu di preset sta ben defenidu i entradas ta kabe nel.
2. **Fontis é kredíbel.** Glosários governamental, materiál peer-reviewed, uzu komunitáriu stabelesedu, ô autoris peritu nomeadu. "Sensu komun" sô ka é fonti.
3. **Konformidadi ku ALUPEC.** Termus alvu ta pasa linter (CI ta enforsa).
4. **Onestidadi di dialetu.** Si entradas sta predominantimenti di un dialetu, manifest ta dize-l.
5. **Sen duplikason ku presetis ki ja eziste.** Si bu entrada di "consent" ta kontradidi un na otu preset ki ja merged, nu ta diskuti kal é kanóniku ô si tudu dôs ta kueksisti ku alkance más klaru.

Nu ka ta gatekeep na stilu ô kompletu. Un preset di 30 entradas fokadu pa un peritu di duminiu é más válidu ki 300 entradas di palpiti.

---

## Kódigu di konduta

Sé respetuoz na diskuson di PRs. Debati di terminolojia pode bira kenti — spesialmenti riba di skolha di dialetu, lingua relijozu, i vokabuláriu politikamenti sensível. Nu ta sumi boa fé i ta pidi tudu mundu ta faze mesmu. Ataki pesoal ô lingua dismisivu pa dialetu, rejion, ô kontributoris ta fexa PR.

---

## Perguntas

Abri un issue, ô pergunta na thread di diskuson di un PR ki ja sta abertu. Maintainers ta responde kostumadamenti dentu di poku dia.

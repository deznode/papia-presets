# Skrebe Translator Workflow

The catalog's seed preset — a small, dense vocabulary covering the words a Skrebe user actually encounters while translating English Markdown into Cape Verdean Kriolu. Twenty entries, Santiago dialect, MIT-licensed.

This preset exists for two reasons:

1. **Marketplace seed.** The `papia-presets` catalog needs to ship with at least one credible preset so that Skrebe's marketplace UI has something to render. This is that preset.
2. **Pedagogical anchor.** Several entries codify rules the Skrebe ALUPEC linter already enforces — the four-way "and" trap (`ku` / `y` / `i` / never `e`), the `mas` / `ma` / `más` distinction, the forbidden Portuguese calques (`porque`, `não`, `más`). Installing this preset makes the linter's vocabulary visible to translators inside the glossary panel.

## Audience

Anyone using Skrebe to translate English-source Markdown into Kriolu. The vocabulary is intentionally narrow:

- **Editor verbs**: open, save, read, write, close, translate, help
- **Workflow nouns**: document, word, sentence, project, translation
- **Function words**: the "and" conjunction family, "but", "you" (with register distinctions)
- **Calque traps**: forbidden Portuguese forms of "because", "not", "more"
- **Proper nouns**: ALUPEC, Kriolu

It is **not** a general English-Kriolu dictionary. Pair it with a domain preset (health, education, civic-government) when you need vocabulary for a specific field.

## Dialect notes

All entries reflect Santiago (Badiu) usage. Where alternative dialect forms exist (e.g. São Vicente `salva` vs. Santiago `guarda` for "save"), they are mentioned in the entry's `notes` field but not encoded as separate targets — that's for a future multi-dialect preset.

## Pedagogical highlights

- **Entry "and"** — the catalog's most-cited rule, with `ku` / `y` / `i` as the three valid choices and a notes-field warning that `e` (the copula "is") must never be used as "and". This is the single most common Portuguese-interference bug in Kriolu writing. See [ADR-0013](https://github.com/deznode/papia-studio/blob/main/docs/adr/0013-alupec-and-conjunction-design.md).
- **Entry "you"** — exercises the `register` field with `bo` (neutral), `nhu` (formal, masculine), `nha` (formal, feminine).
- **The three "avoid" entries** (`because`, `not`, `more`) mirror exactly the three calque rules the Skrebe linter already enforces: `ALUPEC_CALQUE_PORQUE`, `ALUPEC_CALQUE_NAO`, `ALUPEC_CALQUE_MAS`. Installing this preset puts those rules into the glossary panel where translators see them at lookup time, not only at lint time.

## Bootstrap-curated entries (flagged for community review)

This being the catalog's first preset, several computing-domain terms are **constructed from Portuguese-to-ALUPEC mappings** rather than attested in a published Kriolu source. They are listed below; pull requests refining them with native-speaker input are welcome.

| Entry | Proposed target | Why it's flagged |
|---|---|---|
| `translation` → `tradusan` | Mechanical mapping (PT *tradução* → ALUPEC `ç→s`, `ão→an`) | No published attestation; `tradusu` / `tradusion` are plausible alternatives |
| `translate` → `traduzi` | Regular `-i` verb pattern | Not in Peace Corps dictionary; pattern is regular but the specific lemma isn't attested |
| `close` → `fitxa` | Extended from "lock" sense | Peace Corps lists `fitxa` primarily as "lock"; the document-close sense is an extrapolation |
| `save` → `guarda` | Extended from "protect/keep" sense | Computing/UI extension of a general verb; the alternative `salva` exists |

A maintainer will ask a native Kriolu speaker to review these before tagging `1.0.0`.

## Sources

- `docs/glossary.md` in [`deznode/papia-studio`](https://github.com/deznode/papia-studio) — project-normative terms (ALUPEC, Kriolu, dialect names, ASR/TM).
- [ADR-0013](https://github.com/deznode/papia-studio/blob/main/docs/adr/0013-alupec-and-conjunction-design.md) — canonical "and" conjunction design.
- Resolução n.º 48/2005 and Decreto-Lei n.º 67/98 — Cape Verde government ALUPEC spec.
- [Peace Corps Kriolu Dictionary](https://files.peacecorps.gov/multimedia/pdf/library/CV_Kriolu.pdf) — general lexicon (entries 6, 7, 13, 14, 15, 16).
- [Omniglot Cape Verdean Creole](https://www.omniglot.com/writing/caboverdean.htm) — ALUPEC quick reference.
- `arkhe/eval/gemini-2.5-flash-baseline.json` in `deznode/papia-studio` — community-reviewed gold translations.

## License

Released under the [MIT License](../../LICENSE). See `manifest.json` for authorship.

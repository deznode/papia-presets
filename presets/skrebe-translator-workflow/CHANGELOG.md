# Changelog — skrebe-translator-workflow

All notable changes to this preset will be documented in this file. Format loosely follows [Keep a Changelog](https://keepachangelog.com/). Bump the version in `manifest.json` according to [semver](https://semver.org/):

- **Patch** (1.0.0 → 1.0.1) — typo fixes, note clarifications
- **Minor** (1.0.0 → 1.1.0) — new entries added, no breaking changes
- **Major** (1.0.0 → 2.0.0) — terms removed or preferred translation changed (breaks downstream approvals)

---

## [0.1.0] — 2026-05-19

### Added

- Initial draft of the catalog's seed preset (20 entries, Santiago dialect).
- 4 `must` entries codifying non-negotiable rules: the four-way "and" conjunction (`ku` / `y` / `i` / never-`e`), `but` → `ma`, `ALUPEC` (verbatim), `Kriolu` (with `Kabuverdianu` as accepted alternative).
- 13 `should` entries covering editor verbs (open, save, read, write, close, translate, help), workflow nouns (document, word, sentence, project, translation), and the second-person pronoun with register distinctions (`bo` / `nhu` / `nha`).
- 3 `avoid` entries mirroring the existing Skrebe linter calque rules: `because` → `porque`/`porkê` (ALUPEC_CALQUE_PORQUE), `not` → `não`/`nao` (ALUPEC_CALQUE_NAO), `more` → `más` (ALUPEC_CALQUE_MAS).

### Known limitations

- Four entries (`translation`, `translate`, `close`, `save`) are bootstrap calques constructed via Portuguese-to-ALUPEC mappings rather than directly attested in a published Kriolu source. They are flagged for community review in the README and will be revisited before `1.0.0`.
- No `nameKriolu` field in the manifest yet — pending a community-reviewed translation of "Skrebe Translator Workflow".

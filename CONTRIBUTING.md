# Contributing a preset

Thank you for wanting to help build the Kriolu glossary commons. This guide walks you through the entire flow, from idea to merged preset.

If anything here is unclear, that's our bug — please open an issue and we'll fix the doc.

---

## Before you start

Decide three things:

1. **Domain.** What field does your preset cover? Health, education, agriculture, religion, music, tech, civic services, etc. Keep it narrow — a tight 80-term preset beats a sprawling 800-term one.
2. **Audience.** Who will use this? Patient-facing material reads differently from clinical notes; school texts differ from academic papers. Note this in your preset's README.
3. **Dialect coverage.** Santiago (Badiu)? São Vicente (Sanpajudu)? Both? Mark this in the manifest. Mixing dialects without flagging is the most common review issue.

If your domain doesn't exist yet, that's fine — go ahead and create it.

---

## One-time setup

You need [Node.js 20+](https://nodejs.org/) and [pnpm](https://pnpm.io/installation).

```sh
git clone https://github.com/YOUR-USERNAME/papia-presets.git
cd papia-presets
pnpm install
```

That's it. The repo has no runtime dependencies beyond a JSON-schema validator.

---

## Authoring flow

### Option A — Build it in Skrebe and export

This is by far the easiest path. It's also the most reliable, because Skrebe's ALUPEC linter catches orthography errors as you type.

1. Open Skrebe, create or open any document.
2. Open the Glossary panel. Add your terms one by one, or import a CSV.
3. Export as `.glossary.json` (Glossary panel → Export → JSON).
4. Drop the exported file into `presets/<your-preset-id>/glossary.json`.

### Option B — Author the JSON directly

1. Scaffold a new preset:

   ```sh
   pnpm new-preset health-basic
   ```

   This creates `presets/health-basic/` with stub `manifest.json`, `glossary.json`, `README.md`, and `CHANGELOG.md`.

2. Edit `manifest.json` — fill in name, description, authors, sources. See [`schema/preset-manifest.schema.json`](./schema/preset-manifest.schema.json) for every field.

3. Edit `glossary.json` — add your entries. The shape is documented in [`schema/glossary-entry.schema.json`](./schema/glossary-entry.schema.json). Minimal entry:

   ```json
   {
     "source": "informed consent",
     "targets": [{ "term": "konsentimentu informadu", "preferred": true }],
     "policy": "must"
   }
   ```

4. Update `manifest.json`'s `entryCount` to match the number of entries.

---

## Validate before submitting

Run the validator locally — it catches the same things CI will, faster.

```sh
pnpm validate health-basic
```

A green run means:

- Both files parse and match their schemas
- `entryCount` matches actual entries
- No duplicate `source` terms within the preset
- All required manifest fields are present

A red run prints exactly what's wrong and where. Fix and re-run until green.

---

## Submitting

1. Commit your changes on a branch:

   ```sh
   git checkout -b add-health-basic
   git add presets/health-basic
   git commit -m "Add health-basic preset (87 entries)"
   git push origin add-health-basic
   ```

2. Open a pull request. Use the **"New preset"** template — it asks for the domain, sources, and dialect coverage. Filling it out completely speeds up review.

3. CI runs automatically (~1 minute). Watch the checks panel:
   - **Schema validation** — file shapes are correct
   - **Entry integrity** — counts match, no duplicates
   - **ALUPEC lint** — every target term passes orthography checks (errors block merge; warnings are commented but allowed)
   - **Version bump** — only required when updating an existing preset

4. A maintainer reviews. We may suggest changes — terminology, scope, dialect notes. This isn't a rejection; it's how we keep the catalog useful.

5. On merge, `index.json` regenerates and your preset is live in Skrebe's marketplace within the next cache cycle (≤1 hour).

---

## Updating an existing preset

Maintainers of a preset are listed in its `manifest.json` under `maintainers`. They can merge updates without a separate review. Other contributors are very welcome to send updates — they just need maintainer sign-off.

Every update **must bump the version** in `manifest.json` following [semver](https://semver.org/):

- **Patch** (1.0.0 → 1.0.1) — typo fixes, note clarifications
- **Minor** (1.0.0 → 1.1.0) — new entries added, no breaking changes
- **Major** (1.0.0 → 2.0.0) — terms removed or their preferred translation changed (this affects downstream users' approved translations)

Document every change in the preset's `CHANGELOG.md`.

---

## Review criteria

A maintainer will check:

1. **Scope is clear.** The preset's domain is well-defined and the entries fit it.
2. **Sources are credible.** Government glossaries, peer-reviewed material, established community use, or named expert authors. "Common sense" alone isn't a source.
3. **ALUPEC compliance.** Target terms pass the linter (CI enforces this).
4. **Dialect honesty.** If entries are predominantly one dialect, the manifest says so.
5. **No duplicates with existing presets.** If your "consent" entry contradicts one in another merged preset, we'll discuss which is canonical or whether both should coexist with clearer scoping.

We don't gatekeep on style or completeness. A focused 30-entry preset by a domain expert is more valuable than a 300-entry guess.

---

## Code of conduct

Be respectful in PR discussions. Terminology debates can get heated — especially around dialect choices, religious language, and politically sensitive vocabulary. We assume good faith and ask everyone to do the same. Personal attacks or dismissive language toward dialects, regions, or contributors will get the PR closed.

---

## Questions

Open an issue, or ask in the discussion thread of an existing PR. Maintainers usually respond within a few days.

> **English** | [Kriolu](./README.kea.md)

# papia-presets

Community-curated glossary presets for [Skrebe](https://papia.studio), the Markdown translation editor for Cabo Verde Kriolu (ALUPEC).

Each preset is a small, focused vocabulary for a specific domain — health, education, civic services, technology, religion, and so on. Skrebe users browse this catalog inside the app, install the ones they need, and get domain-appropriate term suggestions and consistency checks while they translate.

## Browse the catalog

Open the **Marketplace** in Skrebe. The list you see comes from this repo's [`index.json`](./index.json), regenerated automatically every time a preset is added or updated.

## Contribute a preset

You don't need to be a developer. If you can edit a spreadsheet and run two commands in a terminal, you can contribute. Full step-by-step guide: **[CONTRIBUTING.md](./CONTRIBUTING.md)**.

The short version:

1. Fork this repo.
2. Run `pnpm install` once.
3. Run `pnpm new-preset <id>` to scaffold a new preset folder.
4. Fill in `glossary.json` (or export one from Skrebe and drop it in).
5. Run `pnpm validate <id>` until it passes.
6. Open a pull request.

A maintainer reviews. CI checks orthography and structure. Once merged, your preset appears in Skrebe within minutes.

## Repository layout

```
presets/
  <preset-id>/
    manifest.json      ← metadata (name, domain, version, authors, sources)
    glossary.json      ← the actual term entries
    README.md          ← context, audience, dialect notes
    CHANGELOG.md       ← what changed in each version
schema/                ← JSON Schemas that define the file shapes
scripts/               ← validate, build-index, new-preset
index.json             ← auto-generated; do not edit by hand
```

## Local smoke testing against Skrebe

`scripts/build-index.ts` hardcodes the per-preset `manifestUrl` and `glossaryUrl`
in `index.json` to `https://raw.githubusercontent.com/deznode/papia-presets/main/...`.
That means pointing Skrebe at a locally-served `index.json` still sends it to
GitHub for the manifest and glossary — which defeats the point of testing
unmerged changes.

Current workaround:

1. `npx http-server . -p 8765 --cors -c-1 -s`
2. Copy `index.json` to `tmp-local-index.json` and hand-rewrite the GitHub raw
   URLs to `http://localhost:8765/...`. (`tmp-local-index.json` is gitignored.)
3. In Skrebe → Settings → Advanced, set the custom catalog URL to
   `http://localhost:8765/tmp-local-index.json`.

### TODO: `--base-url` flag for `build-index`

Replace the manual `tmp-local-index.json` step with
`pnpm build-index --base-url http://localhost:8765`, which writes the same
`index.json` but with every URL rooted at the given base. Five-line change in
`scripts/build-index.ts:22`. Worth doing the next time someone smoke-tests
the install flow or a second preset author needs a local dev loop.

## License

All presets and documentation in this repository are licensed under the [MIT License](./LICENSE). You're free to use, modify, and redistribute the content — including in commercial and closed-source products — with attribution as the MIT license requires.

By submitting a pull request you agree to release your contribution under the MIT License.

## Governance

This catalog is part of the [Papia Studio](https://github.com/deznode/papia-studio) project. Maintainers triage PRs, mediate disputes about terminology, and decide which presets get the "Recommended" flag in Skrebe's marketplace.

Disagree with a curation choice? You can **fork the catalog** and host an alternative. Skrebe lets users add custom catalog URLs in settings — pluralism is built into the system.

## Questions

- **Found a wrong term?** Open an issue on the preset, or send a PR with the fix.
- **Want a new domain that doesn't exist yet?** Open a [preset request](./.github/ISSUE_TEMPLATE/preset-request.md) — someone may volunteer to author it.
- **Building tooling on top of this catalog?** The schemas in [`schema/`](./schema) are stable contracts. Pin `schemaVersion: 1` and you're safe.

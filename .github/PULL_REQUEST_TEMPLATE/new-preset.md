---
name: New preset
about: Submit a new glossary preset to the catalog
---

## New preset

**Preset ID:** `<your-preset-id>`

**Domain:** <health / education / civic-government / religion / tech / agriculture / legal / business / music / sports / media / tourism / general / other>

**Entry count:** <number>

### What this preset covers

<One paragraph describing the scope, the intended audience, and what makes this preset coherent as a unit. If you're not sure what to write, the description from your manifest.json is a good starting point.>

### Sources

<List the references you used. Government glossaries, peer-reviewed material, published dictionaries, expert consultations, community reviews. Be specific — "common knowledge" alone isn't a source.>

- Source 1
- Source 2
- Source 3

### Dialect coverage

<Which dialect(s) do these entries reflect? If mixed, explain how you decided which dialect's form to use as the preferred target.>

### Author background

<Optional but helpful: a sentence or two about your relevant background. Are you a domain expert? A native speaker? A translator with experience in this area? This helps maintainers calibrate review.>

### Checklist

- [ ] I ran `pnpm validate <my-preset-id>` locally and it passed
- [ ] `manifest.entryCount` matches the actual number of entries in `glossary.json`
- [ ] `manifest.id` matches the directory name
- [ ] Every entry has at least one target
- [ ] `manifest.sources` lists at least one credible reference
- [ ] I have read and agree to [CONTRIBUTING.md](../../CONTRIBUTING.md)
- [ ] I release this contribution under [CC BY-SA 4.0](../../LICENSE)

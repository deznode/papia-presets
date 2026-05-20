#!/usr/bin/env tsx
/**
 * new-preset.ts
 *
 * Scaffolds a new preset directory with stub files. Run:
 *   pnpm new-preset health-basic
 *
 * Creates:
 *   presets/health-basic/manifest.json
 *   presets/health-basic/glossary.json
 *   presets/health-basic/README.md
 *   presets/health-basic/CHANGELOG.md
 */

import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PRESETS_DIR = join(ROOT, 'presets');

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function titleCase(id: string): string {
  return id
    .split('-')
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(' ');
}

function main(): void {
  const id = process.argv[2];

  if (!id) {
    console.error('Usage: pnpm new-preset <preset-id>');
    console.error('Example: pnpm new-preset health-basic');
    process.exit(2);
  }

  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(id)) {
    console.error(
      `Invalid id "${id}". Use lowercase letters, digits, and single hyphens (e.g. "health-basic").`,
    );
    process.exit(2);
  }

  const dir = join(PRESETS_DIR, id);
  if (existsSync(dir)) {
    console.error(`Preset directory already exists: presets/${id}`);
    process.exit(1);
  }

  mkdirSync(dir, { recursive: true });

  const date = today();

  const manifest = {
    schemaVersion: 1,
    id,
    name: titleCase(id),
    description:
      'TODO: Write a one-paragraph description of what this preset covers and who it is for.',
    domain: 'general',
    version: '0.1.0',
    license: 'MIT',
    entryCount: 1,
    dialects: ['santiago'],
    sourceLanguage: 'en',
    targetLanguage: 'kea',
    authors: [{ name: 'TODO: Your Name', github: '@your-handle' }],
    maintainers: ['@your-handle'],
    sources: [
      'TODO: List the references, expert consultations, or community reviews that informed this preset.',
    ],
    createdAt: date,
    updatedAt: date,
    tags: [],
  };

  const glossary = {
    schemaVersion: 1,
    entries: [
      {
        source: 'TODO source term',
        targets: [{ term: 'TODO target term', preferred: true }],
        policy: 'should',
        notes:
          'Replace this stub with real entries. Either edit this file directly or build the glossary in Skrebe and paste the exported .glossary.json contents here.',
      },
    ],
  };

  const readme = `# ${titleCase(id)}

TODO: Describe what this preset covers, who it is for, and any important context.

## Audience

TODO: Who should install this preset? Translators of patient-facing health materials? Civic forms? Academic texts?

## Dialect notes

TODO: Which dialect(s) do these entries reflect? Are there alternate forms in other dialects that users should be aware of?

## Sources

TODO: List the references used to build this glossary. Government publications, peer-reviewed material, named experts, community review. Include URLs where possible.

## License

Released under the [MIT License](../../LICENSE). See \`manifest.json\` for authors and attribution.
`;

  const changelog = `# Changelog — ${id}

All notable changes to this preset will be documented in this file. Format loosely follows [Keep a Changelog](https://keepachangelog.com/). Bump the version in \`manifest.json\` according to [semver](https://semver.org/):

- **Patch** (1.0.0 → 1.0.1) — typo fixes, note clarifications
- **Minor** (1.0.0 → 1.1.0) — new entries added, no breaking changes
- **Major** (1.0.0 → 2.0.0) — terms removed or preferred translation changed (breaks downstream approvals)

---

## [0.1.0] — ${date}

### Added

- Initial preset draft.
`;

  writeFileSync(
    join(dir, 'manifest.json'),
    JSON.stringify(manifest, null, 2) + '\n',
  );
  writeFileSync(
    join(dir, 'glossary.json'),
    JSON.stringify(glossary, null, 2) + '\n',
  );
  writeFileSync(join(dir, 'README.md'), readme);
  writeFileSync(join(dir, 'CHANGELOG.md'), changelog);

  console.log(`Scaffolded presets/${id}/`);
  console.log('');
  console.log('Next steps:');
  console.log(`  1. Edit presets/${id}/manifest.json — fill in TODOs.`);
  console.log(
    `  2. Replace the stub entry in presets/${id}/glossary.json with real content.`,
  );
  console.log(
    `  3. Update manifest.entryCount to match the number of entries.`,
  );
  console.log(`  4. Run: pnpm validate ${id}`);
  console.log(`  5. Open a pull request.`);
}

main();

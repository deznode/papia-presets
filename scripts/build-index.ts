#!/usr/bin/env tsx
/**
 * build-index.ts
 *
 * Regenerates the top-level index.json catalog from all valid presets in presets/.
 * Directories starting with `_` are skipped (scaffold examples, drafts).
 *
 * Run automatically by CI on push to main. Can be run locally to preview changes.
 */

import { readFileSync, readdirSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PRESETS_DIR = join(ROOT, 'presets');
const INDEX_PATH = join(ROOT, 'index.json');
const PKG_PATH = join(ROOT, 'package.json');

const REPO_RAW_BASE =
  'https://raw.githubusercontent.com/deznode/papia-presets/main';

interface Manifest {
  schemaVersion: number;
  id: string;
  name: string;
  nameKriolu?: string;
  description: string;
  domain: string;
  version: string;
  entryCount: number;
  dialects?: string[];
  sourceLanguage: string;
  targetLanguage: string;
  authors: Array<{ name: string; github?: string }>;
  alupecValidated?: boolean;
  createdAt: string;
  updatedAt: string;
  minSkrebeVersion?: string;
  tags?: string[];
}

interface IndexEntry {
  id: string;
  name: string;
  nameKriolu?: string;
  description: string;
  domain: string;
  latestVersion: string;
  entryCount: number;
  dialects: string[];
  sourceLanguage: string;
  targetLanguage: string;
  authors: Array<{ name: string; github?: string }>;
  alupecValidated: boolean;
  featured: boolean;
  minSkrebeVersion?: string;
  tags: string[];
  manifestUrl: string;
  glossaryUrl: string;
  updatedAt: string;
}

interface Index {
  schemaVersion: number;
  generatedAt: string;
  catalogName: string;
  catalogVersion: string;
  domains: string[];
  presets: IndexEntry[];
}

// "Featured" presets surface in the marketplace's Recommended rail.
// Curated manually by maintainers — keep this list short.
const FEATURED_IDS = new Set<string>([
  // Add preset ids here once they're production-ready.
]);

function listPresetDirs(): string[] {
  if (!existsSync(PRESETS_DIR)) return [];
  return readdirSync(PRESETS_DIR)
    .filter((name) => !name.startsWith('_') && !name.startsWith('.'))
    .filter((name) => statSync(join(PRESETS_DIR, name)).isDirectory());
}

function loadManifest(presetId: string): Manifest | null {
  const path = join(PRESETS_DIR, presetId, 'manifest.json');
  if (!existsSync(path)) return null;
  try {
    return JSON.parse(readFileSync(path, 'utf8')) as Manifest;
  } catch (e) {
    console.error(`Failed to parse ${path}: ${(e as Error).message}`);
    return null;
  }
}

function toIndexEntry(m: Manifest): IndexEntry {
  return {
    id: m.id,
    name: m.name,
    ...(m.nameKriolu && { nameKriolu: m.nameKriolu }),
    description: m.description,
    domain: m.domain,
    latestVersion: m.version,
    entryCount: m.entryCount,
    dialects: m.dialects ?? [],
    sourceLanguage: m.sourceLanguage,
    targetLanguage: m.targetLanguage,
    authors: m.authors.map((a) => ({
      name: a.name,
      ...(a.github && { github: a.github }),
    })),
    alupecValidated: m.alupecValidated ?? false,
    featured: FEATURED_IDS.has(m.id),
    ...(m.minSkrebeVersion && { minSkrebeVersion: m.minSkrebeVersion }),
    tags: m.tags ?? [],
    manifestUrl: `${REPO_RAW_BASE}/presets/${m.id}/manifest.json`,
    glossaryUrl: `${REPO_RAW_BASE}/presets/${m.id}/glossary.json`,
    updatedAt: m.updatedAt,
  };
}

function main(): void {
  const pkg = JSON.parse(readFileSync(PKG_PATH, 'utf8')) as {
    version: string;
  };

  const presetIds = listPresetDirs().sort();
  const entries: IndexEntry[] = [];
  const skipped: string[] = [];

  for (const id of presetIds) {
    const manifest = loadManifest(id);
    if (!manifest) {
      skipped.push(id);
      continue;
    }
    if (manifest.id !== id) {
      console.error(
        `Skipping ${id}: manifest.id "${manifest.id}" doesn't match directory name.`,
      );
      skipped.push(id);
      continue;
    }
    entries.push(toIndexEntry(manifest));
  }

  // Sort: featured first, then alphabetical by name
  entries.sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return a.name.localeCompare(b.name);
  });

  const domains = Array.from(new Set(entries.map((e) => e.domain))).sort();

  const index: Index = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    catalogName: 'papia-presets',
    catalogVersion: pkg.version,
    domains,
    presets: entries,
  };

  writeFileSync(INDEX_PATH, JSON.stringify(index, null, 2) + '\n');
  console.log(
    `Wrote ${INDEX_PATH} — ${entries.length} preset(s), ${domains.length} domain(s)${
      skipped.length > 0 ? `, ${skipped.length} skipped` : ''
    }.`,
  );
}

main();

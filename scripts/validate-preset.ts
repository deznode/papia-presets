#!/usr/bin/env tsx
/**
 * validate-preset.ts
 *
 * Validates one or all presets in the catalog. Mirrors what CI runs.
 *
 * Usage:
 *   pnpm validate <preset-id>     # validate one preset
 *   pnpm validate:all             # validate all presets
 *
 * Exits with code 1 on any failure.
 */

import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';
import type { ErrorObject } from 'ajv';
import addFormats from 'ajv-formats';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PRESETS_DIR = join(ROOT, 'presets');
const SCHEMA_DIR = join(ROOT, 'schema');

// --- ANSI colors --------------------------------------------------------
const c = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  dim: '\x1b[2m',
  bold: '\x1b[1m',
};

// --- Schema setup --------------------------------------------------------
const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);

const manifestSchema = JSON.parse(
  readFileSync(join(SCHEMA_DIR, 'preset-manifest.schema.json'), 'utf8'),
);
const glossarySchema = JSON.parse(
  readFileSync(join(SCHEMA_DIR, 'glossary-entry.schema.json'), 'utf8'),
);

const validateManifest = ajv.compile(manifestSchema);
const validateGlossary = ajv.compile(glossarySchema);

// --- Types ---------------------------------------------------------------
interface Manifest {
  id: string;
  entryCount: number;
  version: string;
  [key: string]: unknown;
}

interface GlossaryFile {
  schemaVersion: number;
  entries: Array<{ source: string; [key: string]: unknown }>;
}

interface ValidationResult {
  presetId: string;
  ok: boolean;
  errors: string[];
  warnings: string[];
}

// --- Validation core -----------------------------------------------------
function validatePreset(presetId: string): ValidationResult {
  const result: ValidationResult = {
    presetId,
    ok: true,
    errors: [],
    warnings: [],
  };

  const dir = join(PRESETS_DIR, presetId);
  if (!existsSync(dir)) {
    result.ok = false;
    result.errors.push(`Preset directory not found: presets/${presetId}`);
    return result;
  }

  // --- manifest.json
  const manifestPath = join(dir, 'manifest.json');
  if (!existsSync(manifestPath)) {
    result.ok = false;
    result.errors.push(`Missing manifest.json`);
    return result;
  }

  let manifest: Manifest;
  try {
    manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as Manifest;
  } catch (e) {
    result.ok = false;
    result.errors.push(`manifest.json is not valid JSON: ${(e as Error).message}`);
    return result;
  }

  if (!validateManifest(manifest)) {
    result.ok = false;
    for (const err of validateManifest.errors ?? []) {
      result.errors.push(`manifest.json ${formatAjvError(err)}`);
    }
  }

  // --- glossary.json
  const glossaryPath = join(dir, 'glossary.json');
  if (!existsSync(glossaryPath)) {
    result.ok = false;
    result.errors.push(`Missing glossary.json`);
    return result;
  }

  let glossary: GlossaryFile;
  try {
    glossary = JSON.parse(readFileSync(glossaryPath, 'utf8')) as GlossaryFile;
  } catch (e) {
    result.ok = false;
    result.errors.push(`glossary.json is not valid JSON: ${(e as Error).message}`);
    return result;
  }

  if (!validateGlossary(glossary)) {
    result.ok = false;
    for (const err of validateGlossary.errors ?? []) {
      result.errors.push(`glossary.json ${formatAjvError(err)}`);
    }
  }

  // --- Cross-file integrity checks (skip if files didn't even parse)
  if (result.ok && manifest && glossary?.entries) {
    // 1. Entry count must match
    if (manifest.entryCount !== glossary.entries.length) {
      result.ok = false;
      result.errors.push(
        `manifest.entryCount is ${manifest.entryCount} but glossary.json has ${glossary.entries.length} entries. Update manifest.entryCount.`,
      );
    }

    // 2. id must match directory name
    if (manifest.id !== presetId) {
      result.ok = false;
      result.errors.push(
        `manifest.id is "${manifest.id}" but directory is "${presetId}". They must match.`,
      );
    }

    // 3. No duplicate source terms (case-insensitive, trimmed)
    const seen = new Map<string, number>();
    for (const [i, entry] of glossary.entries.entries()) {
      const key = entry.source.trim().toLowerCase();
      const prev = seen.get(key);
      if (prev !== undefined) {
        result.ok = false;
        result.errors.push(
          `Duplicate source term "${entry.source}" at entries[${i}] (first seen at entries[${prev}])`,
        );
      } else {
        seen.set(key, i);
      }
    }

    // 4. Warn about empty notes when policy is 'must' or 'avoid'
    for (const [i, entry] of glossary.entries.entries()) {
      const policy = (entry as { policy?: string }).policy;
      const notes = (entry as { notes?: string }).notes;
      if ((policy === 'must' || policy === 'avoid') && !notes) {
        result.warnings.push(
          `entries[${i}] has policy "${policy}" but no notes. Consider explaining why for downstream users.`,
        );
      }
    }
  }

  // --- README.md and CHANGELOG.md presence (soft check)
  if (!existsSync(join(dir, 'README.md'))) {
    result.warnings.push(`Missing README.md (recommended).`);
  }
  if (!existsSync(join(dir, 'CHANGELOG.md'))) {
    result.warnings.push(`Missing CHANGELOG.md (recommended).`);
  }

  return result;
}

function formatAjvError(err: ErrorObject): string {
  const loc = err.instancePath || '(root)';
  return `${loc} ${err.message ?? 'invalid'}`;
}

// --- Reporting -----------------------------------------------------------
function reportResult(r: ValidationResult): void {
  const status = r.ok
    ? `${c.green}✓ PASS${c.reset}`
    : `${c.red}✗ FAIL${c.reset}`;
  console.log(`\n${status}  ${c.bold}${r.presetId}${c.reset}`);

  for (const err of r.errors) {
    console.log(`  ${c.red}error${c.reset}   ${err}`);
  }
  for (const warn of r.warnings) {
    console.log(`  ${c.yellow}warn${c.reset}    ${warn}`);
  }
}

function listPresets(): string[] {
  return readdirSync(PRESETS_DIR)
    .filter((name) => !name.startsWith('.') && !name.startsWith('_'))
    .filter((name) => {
      const path = join(PRESETS_DIR, name);
      return statSync(path).isDirectory();
    });
}

// --- Entry point ---------------------------------------------------------
function main(): void {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error(
      `Usage:\n  pnpm validate <preset-id>\n  pnpm validate:all`,
    );
    process.exit(2);
  }

  const all = args.includes('--all');
  const targets = all ? listPresets() : args.filter((a) => !a.startsWith('-'));

  if (targets.length === 0) {
    if (all) {
      console.log(`${c.dim}No presets to validate (catalog is empty).${c.reset}`);
      process.exit(0);
    }
    console.error('No presets to validate. Pass a preset id or --all.');
    process.exit(2);
  }

  console.log(
    `${c.cyan}Validating ${targets.length} preset(s)...${c.reset}`,
  );

  const results = targets.map(validatePreset);
  results.forEach(reportResult);

  const failed = results.filter((r) => !r.ok).length;
  const warned = results.filter((r) => r.warnings.length > 0).length;
  const passed = results.length - failed;

  console.log(
    `\n${c.bold}Summary:${c.reset} ${c.green}${passed} passed${c.reset}, ${
      failed > 0 ? c.red : c.dim
    }${failed} failed${c.reset}, ${c.yellow}${warned} with warnings${c.reset}`,
  );

  process.exit(failed > 0 ? 1 : 0);
}

main();

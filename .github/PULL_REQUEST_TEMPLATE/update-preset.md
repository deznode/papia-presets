---
name: Update preset
about: Update an existing preset (new entries, fixes, clarifications)
---

## Update preset

**Preset ID:** `<preset-id>`

**Version bump:** `<old-version>` → `<new-version>`

**Bump type:**
- [ ] Patch (typo fixes, note clarifications)
- [ ] Minor (new entries added, no breaking changes)
- [ ] Major (terms removed or preferred translation changed — breaks downstream approvals)

### What changed

<Summary of changes. The CHANGELOG.md should have the detail; this is the elevator pitch.>

### Why

<Brief rationale. New regulatory guidance? Community feedback caught an error? Domain expanded?>

### Sources for new/changed entries

<For any added entries or changed preferred translations, list the source. Existing entries you didn't touch don't need new sources.>

### Checklist

- [ ] Bumped `manifest.version` per semver
- [ ] Updated `manifest.updatedAt` to today's date
- [ ] Updated `manifest.entryCount` if entries were added/removed
- [ ] Added an entry to `CHANGELOG.md` for this version
- [ ] Ran `pnpm validate <preset-id>` locally and it passed
- [ ] I am a listed maintainer of this preset, OR I have pinged a maintainer for sign-off

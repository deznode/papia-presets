---
name: Atualiza preset (Kriolu)
about: Atualiza un preset ki ja ta eziste (entradas novu, korreson, klarifikason)
---

> **DRAFT — needs native-speaker review.**
>
> [English](./update-preset.md) | **Kriolu**

## Atualiza preset

**ID di preset:** `<preset-id>`

**Bump di verson:** `<verson-velhu>` → `<verson-novu>`

**Tipu di bump:**
- [ ] Patch (korreson di tipo, klarifikason di notas)
- [ ] Minor (entradas novu adisionadu, sen mudansa ki ta keba)
- [ ] Major (termus tiradu ô tradusãu preferida mudadu — ta keba aprovasãu downstream)

### Ke ki mudou

<Sumáriu di mudansas. CHANGELOG.md debe ten detadji; es é elevator pitch.>

### Pamodi

<Razon kurtu. Diretiva regulatóriu novu? Feedback di komunidadi panha un eru? Domain ekspansadu?>

### Fontis pa entradas novu/mudadu

<Pa kualker entrada adisionadu ô tradusãu preferida mudadu, lista fonti. Entradas ki ja eziste i ki bu ka toka ka meste fonti novu.>

### Checklist

- [ ] N bumpa `manifest.version` siginu semver
- [ ] N atualiza `manifest.updatedAt` pa data di oji
- [ ] N atualiza `manifest.entryCount` si entradas foi adisionadu/tiradu
- [ ] N adisiona un entrada na `CHANGELOG.md` pa es verson
- [ ] N kore `pnpm validate <preset-id>` lokalmenti i el ta pasa
- [ ] N é un maintainer listadu di es preset, Ô N ja ping un maintainer pa sign-off

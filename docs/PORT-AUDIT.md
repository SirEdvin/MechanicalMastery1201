# Mechanical Mastery r1.5.1 → Minecraft Forge 1.20.1 port audit

## Verdict

This pack cannot be updated safely by replacing its 1.18.2 jars with 1.20.1 jars. It is a progression pack whose gameplay is implemented by KubeJS, custom Mekanism chemicals, modified machine recipes, NBT-sensitive outputs, and FTB Quests. A real port is possible, but it requires a deliberate KubeJS 5 → 6 rewrite and then in-game regression testing of every progression tier.

The original archive was not modified. It was extracted under `source/` for analysis.

## Inventory

- Source: Mechanical Mastery `r1.5.1`
- Minecraft: `1.18.2`
- Loader: Forge `40.2.10`
- Mods: **153 jars** and **153 CurseForge manifest entries**
- KubeJS: **9 executable JavaScript files**, 204 files including assets and generated ProbeJS caches
- Config files: 283
- FTB Quests: 6 chapters, chapter groups, reward tables, and localized text
- Target runtime: Minecraft `1.20.1`, Forge 47.x, Java 17

## Mod availability

Automated live checks found:

- **143/153 original CurseForge projects** publish a Forge 1.20.1 file.
- Exact-hash Modrinth matching resolved 93/153 old jars; 87 of those projects publish a Forge 1.20.1 file.
- Ten original CurseForge projects do not publish a Forge 1.20.1 file under the same project.

### Original projects without same-project Forge 1.20.1 files

| Mod | Impact | Port decision |
|---|---|---|
| KubeJS Mekanism | **Critical** | Replace with **KubeJS Mekanism UNOFFICIAL** for 1.20.1 or MekaJS; validate all custom chemical registries and recipe builders. |
| KubeJS Immersive Engineering | Medium | Remove integration addon and rewrite any IE machine recipes as raw JSON/custom recipes. Current scripts mostly use ordinary IE item IDs, so this is manageable. |
| Create: Supercharged / old Create Chromatic Return project entry | **Progression-critical** | A separate/current Create Chromatic Return has a verified Forge 1.20.1 jar (`create-chromaticreturn1.20.1_v1.4.2.jar`, CurseForge file 4781897). Its item and recipe IDs must be compared because refined radiance is part of the final-star chain. |
| Time in a Bottle Standalone | Quest-visible | Replace with the 1.20.1 fork **Time in a Bottle**. Update the quest item ID; old data inconsistently uses `tiab:time_in_a_bottle` and `tiab:timeinabottle`. |
| Lazier AE2 | Medium | Remove or replace. AE2 itself has 1.20.1 crafting co-processors, but Lazier AE2's machines are not direct equivalents. No quest reference was found, though stale JEI sorting entries exist. |
| Super Circuit Maker | Low | Remove or replace with Tiny Redstone/Short Circuit. Tiny Redstone is already in this pack. |
| Technicalities: Lib (TKLib) | Low | Remove with Super Circuit Maker; it is that mod's support library. |
| Engineer's Decor | Low/cosmetic | Remove or substitute. Generated ProbeJS caches and config references must be discarded. |
| AutoRegLib | Dependency migration | Do not carry forward blindly. Modern Quark has a changed dependency stack; use the dependencies declared by the selected Quark 1.20.1 file. |
| Shutup Experimental Settings | Obsolete | Remove. Do not replace unless 1.20.1 actually emits the warning the pack was suppressing. |

## Hardest blocker: KubeJS 5 → KubeJS 6

All nine scripts use the old global `onEvent(...)` API. KubeJS 6 for 1.20.1 uses typed event groups. Representative required migrations:

- `onEvent('item.registry', ...)` → `StartupEvents.registry('item', ...)`
- `onEvent('block.registry', ...)` → `StartupEvents.registry('block', ...)`
- `onEvent('recipes', ...)` → `ServerEvents.recipes(...)`
- `onEvent('item.tags', ...)` / `onEvent('tags.items', ...)` → `ServerEvents.tags('item', ...)`
- `onEvent('item.modification', ...)` → `ItemEvents.modification(...)`
- `onEvent('item.right_click', ...)` → `ItemEvents.rightClicked(...)`
- old JEI events → the appropriate `JEIEvents` handlers
- old entity loot-table hooks require LootJS or the KubeJS 6 loot event equivalent and must be rewritten

Primary files:

- `minecraft/kubejs/startup_scripts/script.js`
- `minecraft/kubejs/server_scripts/recipes.js`
- `minecraft/kubejs/server_scripts/ore_processing.js`
- `minecraft/kubejs/server_scripts/industrial_foregoing.js`
- `minecraft/kubejs/server_scripts/entity.spawned.js`
- `minecraft/kubejs/server_scripts/entity.loot_tables.js`
- `minecraft/kubejs/server_scripts/thermal/*.js`
- `minecraft/kubejs/client_scripts/client_script.js`

The old `probe/` and `exported/` trees are generated against the 1.18.2 class/registry universe and must not be shipped as authoritative 1.20.1 data. Regenerate them after the new pack boots.

## Progression-critical script risks

### Custom Mekanism registry content

`startup_scripts/script.js:188-202` dynamically registers custom slurries and `mekanism:darkness_essence`. These are not cosmetic: ore processing and late-game recipes consume them. The selected unofficial KubeJS-Mekanism/MekaJS implementation must support equivalent registries. If it does not, these chemicals need a different progression design.

### Ore processing schemas and IDs

`server_scripts/ore_processing.js` defines dissolution, washing, crystallizing, injecting, purifying, enriching, crushing, and pulverizing for eleven metals. Risks include:

- Mekanism recipe JSON field/schema changes between 1.18 and 1.20.
- Create crushed item IDs changed from `create:crushed_<metal>_ore` to the newer `create:crushed_raw_<metal>` convention; the scripts currently disagree with each other about this.
- Recipe IDs used for removal changed across Mekanism/Create releases.
- Thermal and Immersive Engineering material ownership/item IDs may differ.

This chain must be tested metal-by-metal, not merely syntax-checked.

### Recipe integrations

`server_scripts/recipes.js` contains roughly 200 recipe mutations/additions across Thermal, Create, Mekanism, ProjectE, Project Expansion, Powah, AE2, Industrial Foregoing, Refined Storage, Immersive Engineering, and Create Crafts & Additions. Every recipe removal/replacement keyed by an old recipe ID can silently fail after updating.

The most fragile sections are:

- Create Chromatic Return: lines 301-303, 602, 720, 884-889
- Mekanism NBT/chemical recipes: lines 465-498 and 661, 816-860
- Thermal custom machine recipes and catalysts: lines 253-269, 584-660, 863-866
- Create sequenced assemblies: lines 669-727
- Project Expansion endgame recipes: lines 427-510 and 715-743
- NBT-bearing Mekanism/Thermal/Industrial Foregoing outputs: lines 465-475, 588-590; `industrial_foregoing.js:73-79`

Minecraft 1.20.1 still uses NBT, but individual mods changed their internal component/tag schemas. These outputs must be generated and inspected in-game.

### Entity behavior and loot

- `entity.spawned.js` uses old right-click and entity creation APIs.
- `entity.loot_tables.js` uses an old loot-table event and changes Blaze/Blizz/Blitz/Basalz drops.
- Thermal mob entity/item IDs must be confirmed in the chosen CoFH versions.

### FTB Quests

The quest graph is tightly coupled to KubeJS items and Mekanism progression. It cannot be declared compatible until item IDs are validated. One confirmed migration is the Time in a Bottle quest at `tier_2.snbt:835`. Quest SNBT itself also needs to be loaded by the 1.20.1 FTB Quests version and checked for automatic migration.

## Config migration risks

Copying all 283 old config files is unsafe. Many mods changed config paths, keys, defaults, and generated schemas. Recommended process:

1. Boot the selected 1.20.1 mod set with no copied generated configs.
2. Let mods generate clean defaults.
3. Diff and deliberately reapply pack-specific gameplay values.
4. Port custom assets, Extended Crafting singularities, Skyblock Builder templates, ProjectE EMC data, and FTB Quests separately.

Particularly sensitive:

- Skyblock Builder island templates/world generation
- Extended Crafting singularities
- ProjectE custom/pregenerated EMC files
- Industrial Foregoing machine balancing
- Mekanism machine/energy/world configs
- Thermal machine/augment recipes
- FTB Quests and localization

## Additional source defects found

- `startup_scripts/script.js:23-24` appears to swap aluminum ore and ingot (`ingot_aluminum` assigned as ore and `raw_aluminum` as ingot), while `recipes.js:27-28` has the correct mapping.
- `recipes.js` and `ore_processing.js` disagree on Create crushed-ore IDs (`crushed_<metal>_ore` versus `crushed_raw_<metal>`).
- Time in a Bottle IDs are inconsistent between the quest and ProjectE data.
- Several obsolete recipe removals target mods not visibly present (for example `betterendforge`), adding noise and hiding real failures.
- Generated ProbeJS caches reference removed mods and the old 1.18.2 registry.

## What is stopping a verified updated ZIP

There is no single unavailable foundational mod that makes the port impossible. The stopping point is **semantic compatibility and verification**:

1. The entire KubeJS layer must be rewritten for KubeJS 6.
2. Custom Mekanism chemicals and approximately eleven-metal processing chains must be reconstructed and validated.
3. Ten unavailable/renamed mods need explicit replacement/removal decisions.
4. Hundreds of item IDs, recipe IDs, tags, and NBT payloads must be validated against the selected 1.20.1 jars.
5. The skyblock world template, quests, EMC values, and five progression tiers need an actual playthrough/regression checklist.

A ZIP produced before those steps might reach the title screen but would very likely contain silent progression dead-ends. That would not be a defensible “updated pack.”

## Generated audit artifacts

- `mod-inventory.csv` — metadata and SHA-1 for all 153 bundled jars
- `curseforge-project-files.csv` — original CurseForge project/file IDs
- `curseforge-compatibility.csv` — live same-project Forge 1.20.1 availability
- `modrinth-compatibility.csv` — exact-hash project matching and Forge 1.20.1 availability

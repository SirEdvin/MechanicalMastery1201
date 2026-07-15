# Porting notes

## Target

- Mechanical Mastery r1.5.1 (Forge 1.18.2) → Minecraft 1.20.1
- Forge 47.4.21
- Java 17
- Packwiz-managed metadata; no third-party mod binaries in Git

## Compatibility decisions

- KubeJS scripts were migrated from the KubeJS 5 `onEvent` API to KubeJS 6 typed events.
- The 1.20.1 `KubeJS Mekanism UNOFFICIAL` addon provides Mekanism recipe schemas.
- `More Mekanism Processing` supplies real 1.20.1 Mekanism registries for aluminum, silver, nickel, and zinc slurry/crystal/shard/clump processing. The original KubeJS chemical-registry bridge did not reliably register these chemicals.
- The former custom `darkness_essence` infusion chain is represented with item-gated Mekanism Combining recipes. This preserves Black Essence progression without introducing an unregistered chemical.
- The modern Create Chromatic Return project/file replaces the original 1.18 project entry. Its obsolete crushed-ore recipes are disabled and recreated against `create:crushed_raw_*` IDs.
- Time in a Bottle uses the maintained Forge 1.20.1 project and `tiab:time_in_a_bottle`.
- LootJS replaces the removed entity-loot event API.
- Client-only mods are marked `side = "client"` in Packwiz metadata and are excluded from dedicated-server installations.
- CC: Tweaked is pinned to a version satisfying the selected Advanced Peripherals requirement.
- Removed projects without useful 1.20.1 equivalents: Lazier AE2, Super Circuit Maker, Technicalities Lib, Engineer's Decor, AutoRegLib, and Shutup Experimental Settings.

## Preserved content

- Nine executable KubeJS scripts and their assets/localization
- FTB Quests chapters, reward tables, chapter groups, commands, and localized quest data
- Extended Crafting singularities
- ProjectE custom EMC data
- Skyblock Builder templates and starter-item data
- PackMenu assets
- Default configs and deliberate gameplay configuration
- Mechanical Essence, effigy, ore-processing, creative-item, and final-star recipe chains

## Validation gate

Validation is intentionally batched after the complete content port. See `AGENTS.md`. The release checklist is:

1. Packwiz refresh and metadata integrity.
2. Clean server-side Packwiz installation.
3. Clean Forge 47.4.21 dedicated-server startup on Java 17.
4. Zero KubeJS script-load errors and zero pack-owned recipe failures.
5. FTB Quests, singularities, EMC data, and skyblock template load.
6. Presence of the four replacement Mekanism slurry chains.
7. Presence of progression-critical Mechanical Mastery recipes.
8. Clean client-side Packwiz installation/export.

# Validation report — 0.1.0-alpha.1

Validated on Minecraft 1.20.1, Forge 47.4.21, and Java 17.

## Passed

- `packwiz refresh`
- Clean server-side Packwiz installation
- Clean client-side Packwiz installation with 154 mod files
- Forge dedicated server startup and world load
- Dedicated server reached `Done (14.667s)` in the final run
- KubeJS loaded 7/7 server scripts with 0 errors and 0 warnings
- Recipe processing completed with 239 additions, 213 removals, 74 modifications, and 0 failed recipes
- Extended Crafting loaded 19 singularities
- FTB Quests loaded 1 chapter group, 8 chapters, 200 quests, and 13 reward tables
- More Mekanism Processing registry contains dirty and clean aluminum, silver, nickel, and zinc slurries
- Static Mekanism 1.20.1 datapack recipes were generated for eleven ore-processing chains
- CurseForge and Modrinth Packwiz exports completed

## Progression adaptations

- Non-native metal chemicals use More Mekanism Processing's registered chemicals.
- Black/Darkness Essence recipes use item-gated Mekanism Combining recipes because the available KubeJS bridge cannot safely register a unique infusion type.
- Create Chromatic Return's obsolete crushed-ore recipes are disabled and replaced with recipes using current Create IDs.
- A malformed Industrial Foregoing recipe advancement and stale optional-addon data from third-party mods are overridden by the pack data layer.

## Alpha 2 addon validation

The `0.1.0-alpha.2` update adds:

- UnlimitedPeripheralWorks `1.7.17`
- Turtlematic `1.4.9`
- Digital Items 3 `0.5.8`
- SirEdvin's Cloud Solutions `0.3.3`
- Kotlin for Forge `4.12.0` (required dependency)

The updated dedicated server reached `Done (15.994s)`. UnlimitedPeripheralWorks loaded its KubeJS and installed-mod integrations, Turtlematic reported `Server started`, Cloud Solutions started its broker/storage cleanup, and the existing KubeJS/quest data remained healthy: 7/7 scripts, 239 added recipes with 0 failures, and 200 quests.

Cloud Solutions 0.3.3 leaves an executor thread alive after Minecraft has saved and stopped the world, so the Java process may require termination after shutdown. This is an upstream lifecycle issue in that alpha mod version; world saving completed before the process was terminated.

## Remaining upstream warnings

The server log still contains non-fatal warnings/errors emitted internally by selected third-party builds, including missing mixin metadata and Advanced Peripherals' optional Powah ComputerCraft integration methods. They do not prevent mod loading, recipe loading, quest loading, world creation, or server startup. No pack-owned KubeJS or recipe failure remained in the final validation run.

## Scope note

This validation establishes clean installation, registry/data loading, recipe construction, quest loading, skyblock world creation, and dedicated-server operation. It is not a literal human playthrough of all five quest tiers; the port remains marked alpha for player regression feedback.

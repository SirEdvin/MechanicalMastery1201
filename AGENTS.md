# AGENTS.md

## Project workflow

- Port the complete Mechanical Mastery pack before running full runtime validation.
- Do **not** launch or reinstall Minecraft after each individual edit; batching the port first is required because repeated Forge startup is too slow.
- After all mods, KubeJS scripts, quests, configs, templates, assets, EMC mappings, and progression references have been migrated, perform one consolidated validation pass.
- The consolidated validation pass must cover a clean Packwiz install, dedicated-server startup, KubeJS errors, recipe failures, quest loading, custom registries, skyblock generation, and progression-critical recipes.
- Fix issues discovered during the consolidated pass in batches, then rerun validation only when the batch is complete.
- Keep the original archive `/home/siredvin/Mechanical Mastery.zip` unchanged.
- Use `.upstream/original-mechanical-mastery-1.18.2/` as the unpacked upstream reference; it is intentionally excluded from Git and Packwiz.
- Use Packwiz metadata rather than committing mod JARs.
- This is a CurseForge-based modpack. Prefer CurseForge metadata whenever a compatible CurseForge release is available; use Modrinth metadata only when the mod or compatible release is unavailable on CurseForge.
- CC: Tweaked is an explicit exception: use Modrinth metadata because its newer compatible Forge 1.20.1 releases are not available on CurseForge.
- Preserve the upstream CC BY-NC 3.0 Unported license and attribution to ammoniumx.

# AGENTS.md

## Project workflow

- Port the complete Mechanical Mastery pack before running full runtime validation.
- Do **not** launch or reinstall Minecraft after each individual edit; batching the port first is required because repeated Forge startup is too slow.
- After all mods, KubeJS scripts, quests, configs, templates, assets, EMC mappings, and progression references have been migrated, perform one consolidated validation pass.
- The consolidated validation pass must cover a clean Packwiz install, dedicated-server startup, KubeJS errors, recipe failures, quest loading, custom registries, skyblock generation, and progression-critical recipes.
- Fix issues discovered during the consolidated pass in batches, then rerun validation only when the batch is complete.
- Keep the original archive `/home/siredvin/Mechanical Mastery.zip` unchanged.
- Use Packwiz metadata rather than committing mod JARs.
- Preserve the upstream CC BY-NC 3.0 Unported license and attribution to ammoniumx.

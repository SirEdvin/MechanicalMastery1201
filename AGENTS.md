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
- Preserve the upstream CC BY-NC 3.0 Unported license and attribution to ammoniumx.

## Java process output and token budget

When work in this repository requires Java, Minecraft, a mod loader, Gradle, or an installer process:

- Treat complete stdout/stderr as a file-backed artifact, not chat context. Redirect it to a timestamped file under a disposable `build/`, `run/`, or `work/logs/` directory and preserve the real exit code.
- Return only a compact summary to the agent: command, exit code, duration, full-log path, readiness/startup time, unique ERROR/FATAL/exception signatures, relevant test or content counts, and clean-shutdown evidence.
- Read a narrow window around a concrete failure from the saved log only when diagnosis requires it. Do not paste an entire `latest.log`, Gradle transcript, download list, or crash report into the conversation.
- Keep stdin attached for long-running servers so they can receive `stop`. Prefer a wrapper that writes every line to disk while emitting only rare readiness/failure markers, and prefer completion/readiness notifications over frequent polling.
- Apply the same rule to Forge/NeoForge/Fabric and Packwiz installers: retain full download and patch progress on disk, but report only success/failure, item counts, and the log path.
- Terminal-side truncation is not filtering: a truncated 50 KiB Java log can still consume roughly 15k model tokens while omitting the line that matters.
- Batch modpack migrations and related fixes before launching Minecraft, then perform consolidated runtime validation instead of restarting after every edit.

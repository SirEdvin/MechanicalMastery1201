# Mechanical Mastery 1.20.1 Port

An **unofficial Forge 1.20.1 source port** of [Mechanical Mastery](https://www.curseforge.com/minecraft/modpacks/mechanical-mastery) by **ammoniumx**, maintained as a reproducible [Packwiz](https://packwiz.infra.link/) project.

> This is an unofficial alpha port. It is not an official release and is not endorsed by the original author. Clean client/server installation and dedicated-server startup are validated, but full player regression through all five quest tiers is still welcome.

## Upstream

- Original pack: Mechanical Mastery r1.5.1
- Original author: ammoniumx
- Original Minecraft/Forge: 1.18.2 / Forge 40.2.10
- Port target: Minecraft 1.20.1 / Forge 47.4.21 / Java 17

## Development

```bash
packwiz refresh
packwiz list
```

## Validation

The validated alpha contains 154 Packwiz mod entries, nine executable KubeJS scripts, 200 quests, 19 singularities, eleven generated Mekanism ore-processing chains, and the original skyblock/EMC/endgame content. The final dedicated-server run loaded all KubeJS scripts and recipes with zero pack-owned errors or failed recipes and reached `Done` on Forge 47.4.21.

See [PORTING.md](PORTING.md) for migration decisions and [docs/VALIDATION.md](docs/VALIDATION.md) for the exact validation scope and remaining upstream warnings.

## Licensing

The original Mechanical Mastery project is licensed under **Creative Commons Attribution-NonCommercial 3.0 Unported (`CC-BY-NC-3.0`)**. This unofficial port preserves that license, credits **ammoniumx**, links the original project, and identifies the changes as a Minecraft 1.20.1 adaptation. See [LICENSE](LICENSE). Mod binaries are not committed; Packwiz metadata downloads them from their approved upstream hosts under their respective licenses.

#!/usr/bin/env python3
"""Generate static Mekanism ore-processing recipes for the 1.20.1 port.

Static datapack JSON bypasses an incompatible KubeJS Mekanism schema that
mis-deserializes the valid `fluidInput` object used by washing recipes.
"""
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "kubejs/data/mechanicalmastery/recipes/ore_processing"

metals = {
    "iron": ("minecraft:raw_iron", "mekanism", "mekanism:dust_iron"),
    "gold": ("minecraft:raw_gold", "mekanism", "mekanism:dust_gold"),
    "osmium": ("mekanism:raw_osmium", "mekanism", "mekanism:dust_osmium"),
    "copper": ("minecraft:raw_copper", "mekanism", "mekanism:dust_copper"),
    "tin": ("mekanism:raw_tin", "mekanism", "mekanism:dust_tin"),
    "lead": ("mekanism:raw_lead", "mekanism", "mekanism:dust_lead"),
    "uranium": ("mekanism:raw_uranium", "mekanism", "mekanism:dust_uranium"),
    "aluminum": ("immersiveengineering:raw_aluminum", "moremekanismprocessing", "kubejs:aluminum_dust"),
    "silver": ("thermal:raw_silver", "moremekanismprocessing", "thermal:silver_dust"),
    "nickel": ("thermal:raw_nickel", "moremekanismprocessing", "thermal:nickel_dust"),
    "zinc": ("create:raw_zinc", "moremekanismprocessing", "kubejs:zinc_dust"),
}


def write(metal: str, name: str, data: dict) -> None:
    path = OUT / metal / f"{name}.json"
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, separators=(",", ":")) + "\n")


for metal, (raw, namespace, dust) in metals.items():
    dirty = f"{namespace}:dirty_{metal}"
    clean = f"{namespace}:clean_{metal}"
    crystal = f"{namespace}:crystal_{metal}"
    shard = f"{namespace}:shard_{metal}"
    clump = f"{namespace}:clump_{metal}"
    dirty_dust = f"{namespace}:dirty_dust_{metal}"

    write(metal, "dissolution", {
        "type": "mekanism:dissolution",
        "itemInput": {"amount": 3, "ingredient": {"item": raw}},
        "gasInput": {"amount": 1, "gas": "mekanism:sulfuric_acid"},
        "output": {"amount": 2000, "slurry": dirty, "chemicalType": "slurry"},
    })
    write(metal, "washing", {
        "type": "mekanism:washing",
        "fluidInput": {"amount": 5, "tag": "minecraft:water"},
        "slurryInput": {"amount": 1, "slurry": dirty},
        "output": {"amount": 1, "slurry": clean},
    })
    write(metal, "crystallizing", {
        "type": "mekanism:crystallizing",
        "chemicalType": "slurry",
        "input": {"amount": 200, "slurry": clean},
        "output": {"item": crystal},
    })
    write(metal, "injecting_crystal", {
        "type": "mekanism:injecting",
        "itemInput": {"ingredient": {"item": crystal}},
        "chemicalInput": {"amount": 1, "gas": "mekanism:hydrogen_chloride"},
        "output": {"item": shard},
    })
    write(metal, "injecting_raw", {
        "type": "mekanism:injecting",
        "itemInput": {"amount": 3, "ingredient": {"item": raw}},
        "chemicalInput": {"amount": 1, "gas": "mekanism:hydrogen_chloride"},
        "output": {"item": shard, "count": 8},
    })
    write(metal, "purifying_shard", {
        "type": "mekanism:purifying",
        "itemInput": {"ingredient": {"item": shard}},
        "chemicalInput": {"amount": 1, "gas": "mekanism:oxygen"},
        "output": {"item": clump},
    })
    write(metal, "purifying_raw", {
        "type": "mekanism:purifying",
        "itemInput": {"ingredient": {"item": raw}},
        "chemicalInput": {"amount": 1, "gas": "mekanism:oxygen"},
        "output": {"item": clump, "count": 2},
    })
    if namespace == "moremekanismprocessing":
        write(metal, "enriching_dirty_dust", {
            "type": "mekanism:enriching",
            "input": {"ingredient": {"item": dirty_dust}},
            "output": {"item": dust},
        })
        write(metal, "enriching_raw", {
            "type": "mekanism:enriching",
            "input": {"amount": 3, "ingredient": {"item": raw}},
            "output": {"item": dust, "count": 4},
        })

print(f"Generated {sum(1 for _ in OUT.rglob('*.json'))} recipes under {OUT}")

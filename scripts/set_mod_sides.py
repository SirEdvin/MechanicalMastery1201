#!/usr/bin/env python3
from pathlib import Path
CLIENT_ONLY = {
    'barista', 'configured', 'controlling', 'enchantment-descriptions',
    'extreme-sound-muffler', 'jei', 'mod-name-tooltip', 'more-overlays-updated',
    'mouse-tweaks', 'packmenu', 'probejs', 'simple-discord-rich-presence',
    'toast-control', 'trashslot',
}
mods = Path(__file__).resolve().parent.parent / 'mods'
for slug in sorted(CLIENT_ONLY):
    path = mods / f'{slug}.pw.toml'
    if not path.exists():
        print(f'MISSING {slug}')
        continue
    text = path.read_text()
    text = text.replace('side = "both"', 'side = "client"', 1)
    path.write_text(text)
    print(f'client: {slug}')

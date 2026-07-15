#!/usr/bin/env python3
from pathlib import Path
root=Path(__file__).resolve().parent.parent/'kubejs'
repls={
"onEvent('recipes',":"ServerEvents.recipes(",
"onEvent('item.registry',":"StartupEvents.registry('item',",
"onEvent('block.registry',":"StartupEvents.registry('block',",
"onEvent('item.modification',":"ItemEvents.modification(",
"onEvent('item.tags',":"ServerEvents.tags('item',",
"onEvent('tags.items',":"ServerEvents.tags('item',",
"onEvent('item.right_click',":"ItemEvents.rightClicked(",
"onEvent('mekanism.slurry.registry',":"StartupEvents.registry('mekanism:slurry',",
"onEvent('mekanism.infuse_type.registry',":"StartupEvents.registry('mekanism:infuse_type',",
"onEvent('jei.hide.items',":"JEIEvents.hideItems(",
"onEvent('jei.subtypes',":"JEIEvents.subtypes(",
"onEvent('jei.add.items',":"JEIEvents.addItems(",
}
for p in root.rglob('*.js'):
 s=p.read_text()
 old=s
 for a,b in repls.items():s=s.replace(a,b)
 # KubeJS 6 Create recipe methods are namespaced under event.recipes.create.*
 for name in ('Splashing','Milling','Filling','Mixing','Pressing','Haunting','Crushing','Deploying','SequencedAssembly','MechanicalCrafting'):
  s=s.replace(f'event.recipes.create{name}',f'event.recipes.create.{name[0].lower()+name[1:]}')
 # KubeJS 6 Mekanism unofficial uses namespaced builders.
 for name in ('Purifying','Crushing','Enriching','MetallurgicInfusing'):
  s=s.replace(f'event.recipes.mekanism{name}',f'event.recipes.mekanism.{name[0].lower()+name[1:]}')
 if s!=old:p.write_text(s)
print('ported legacy event declarations and namespaced recipe builders')

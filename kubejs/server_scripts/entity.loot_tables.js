// Ported to LootJS for KubeJS 6 / Minecraft 1.20.1.
// The original pools rolled 3-5 rods.
LootJS.modifiers(event => {
  const boostedRods = [
    ['minecraft:blaze', 'minecraft:blaze_rod'],
    ['thermal:blizz', 'thermal:blizz_rod'],
    ['thermal:blitz', 'thermal:blitz_rod'],
    ['thermal:basalz', 'thermal:basalz_rod']
  ]

  boostedRods.forEach(([entity, rod]) => {
    event.addEntityLootModifier(entity)
      .addLoot(LootEntry.of(rod).customFunction({
        function: 'minecraft:set_count',
        count: {
          type: 'minecraft:uniform',
          min: 3,
          max: 5
        }
      }))
  })
})

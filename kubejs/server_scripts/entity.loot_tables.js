// Ported to LootJS for KubeJS 6 / Minecraft 1.20.1.
// The original pools rolled 3-5 rods; LootJS random count preserves that range.
LootJS.modifiers(event => {
  const boostedRods = [
    ['minecraft:blaze', 'minecraft:blaze_rod'],
    ['thermal:blizz', 'thermal:blizz_rod'],
    ['thermal:blitz', 'thermal:blitz_rod'],
    ['thermal:basalz', 'thermal:basalz_rod']
  ]

  boostedRods.forEach(([entity, rod]) => {
    event.addEntityLootModifier(entity)
      .addLoot(LootEntry.of(Item.of(rod, 4)))
  })
})

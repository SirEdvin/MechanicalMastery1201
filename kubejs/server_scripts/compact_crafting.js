// Compact Crafting Fork 4.0.6 restores its device recipes, but still omits the
// mining tags required by blocks configured with requiresCorrectToolForDrops().
// Without the pickaxe tag, Minecraft considers every tool incorrect and suppresses loot.
ServerEvents.recipes(event => {
  event.remove({
    mod: 'compactcrafting',
    type: 'compactcrafting:miniaturization'
  })

  event.replaceInput(
    { id: 'compactcrafting:projector_dish' },
    'minecraft:ender_eye',
    'kubejs:cube1_5a'
  )
})

ServerEvents.tags('block', event => {
  const compactCraftingBlocks = [
    'compactcrafting:field_projector',
    'compactcrafting:match_proxy',
    'compactcrafting:rescan_proxy'
  ]

  compactCraftingBlocks.forEach(block => {
    event.add('minecraft:mineable/pickaxe', block)
    event.add('minecraft:needs_iron_tool', block)
  })
})

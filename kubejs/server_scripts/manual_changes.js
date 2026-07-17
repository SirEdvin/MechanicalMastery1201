// Hand written changes

ServerEvents.recipes(event => {
	console.log('[SirEdvin@KUBEJS]: Adding custom recipes...');
    // Adapt Tom's Simple storage recipe to progression flow, so everything aside from logistic would be on a chapter 1
    event.remove({output: "toms_storage:ts.inventory_connector"})
    event.shaped("toms_storage:ts.inventory_connector", [
        "PRP",
        "CDC",
        "PIP"
    ], {
        R: "minecraft:comparator",
        P: "#minecraft:planks",
        C: "#forge:chests/wooden",
        I: "kubejs:cube1",
        D: "#forge:gems/diamond"
    })
    event.remove({output: "toms_storage:ts.storage_terminal"})
    event.shaped("toms_storage:ts.storage_terminal", [
        "PRP",
        "CIG",
        "PRP"
    ], {
        R: "minecraft:comparator",
        P: "#minecraft:planks",
        C: "#forge:chests/wooden",
        G: "#c:glass_blocks",
        I: "kubejs:cube1"
    })
    event.remove({output: "toms_storage:ts.wireless_terminal"})
    event.remove({output: "toms_storage:ts.adv_wireless_terminal"})
    // Cleanup slighly create metalurgy from cheese coke
    event.remove({output: "createmetallurgy:coke"})
    event.remove({output: "createmetallurgy:coke_block"})
})

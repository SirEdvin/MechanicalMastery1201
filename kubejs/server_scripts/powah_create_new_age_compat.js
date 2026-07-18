// Bidirectional compatibility between Powah's Energizing Orb and
// Create: New Age's Energiser. Energy costs match the source recipes.

ServerEvents.recipes(event => {
	const powahRecipes = [
		['overcharged_iron', { tag: 'forge:ingots/iron' }, 'create_new_age:overcharged_iron', 1000],
		['overcharged_iron_sheet', { tag: 'forge:plates/iron' }, 'create_new_age:overcharged_iron_sheet', 1000],
		['overcharged_gold', { tag: 'forge:ingots/gold' }, 'create_new_age:overcharged_gold', 2000],
		['overcharged_golden_sheet', { tag: 'forge:plates/gold' }, 'create_new_age:overcharged_golden_sheet', 2000],
		['overcharged_diamond', { tag: 'forge:gems/diamond' }, 'create_new_age:overcharged_diamond', 10000]
	];

	powahRecipes.forEach(([id, ingredient, result, energy]) => {
		event.custom({
			type: 'powah:energizing',
			ingredients: [ingredient],
			energy: energy,
			result: { item: result }
		}).id(`mechanicalmastery:compat/powah/${id}`);
	});

	// New Age energising accepts one input stack, so only Powah recipes whose
	// original economics can be represented exactly are mirrored here.
	const newAgeRecipes = [
		['blazing_crystal', { item: 'minecraft:blaze_rod' }, 'powah:crystal_blazing', 90000],
		['niotic_crystal', { item: 'minecraft:diamond' }, 'powah:crystal_niotic', 300000],
		['spirited_crystal', { item: 'minecraft:emerald' }, 'powah:crystal_spirited', 1000000],
		['charged_snowball', { item: 'minecraft:snowball' }, 'powah:charged_snowball', 500000]
	];

	newAgeRecipes.forEach(([id, ingredient, result, energy]) => {
		event.custom({
			type: 'create_new_age:energising',
			energy_needed: energy,
			ingredients: [ingredient],
			results: [{ item: result }]
		}).id(`mechanicalmastery:compat/create_new_age/${id}`);
	});
});

// priority: 0

console.info('Hello, World! (You will only see this line once in console, during startup)')

let metals = {};
let all_metals = ['iron', 'gold', 'osmium', 'copper', 'tin', 'lead', 'uranium', 'aluminum', 'silver', 'nickel', 'zinc'];
let vanilla_metals = ['iron', 'copper', 'gold'];
let mekanism_metals = ['iron', 'gold', 'osmium', 'copper', 'tin', 'lead', 'uranium'];
let thermal_metals = ['tin', 'lead', 'silver', 'nickel'];
let create_metals = ['iron', 'gold', 'copper', 'zinc', 'osmium', 'silver', 'tin', 'lead', 'aluminum', 'uranium', 'nickel'];
// let immersive_metals = ['aluminum', 'lead', 'silver', 'nickel', 'uranium'];

console.log('[AMMONIUM@KUBEJS]: Starting ore processing calculations...');
all_metals.forEach((metal) => {
	metals[metal] = {};
	
	// ores and ingots
	if(vanilla_metals.includes(metal)){
		metals[metal]['ore'] = `minecraft:raw_${metal}`;
		metals[metal]['ingot'] = `minecraft:${metal}_ingot`;
	} else {
		if(metal == 'aluminum'){
			metals[metal]['ore'] = 'immersiveengineering:raw_aluminum';
			metals[metal]['ingot'] = 'immersiveengineering:ingot_aluminum';
		} else {
		if(mekanism_metals.includes(metal)) {
			metals[metal]['ore'] = `mekanism:raw_${metal}`;
			metals[metal]['ingot'] = `mekanism:ingot_${metal}`;
		} else {
		if(thermal_metals.includes(metal)) {
			metals[metal]['ore'] = `thermal:raw_${metal}`;
			metals[metal]['ingot'] = `thermal:${metal}_ingot`;
		} else {
		if(create_metals.includes(metal)) {
			metals[metal]['ore'] = `create:raw_${metal}`;
			metals[metal]['ingot'] = `create:${metal}_ingot`;
		} else {
			console.log(`[AMMONIUM@KUBEJS][ERROR]: could not find ore/ingots for ${metal}`);
		}}}}
	
	}
	
	// crushed ores
		if(create_metals.includes(metal)) {
			metals[metal]['crushed'] = `create:crushed_raw_${metal}`;
		} else {
			metals[metal]['crushed'] = `kubejs:crushed_${metal}_ore`;
		}
	
	// everything else
	if(mekanism_metals.includes(metal)) {
		metals[metal]['dirty_slurry'] = `mekanism:dirty_${metal}`;
		metals[metal]['clean_slurry'] = `mekanism:clean_${metal}`;
		metals[metal]['shard'] = `mekanism:shard_${metal}`;
		metals[metal]['crystal'] = `mekanism:crystal_${metal}`;
		metals[metal]['dust'] = `mekanism:dust_${metal}`;
		metals[metal]['dirty_dust'] = `mekanism:dirty_dust_${metal}`;
		metals[metal]['clump'] = `mekanism:clump_${metal}`;
	} else {
		metals[metal]['dirty_slurry'] = `moremekanismprocessing:dirty_${metal}`;
		metals[metal]['clean_slurry'] = `moremekanismprocessing:clean_${metal}`;
		metals[metal]['shard'] = `moremekanismprocessing:shard_${metal}`;
		metals[metal]['crystal'] = `moremekanismprocessing:crystal_${metal}`;
		metals[metal]['dirty_dust'] = `moremekanismprocessing:dirty_dust_${metal}`;
		metals[metal]['clump'] = `moremekanismprocessing:clump_${metal}`;
		if(thermal_metals.includes(metal)){
			metals[metal]['dust'] = `thermal:${metal}_dust`;
		} else {
			metals[metal]['dust'] = `kubejs:${metal}_dust`;
		}
	}
	
})

console.log('[AMMONIUM@KUBEJS]:Ore processing calculations finished. Metal name registries:');

for(var metal in metals) {
	console.log(metal);
	for(var stage in metals[metal]) {
		console.log(`${stage} -> ${metals[metal][stage]}`);
	}
}

console.log('[AMMONIUM@KUBEJS]:End of list.');

StartupEvents.registry('item', event => {
	// Register new items here
	// event.create('example_item').displayName('Example Item')
	event.create('cube1').displayName('Basic Mechanical Essence');
	event.create('cube1_packaged').displayName('Basic Mechanical Crystal');
	event.create('cube1_5a').displayName('Basic Compacting Mechanical Essence').tooltip("It seems much smaller that it actually is...");
	event.create('cube1_5a_packaged').displayName('Basic Compacting Mechanical Crystal');
	event.create('cube1_5b').displayName('Basic Logistic Mechanical Essence').tooltip("Even just lookint at her makes you want to move items by hands...");
	event.create('cube1_5b_packaged').displayName('Basic Logistic Mechanical Crystal');
	event.create('cube2').displayName('Regular Mechanical Essence');
	event.create('cube2_packaged').displayName('Regular Mechanical Crystal');
	event.create('cube2_5a').displayName('Turquoise Mechanical Essence');
	event.create('cube2_5a_packaged').displayName('Turquoise Mechanical Crystal');
	event.create('cube2_5b').displayName('Green Mechanical Essence');
	event.create('cube2_5b_packaged').displayName('Green Mechanical Crystal');
	event.create('cube3').displayName('Improved Mechanical Essence');
	event.create('cube3_packaged').displayName('Improved Mechanical Crystal');
	event.create('cube3_5a').displayName('Burnished Coral Mechanical Essence');
	event.create('cube3_5a_packaged').displayName('Burnished Coral Mechanical Crystal');
	event.create('cube3_5b').displayName('Rose Mechanical Essence');
	event.create('cube3_5b_packaged').displayName('Rose Mechanical Crystal');
	event.create('cube4').displayName('Advanced Mechanical Essence');
	event.create('cube4_packaged').displayName('Advanced Mechanical Crystal');
	event.create('cube4_inert').displayName('Inert Advanced Mechanical Essence').tooltip('So close, yet so far...');
	event.create('cube4_5a').displayName('Fuchsia Mechanical Essence');
	event.create('cube4_5b').displayName('Crimson Mechanical Essence');

	// Items for chapter 1.5
	event.create("cube1_rod").displayName("Basic Mechanical Rod")
	event.create("cube1_gear").displayName("Basic Mechanical Gear")
	event.create("cube1_nugget").displayName("Small Basic Mechanical Essense")
	event.create("cube1_5a_nugget").displayName("Small Basic Compacting Mechanical Essense")
	
	event.create('press_rod_die').displayName('Rod Die');
	event.create('oil_clump').displayName('Oil clump');
	event.create('fission_pellet').displayName('Fissile fuel pellet');
	event.create('black_hdpe_sheet').displayName('Black HDPE Sheet');
	
	event.create('blaze_effigy').displayName('Blaze effigy').tooltip('Right click to summon a Blaze');
	event.create('blizz_effigy').displayName('Blizz effigy').tooltip('Right click to summon a Blizz');
	event.create('blitz_effigy').displayName('Blitz effigy').tooltip('Right click to summon a Blitz');
	event.create('basalz_effigy').displayName('Basalz effigy').tooltip('Right click to summon a Basalz');
	event.create('dormant_effigy').displayName('Dormant effigy').tooltip('The power to create life, just not fully awoken');
	
	event.create('steel_gear').displayName('Steel Gear');
	event.create('diamond_rod').displayName('Diamond Rod');
	event.create('diamond_plate').displayName('Diamond Plate');
	event.create('aluminum_gear').displayName('Aluminum Gear');
	
	event.create('black_essence').displayName('Essence of Darkness');
	event.create('enriched_black_essence').displayName('Enriched Essence of Darkness');
	
	event.create('basilic_reagent').displayName('Basilic Reagent');
	event.create('enriched_basilic_reagent').displayName('Enriched Basilic Reagent');
	
	event.create('stable_waste').displayName('Stable Spent Nuclear Waste').tooltip('(Disabled) Safe for storage or disposal');
	event.create('incomplete_final_shard').displayName('Incomplete Final Star Shard');

	event.create('incomplete_time_augment').displayName('Time Destabilizer Components').texture('kubejs:item/basic_package');
	event.create('time_augment').displayName('Localized time destabilizer').tooltip('Enables machine compatibility with watch' + 
	' of flowing time. Best used alongside resonant integral components')

	event.create('incomplete_creative_blaze_cake').displayName('Incomplete Creative Blaze Cake');
	event.create('incomplete_creative_upgrade').displayName('Incomplete Creative Augment');

	event.create('coated_redstone').displayName('Obsidian-Coated Redstone');

	// industrial foregoing items
	event.create('incomplete_simple_frame').displayName('Incomplete Simple Machine Frame').texture('kubejs:item/basic_package');
	event.create('incomplete_advanced_frame').displayName('Incomplete Advanced Machine Frame').texture('kubejs:item/basic_package');
	event.create('incomplete_supreme_frame').displayName('Incomplete Supreme Machine Frame').texture('kubejs:item/basic_package');
	event.create('incomplete_speed_1').displayName('Incomplete Speed 1 Addon').texture('kubejs:item/basic_package');
	event.create('incomplete_speed_2').displayName('Incomplete Speed 2 Addon').texture('kubejs:item/basic_package');
	event.create('incomplete_eff_1').displayName('Incomplete Efficiency 1 Addon').texture('kubejs:item/basic_package');
	event.create('incomplete_eff_2').displayName('Incomplete Efficiency 2 Addon').texture('kubejs:item/basic_package');
	event.create('incomplete_proc_1').displayName('Incomplete Processing 1 Addon').texture('kubejs:item/basic_package');
	event.create('incomplete_proc_2').displayName('Incomplete Processing 2 Addon').texture('kubejs:item/basic_package');
	event.create('incomplete_range_2').displayName('Incomplete Range 2 Addon').texture('kubejs:item/basic_package');

	event.create('incomplete_press').displayName('Incomplete Inscriber Press').texture('kubejs:item/incomplete_press');
	
	console.log('[AMMONIUM@KUBEJS]: Adding ore item registry entries...');

	for(var metal in metals) {
		for(var stage in metals[metal]) {
			let metalStage = metals[metal][stage];
	
			if(stage !== 'dirty_slurry' && stage !== 'clean_slurry' && metalStage.startsWith('kubejs')) {
	
				let item = metalStage.substring(7);
				let capitalized = metal.charAt(0).toUpperCase() + metal.slice(1);
				let name = '';
	
				switch(stage) {
					case 'shard':
						name = `${capitalized} Shard`;
						break;
					case 'crystal':
						name = `${capitalized} Crystal`;
						break;
					case 'dirty_dust':
						name = `Dirty ${capitalized} Dust`;
						break;
					case 'clump':
						name = `${capitalized} Clump`;
						break;
					case 'dust':
						name = `${capitalized} Dust`;
						break;
					default:
						break;
				}
	
				console.log(metalStage);
				event.create(item).displayName(name);
			}
		}
	}
	
})

StartupEvents.registry('block', event => {
	// Register new blocks here
	// event.create('example_block').material('wood').hardness(1.0).displayName('Example Block')
	event.create('cube1_block').displayName('Block of Basic Mechanical Essence').textureAll('kubejs:block/cube1_block');
	event.create('cube1_5a_block').displayName('Block of Magenta Mechanical Essence').textureAll('kubejs:block/cube1_5a_block');
	event.create('cube1_5b_block').displayName('Block of Indigo Mechanical Essence').textureAll('kubejs:block/cube1_5b_block');
	event.create('cube2_block').displayName('Block of Regular Mechanical Essence').textureAll('kubejs:block/cube2_block');
	event.create('cube2_5a_block').displayName('Block of Turquoise Mechanical Essence').textureAll('kubejs:block/cube2_5a_block');
	event.create('cube2_5b_block').displayName('Block of Green Mechanical Essence').textureAll('kubejs:block/cube2_5b_block');
	event.create('cube3_block').displayName('Block of Improved Mechanical Essence').textureAll('kubejs:block/cube3_block');
	event.create('cube3_5a_block').displayName('Block of Burnished Coral Mechanical Essence').textureAll('kubejs:block/cube3_5a_block');
	event.create('cube3_5b_block').displayName('Block of Rose Mechanical Essence').textureAll('kubejs:block/cube3_5b_block');
	event.create('cube4_block').displayName('Block of Advanced Mechanical Essence').textureAll('kubejs:block/cube4_block');
	event.create('cube4_5a_block').displayName('Block of Fuchsia Mechanical Essence').textureAll('kubejs:block/cube4_5a_block');
	event.create('cube4_5b_block').displayName('Block of Crimson Mechanical Essence').textureAll('kubejs:block/cube4_5b_block');
})

ItemEvents.modification( event => {
    event.modify('projectexpansion:infinite_steak', item => {
        item.setFoodProperties(food => {
            food.hunger(5)
            food.saturation(5)
        })
    })
})

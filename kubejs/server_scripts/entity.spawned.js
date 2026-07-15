ItemEvents.rightClicked( event => {
	if (!event.server){
		return;
	}
	
	const player = event.player;
	const hit = player.rayTrace(8);
	const x = hit.hitX;
	const y = hit.hitY + 1;
	const z = hit.hitZ;
	
	if (event.item.id == 'kubejs:blaze_effigy') {
		let blaze = event.level.createEntity('minecraft:blaze');
		blaze.x = x;
		blaze.y = y;
		blaze.z = z;
		blaze.spawn();
		event.item.count--;
	} else if (event.item.id == 'kubejs:blizz_effigy') {
		let blizz = event.level.createEntity('thermal:blizz');
		blizz.x = x;
		blizz.y = y;
		blizz.z = z;
		blizz.spawn();
		event.item.count--;
	} else if (event.item.id == 'kubejs:blitz_effigy') {
		let blitz = event.level.createEntity('thermal:blitz');
		blitz.x = x;
		blitz.y = y;
		blitz.z = z;
		blitz.spawn();
		event.item.count--;
	} else if (event.item.id == 'kubejs:basalz_effigy') {
		let basalz = event.level.createEntity('thermal:basalz');
		basalz.x = x;
		basalz.y = y;
		basalz.z = z;
		basalz.spawn();
		event.item.count--;
	}
	
	
})
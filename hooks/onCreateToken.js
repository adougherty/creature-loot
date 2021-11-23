import {CreatureLoot} from '../scripts/creature-loot.js';

export let initHooks = () => {
    Hooks.on('createToken', (token, createData, options, userId) => {
	    if(! game.settings.get("creature-loot","enable"))
	        return;

	    const actor = token.actor;

	    if (!token.actor || (token.data.actorLink)) // Don't for linked token
	        return token;
	    console.log(actor.name);

	    let creatureLoot = new CreatureLoot();
	    creatureLoot.generateLoot(token);
	});
};

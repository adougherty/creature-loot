export class CreatureLoot {
    constructor() {
        this.moduleNamespace = "creature-loot"
        return this;
    }

    async generateLoot(token) {
        // We need the actor of the token, not the main actor
        const tokenId = token.id;
        const actor = token.actor;
        console.log(actor.name);

        // Get the Items Compendium
        const pack = game.packs.get("creature-loot.items-creature-loot");

        let response = await fetch('/modules/creature-loot/data/loot.json');
        let json = await response.json();
        let addItems = [];
        let addQuantities = [];
        if (json[actor.name]) {
            json[actor.name].forEach(item => {
                let itemEntry = pack.index.find(e => e.name === item.name);
           
                let itemQtyRoll = new Roll(item.quantity);
                itemQtyRoll.evaluate({async:false});
                addItems.push(itemEntry);
                console.log(`Adding: ${item.name}`);
                addQuantities.push({
                    name: itemEntry.name,
                    quantity: itemQtyRoll.total
                });

            });
            await actor.createEmbeddedDocuments("Item", addItems);
            addQuantities.forEach(async(item) => {
                if (item.quantity > 1) {
                    let existingItem = actor.items.find(i => i.data.name == item.name);
                    await existingItem.update({ "data.quantity": item.quantity });
                }
            })

        }
    }
}
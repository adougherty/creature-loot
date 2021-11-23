import {initHooks} from './hooks/onCreateToken.js';

Hooks.once('init', () => {
    initHooks();
});

Hooks.once('ready', () => {
    game.settings.register("creature-loot", 'enable', {
        name: game.i18n.localize('CreatureLoot.setting'),
        hint: game.i18n.localize('CreatureLoot.settingHint'),
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });
});

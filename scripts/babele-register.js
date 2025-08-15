Hooks.once("init", () => {
    if (!game.modules.get("babele")?.active) return;

    Babele.get().register({
        module: "daggerheart-ru",
        lang: "ru",
        dir: "packs/ru"
    });
});
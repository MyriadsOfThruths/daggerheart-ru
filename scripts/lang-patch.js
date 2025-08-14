Hooks.on("renderFearTracker", (app, html) => {
    const title = game.i18n?.localize?.("CUSTOM_RU.DHRU.Fear") || "Страх";
    // На будущее — чтобы окно помнило новый титул
    app.options ??= {};
    app.options.window ??= {};
    app.options.window.title = title;

    // Сразу обновим заголовок уже отрендеренного окна
    const root = html?.[0] ?? html ?? app.element;
    const h = root?.querySelector?.(".window-title");
    if (h) h.textContent = title;
});
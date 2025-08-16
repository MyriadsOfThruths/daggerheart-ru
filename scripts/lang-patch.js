Hooks.on("renderFearTracker", (app, html) => {
    const title = game.i18n?.localize?.("CUSTOM_RU.Fear") || "Страх";
    // На будущее — чтобы окно помнило новый титул
    app.options ??= {};
    app.options.window ??= {};
    app.options.window.title = title;

    // Сразу обновим заголовок уже отрендеренного окна
    const root = html?.[0] ?? html ?? app.element;
    const h = root?.querySelector?.(".window-title");
    if (h) h.textContent = title;
});

Hooks.on("preUpdateActor", (actor, change, options, userId) => {
    // Только для русской локали
    if (game.i18n.lang !== "ru") return;

    const localized = game.i18n.localize("CUSTOM_RU.Experience");

    // Вариант 1: обычный случай — Foundry уже "сплющил" объект в dot-keys
    for (const [k, v] of Object.entries(change)) {
        if (/^system\.experiences\.[^.]+\.name$/.test(k) && v === "Experience") {
            change[k] = localized;
        }
    }

    // Вариант 2: на всякий случай — если вдруг ключ пришёл не сплющенным
    const exps = change?.system?.experiences;
    if (exps && typeof exps === "object") {
        for (const obj of Object.values(exps)) {
            if (obj && typeof obj === "object" && obj.name === "Experience") {
                obj.name = localized;
            }
        }
    }
});
Hooks.on("renderFearTracker", (app, html) => {
    if (game.i18n.lang !== "ru") return;

    const title = game.i18n?.localize?.("CUSTOM_RU.Fear") || "Страх";

    app.options ??= {};
    app.options.window ??= {};
    app.options.window.title = title;

    const root = html?.[0] ?? html ?? app.element;
    const h = root?.querySelector?.(".window-title");
    if (h) h.textContent = title;
});

Hooks.on("preUpdateActor", (actor, change, options, userId) => {
    if (game.i18n.lang !== "ru") return;

    const localized = game.i18n.localize("CUSTOM_RU.Experience");

    for (const [k, v] of Object.entries(change)) {
        if (/^system\.experiences\.[^.]+\.name$/.test(k) && v === "Experience") {
            change[k] = localized;
        }
    }

    const exps = change?.system?.experiences;
    if (exps && typeof exps === "object") {
        for (const obj of Object.values(exps)) {
            if (obj && typeof obj === "object" && obj.name === "Experience") {
                obj.name = localized;
            }
        }
    }
});

Hooks.once("init", () => {
    const REMAP = new Map([
        ["daggerheart.communities", "daggerheart-ru.communities"],
    ]);

    const origGet = game.packs.get.bind(game.packs);
    game.packs.get = function (...args) {
        const id = args[0];
        args[0] = REMAP.get(id) ?? id;
        return origGet(...args);
    };

    const rewire = (s) => {
        if (typeof s !== "string") return s;
        for (const [src, dst] of REMAP.entries()) {
            if (s.startsWith(`Compendium.${src}.`)) {
                return s.replace(`Compendium.${src}.`, `Compendium.${dst}.`);
            }
        }
        return s;
    };

    const origAsync = globalThis.fromUuid?.bind(globalThis);
    if (typeof origAsync === "function") {
        globalThis.fromUuid = async function(uuid, ...rest) {
            return origAsync(rewire(uuid), ...rest);
        };
    }

    const origSync = globalThis.fromUuidSync?.bind(globalThis);
    if (typeof origSync === "function") {
        globalThis.fromUuidSync = function(uuid, ...rest) {
            return origSync(rewire(uuid), ...rest);
        };
    }
});

Hooks.once("ready", () => {
    console.log("[daggerheart-ru] Remap active:",
        "daggerheart.communities →", game.packs.get("daggerheart-ru.communities")?.collection
    );
});



const MODULE_ID = "daggerheart-ru";

async function applyRuLabelsByCollection() {
    const tasks = game.packs.map(async (pack) => {
        // ограничимся пакетами системы Daggerheart
        if (!pack.collection.startsWith("daggerheart.")) return;

        const url = `modules/${MODULE_ID}/packs/ru/${pack.collection}.json`;
        try {
            const res = await fetch(url, { cache: "no-store" });
            if (!res.ok) return;
            const data = await res.json();
            const ru = (data && typeof data.label === "string") ? data.label.trim() : "";
            if (ru) pack.metadata.label = ru;
        } catch {/* пропускаем */}
    });

    await Promise.allSettled(tasks);

    // перерисовать каталог компендиумов
    (game.packs.directory ?? ui.sidebar?.tabs?.compendium?.directory)?.render?.(true);
}

Hooks.once("setup", () => applyRuLabelsByCollection());
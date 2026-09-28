/**
 * DOČASNÉ SEZÓNNÍ AKCE
 * ------------------------------------------------------------------
 * Akce se zobrazují automaticky:
 *  - v HeroCarouselu na úvodní stránce (jako první snímek),
 *  - v sekci "Sezónní akce" na stránkách /akce a /restaurace.
 *
 * Každá akce se sama skryje den po `endDate` (počítáno v čase Europe/Prague).
 * Stránky se regenerují každou hodinu (export const revalidate = 3600),
 * takže po skončení akce není potřeba nic mazat ani nasazovat.
 *
 * Až bude akce za námi, stačí nechat pole prázdné: []
 * Další akci přidáte jako nový objekt do pole (zobrazí se vedle / po sobě).
 */

export interface SeasonalEvent {
    slug: string;              // použije se jako kotva: /akce#<slug>
    title: string;
    tagline: string;           // krátký podtitul (malým písmem nad nadpisem)
    dateLabel: string;         // jak se datum zobrazí uživateli
    startDate: string;         // YYYY-MM-DD
    endDate: string;           // YYYY-MM-DD (včetně)
    showFrom?: string;         // YYYY-MM-DD – od kdy akci ukazovat (výchozí: hned)
    description: string;       // krátký text do HeroCarouselu
    paragraphs?: string[];     // delší text do sekce na /akce a /restaurace
    highlights?: string[];     // odrážky (volitelné)
    meats?: string[];          // štítky – druhy masa
    location?: string;
    note?: string;             // zvýrazněná poznámka (např. doporučení rezervace)
    closing?: string;          // závěrečná věta
    vouchers?: string[];       // dárkové poukázky
    poster: {
        src: string;
        width: number;
        height: number;
        alt: string;
    };
    phone: string;
    /** Barevný akcent odpovídající plakátu */
    accent: string;
}

export const seasonalEvents: SeasonalEvent[] = [
    {
        slug: "zverinove-hody",
        title: "Zvěřinové hody",
        tagline: "Chuť naší přírody",
        dateLabel: "18. – 22. 11. 2026",
        startDate: "2026-11-18",
        endDate: "2026-11-22",
        // Krátký text – zobrazuje se v HeroCarouselu
        description:
            "Od středy 18. do neděle 22. listopadu pro vás připravíme speciální menu plné zvěřinových specialit.",
        // Delší text – zobrazuje se v sekci na /akce a /restaurace
        paragraphs: [
            "Zveme vás do Restaurace a hotelu U Šimáka v Radostíně na tradiční Zvěřinové hody. Od středy 18. do neděle 22. listopadu pro vás připravíme speciální menu plné zvěřinových specialit.",
            "Chybět nebude kančí paštika, poctivé polévky, řízečky, medailonky, steaky, guláš ani tradiční zvěřina na smetaně. A samozřejmě nebude chybět ani něco sladkého na závěr.",
        ],
        meats: ["Kančí", "Jelení", "Srnčí", "Daňčí", "Bažantí", "Zaječí", "Mufloní", "Křepelčí"],
        location: "Restaurace a hotel U Šimáka, Radostín u Velkého Dářka",
        note: "Doporučujeme rezervaci stolu předem, zejména na pátek, sobotu a neděli.",
        closing:
            "Přijeďte ochutnat podzimní Vysočinu tak, jak ji máme nejraději – s poctivou kuchyní a zvěřinou v hlavní roli.",
        vouchers: ["1 000 Kč", "2 000 Kč", "3 000 Kč"],
        poster: {
            src: "/zverinove-hody.jpg",
            width: 1054,
            height: 1492,
            alt: "Plakát Zvěřinové hody 18. – 22. 11. 2026 – Restaurace a hotel U Šimáka",
        },
        phone: "720 417 130",
        accent: "#5b3a1f",
    },
];

/** Dnešní datum v pražském čase ve formátu YYYY-MM-DD */
function todayInPrague(): string {
    // sv-SE formátuje datum jako YYYY-MM-DD
    return new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Prague" }).format(new Date());
}

/** Vrací akce, které se mají právě zobrazovat, seřazené podle začátku. */
export function getActiveSeasonalEvents(): SeasonalEvent[] {
    const today = todayInPrague();
    return seasonalEvents
        .filter((e) => today <= e.endDate && (!e.showFrom || today >= e.showFrom))
        .sort((a, b) => a.startDate.localeCompare(b.startDate));
}

export const telHref = (phone: string) => `tel:+420${phone.replace(/\s/g, "")}`;

/**
 * DOČASNÉ SEZÓNNÍ AKCE
 * ------------------------------------------------------------------
 * Akce se zobrazují automaticky:
 *  - v HeroCarouselu na úvodní stránce (jako první snímky),
 *  - v sekci "Sezónní akce" na stránkách /akce a /restaurace.
 *
 * Každá akce se sama skryje den po `endDate` (počítáno v čase Europe/Prague).
 * Stránky se regenerují každou hodinu (export const revalidate = 3600),
 * takže po skončení akce není potřeba nic mazat ani nasazovat.
 *
 * Až budou obě akce za námi, stačí nechat pole prázdné: []
 */

export interface SeasonalEvent {
    slug: string;              // použije se jako kotva: /akce#<slug>
    title: string;
    tagline: string;           // krátký podtitul (malým písmem nad nadpisem)
    dateLabel: string;         // jak se datum zobrazí uživateli
    startDate: string;         // YYYY-MM-DD
    endDate: string;           // YYYY-MM-DD (včetně)
    showFrom?: string;         // YYYY-MM-DD – od kdy akci ukazovat (výchozí: hned)
    description: string;
    highlights: string[];      // odrážky v sekci na /akce
    note?: string;             // zvýrazněná poznámka (např. "Pouze na objednávku")
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
        slug: "svatomartinska-husa",
        title: "Svatomartinská husa",
        tagline: "Podzimní tradice U Šimáka",
        dateLabel: "13. – 15. 11. 2026",
        startDate: "2026-11-13",
        endDate: "2026-11-15",
        description:
            "Křupavá pečená husa s červeným i bílým zelím a nadýchanými knedlíky. Oslavte svatého Martina u nás.",
        highlights: [
            "Pečená husa se zelím a knedlíky",
            "Tři dny tradiční svatomartinské nabídky",
        ],
        note: "Pouze na objednávku",
        poster: {
            src: "/husa.jpg",
            width: 1024,
            height: 1536,
            alt: "Plakát Svatomartinská husa 13. – 15. 11. 2026 – Restaurace a hotel U Šimáka",
        },
        phone: "720 417 130",
        accent: "#6e1f2b",
    },
    {
        slug: "zverinove-hody",
        title: "Zvěřinové hody",
        tagline: "Chuť naší přírody",
        dateLabel: "18. – 22. 11. 2026",
        startDate: "2026-11-18",
        endDate: "2026-11-22",
        description:
            "Pět dní věnovaných zvěřině – tradiční česká kuchyně tak, jak ji máme rádi.",
        highlights: [
            "Speciality ze zvěřiny",
            "Doporučujeme rezervaci stolu předem",
        ],
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

export interface EventType {
    id: string;
    name: string;
    description: string;
    icon: string;
    features: string[];
}

export const eventTypes: EventType[] = [
    {
        id: "wedding",
        name: "Svatební hostiny",
        description: "Vytvoříme pro vás nezapomenutelnou svatební hostinu v krásném prostředí",
        icon: "heart",
        features: [
            "Kapacita až 50 hostů",
            "Individuální menu podle přání",
            "Kompletní servis",
            "Venkovní prostory pro obřad",
            "Parkování pro hosty"
        ]
    },
    {
        id: "corporate",
        name: "Firemní akce",
        description: "Profesionální prostředí pro vaše firemní akce a teambuildingy",
        icon: "briefcase",
        features: [
            "Školící místnosti",
            "Prezentační technika",
            "Catering dle přání",
            "Wi-Fi zdarma",
            "Možnost ubytování"
        ]
    },
    {
        id: "celebration",
        name: "Rodinné oslavy",
        description: "Narozeniny, výročí, křtiny - oslavte s námi důležité okamžiky",
        icon: "cake",
        features: [
            "Útulné prostory",
            "Flexibilní menu",
            "Dětské venkovní hřiště",
            "Venkovní terasa",
            "Vlastní hudba možná"
        ]
    },
    {
        id: "banquet",
        name: "Rauty a bankety",
        description: "Elegantní prostředí pro vaše společenské akce",
        icon: "utensils",
        features: [
            "Pestré menu",
            "Profesionální obsluha",
            "Možnost slavnostní výzdoby",
            "Bar s širokou nabídkou",
            "Parkování"
        ]
    },
    {
        id: "graduation",
        name: "Promoce a maturitní večírky",
        description: "Oslavte úspěšné zakončení studia v příjemném prostředí",
        icon: "graduation-cap",
        features: [
            "Moderní prostory",
            "Taneční parket",
            "Možnost hudby",
            "Speciální nabídka pro studenty",
            "Dlouhá otevírací doba"
        ]
    }
];
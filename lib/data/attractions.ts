export interface Attraction {
    id: string;
    name: string;
    description: string;
    distance?: string;
    category: "nature" | "sport" | "culture";
    features: string[];
}

export const attractions: Attraction[] = [
    {
        id: "velke-darko",
        name: "Velké Dářko",
        description: "Největší rybník Českomoravské vrchoviny, přezdívaný 'Moře Vysočiny'. Uprostřed lesnaté krajiny Žďárských vrchů.",
        distance: "V bezprostřední blízkosti",
        category: "nature",
        features: [
            "Možnost koupání",
            "Romantické procházky",
            "Krásné výhledy",
            "Ideální pro fotografii"
        ]
    },
    {
        id: "rybnik-reka",
        name: "Rybník Řeka",
        description: "Velký rybník s možností koupání, projížděk na loďkách a šlapadlech. Ráj pro vodní sporty a milovníky přírody.",
        distance: "Cca 2 km",
        category: "nature",
        features: [
            "Koupání",
            "Loďky a šlapadla",
            "Cykloturistika",
            "Rybaření",
            "Houbaření v okolí"
        ]
    },
    {
        id: "raseliny",
        name: "Radostínské rašeliniště",
        description: "Nejrozsáhlejší komplex rašelinišť na Žďársku - národní přírodní rezervace s chráněnými druhy rostlin severského původu.",
        distance: "Cca 1 km severovýchodně",
        category: "nature",
        features: [
            "Naučná stezka",
            "Vzácné rostliny (rosnatka, suchopýry, klikva)",
            "Chráněná příroda",
            "Ideální pro turistiku"
        ]
    },
    {
        id: "tennis",
        name: "Tenisový kurt",
        description: "Antukový povrch pro veřejnost, otevřen od července 2002.",
        distance: "V místě",
        category: "sport",
        features: [
            "Antukový povrch",
            "Veřejně přístupný",
            "Rezervace možná"
        ]
    },
    {
        id: "cycling",
        name: "Cykloturistika",
        description: "Žďárské vrchy nabízí desítky kilometrů značených cyklotras pro všechny úrovně cyklistů.",
        category: "sport",
        features: [
            "Značené cyklotrasy",
            "Půjčovna kol v hotelu",
            "Trasy pro rodiny i náročné cyklisty",
            "Krásná příroda Vysočiny"
        ]
    },
    {
        id: "skiing",
        name: "Lyžování",
        description: "V zimě udržované lyžařské stopy, lyžařské středisko v Hlinsku v Čechách.",
        category: "sport",
        features: [
            "Udržované běžecké stopy",
            "Lyžařské středisko v dosahu",
            "Ideální pro rodiny",
            "Krásná zimní krajina"
        ]
    },
    {
        id: "sculptures",
        name: "Sochy Michala Olšiaka",
        description: "Zajímavý turistický cíl - originální dřevěné sochy v okolí.",
        category: "culture",
        features: [
            "Umělecká díla",
            "Vhodné pro rodinný výlet",
            "Fotogenické místo"
        ]
    }
];

export const activitiesByCategory = {
    nature: attractions.filter(a => a.category === "nature"),
    sport: attractions.filter(a => a.category === "sport"),
    culture: attractions.filter(a => a.category === "culture")
};
export interface Attraction {
  id: string;
  name: string;
  description: string;
  category: "nature" | "sport" | "culture";
  distance?: string;
  features: string[];
  href: string;
}

export const attractions: Attraction[] = [
  // Nature attractions
  {
    id: "velke-darko",
    name: "Velké Dářko",
    description:
      "Největší rybník Českomoravské vrchoviny s rozlohou 206 ha, někdy nazývaný 'moře Vysočiny'. Založen v 15. století pro pohon hamrů, pil a mlýnů. Nabízí krásné písečné pláže a teplou vodu v létě.",
    category: "nature",
    distance: "3 km",
    features: [
      "Rozloha 206 ha - největší na Českomoravské vrchovině",
      "Maximální hloubka 4 m, průměrná 1,5 m",
      "Písečné pláže a teplá voda",
      "Jachting klub - půjčení jachet, windsurfingu, loděk, šlapadel",
      "Naučná stezka 12 km s 15 zastavení",
      "Cyklostezka spojující Žďár nad Sázavou a Polničku",
      "Národní přírodní rezervace Dářko",
    ],
    href: "/images/darko.webp",
  },
  {
    id: "rybnik-reka",
    name: "Rybník Řeka",
    description:
      "Velký rybník jižně od Krucemburku s travnatou pláží ideální pro koupání. Kemp Moré nabízí ubytování, restauraci a půjčování loděk. Každý červenec se koná festival Hrošení na Řece.",
    category: "nature",
    distance: "5 km",
    features: [
      "Travnatá pláž na severním břehu",
      "Kemp Moře s ubytováním (kajuty, chatky, domky)",
      "Půjčovna loděk (200 Kč/hod)",
      "Country-folk festival Hrošení na Řece (červenec)",
      "Restaurace a občerstvení",
      "Koupání, surfování, loďky",
      "Cyklotrasy a turistické stezky v okolí",
    ],
    href: "/images/reka.webp",
  },
  {
    id: "radostinske-raseliniste",
    name: "Radostínské rašeliniště",
    description:
      "Národní přírodní rezervace cca 1 km severovýchodně od Radostína. Nejrozsáhlejší komplex rašelinišť na Žďársku s rozlohou 35 ha a hloubkou rašeliny až 3,26 m. Připomína svým vzhledem severskou tajgu.",
    category: "nature",
    distance: "1 km",
    features: [
      "Rozloha cca 35 ha s rašelinou hloubkou až 3,26 m",
      "Součást ložiska Březina (107 ha, 2 mil. m³ rašeliny)",
      "Historická těžba borkováním do 1. světové války",
      "Vzácné druhy: rosnatka okrouhlolistá, suchopýr, klikva",
      "Přes 350 druhů motýlů včetně vzácných druhů",
      "Bohatý výskyt obojživelníků a vzácných ptáků",
      "Naučná stezka s informacemi o rašeliništi",
    ],
    href: "/images/raselina.webp",
  },

  // Sport activities
  {
    id: "cyklistika",
    name: "Cyklistika",
    description:
      "Žďárské vrchy nabízejí síť značených cyklotras pro rekreační i náročnější cyklisty. Půjčovna kol přímo v restauraci.",
    category: "sport",
    distance: "0 km",
    features: [
      "Značené cyklotrasy různých náročností",
      "Cyklostezka kolem Velkého Dářka",
      "Půjčovna jízdních kol v hotelu",
      "Krásná krajina Českomoravské vrchoviny",
      "Napojení na dálkové trasy",
    ],
    href: "/images/cyklo.webp",
  },
  {
    id: "rybareni",
    name: "Rybaření",
    description:
      "Vynikající příležitosti k rybolovu v místních rybnících. Velké Dářko, rybník Řeka a další vodní plochy nabízejí bohatý rybí život.",
    category: "sport",
    distance: "1-5 km",
    features: [
      "Rybolov na Velkém Dářku",
      "Rybník Řeka s bohatým rybím obsazením",
      "Menší rybníky v okolí Radostína",
      "Možnost půjčení rybářského vybavení",
      "Klidné přírodní prostředí",
    ],
    href: "/images/okolni/rybareni.jpg",
  },
  {
    id: "turistika",
    name: "Turistika a pěší výlety",
    description:
      "Síť značených turistických tras procházejících Žďárskými vrchy, rašeliništi a okolo vodních ploch. Naučné stezky s informacemi o přírodě.",
    category: "sport",
    distance: "0 km",
    features: [
      "Značené turistické trasy",
      "Naučná stezka Velké Dářko (12 km)",
      "Naučná stezka Radostínským rašeliništěm",
      "Procházky kolem rybníků",
      "Romantické zimní výlety",
      "Houbaření v okolních lesích",
    ],
    href: "/images/okolni/turistika.jpg",
  },
  {
    id: "vodní-sporty",
    name: "Vodní sporty",
    description:
      "Velké Dářko je rájem pro vodní sporty. Jachting klub nabízí půjčení jachet, windsurfing, loďky a šlapadla.",
    category: "sport",
    distance: "5 km",
    features: [
      "Windsurfing",
      "Jachting a plachtění",
      "Půjčovna loděk a šlapadel",
      "Koupání v čisté vodě",
      "Vhodné podmínky pro začátečníky i pokročilé",
    ],
    href: "/images/okolni/vodni-sporty.jpg",
  },
  {
    id: "tenis",
    name: "Tenisový kurt",
    description:
      "Antukový tenisový kurt pro veřejnost otevřený od července 2002. Ideální pro sportovní vyžití během pobytu.",
    category: "sport",
    distance: "0 km",
    features: [
      "Antukový povrch",
      "Veřejně přístupný",
      "Přímo v Radostíně",
      "Vhodné pro rekreační tenis",
    ],
    href: "/images/kurt.webp",
  },
  {
    id: "lyzovani",
    name: "Lyžování",
    description:
      "V zimních měsících udržované lyžařské stopy v okolí. Lyžařské středisko v nedaleké oblasti Hlinsko v Čechách.",
    category: "sport",
    distance: "0-30 km",
    features: [
      "Udržované běžecké trasy v okolí",
      "Běžkování v nádherné krajině",
      "Vhodné pro celou rodinu",
    ],
    href: "/images/lyze.webp",
  },

  // Culture
  {
    id: "sochy-olsiak",
    name: "Sochy Michala Olšiaka",
    description:
      "Monumentální plastiky z pískovce a betonu od žďárského sochaře Michala Olšiaka (*1978). V okolí Žďáru nad Sázavou najdete desítky jeho pohádkových soch.",
    category: "culture",
    distance: "0-20 km",
    features: [
      "Mamlas u Starého Dvora - lesní tvor na vyhlídce",
      "Hraniční kámen u Pilské nádrže - lev a orlice",
      "Hamroň a kůň u Hamrů nad Sázavou",
      "Mamut v údolí Sázavy pod Rozštípenou skálou",
      "Výr v chatové osadě Yukon u Tří Studní",
      "Hroši ve Škrdlovicích, želva v Obyčtově",
      "Jelen u Slavětína, houby ve Fryšavě pod Žákovou horou",
      "Další sochy po celé Vysočině",
    ],
    href: "/images/socha.webp",
  },
];

// Group attractions by category
export const activitiesByCategory = {
  nature: attractions.filter((a) => a.category === "nature"),
  sport: attractions.filter((a) => a.category === "sport"),
  culture: attractions.filter((a) => a.category === "culture"),
};

// Quick stats for overview
export const attractionStats = {
  totalAttractions: attractions.length,
  byCategory: {
    nature: activitiesByCategory.nature.length,
    sport: activitiesByCategory.sport.length,
    culture: activitiesByCategory.culture.length,
  },
};
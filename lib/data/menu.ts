export interface MenuItem {
    id: string;
    name: string;
    description?: string;
    price: number;
    category: string;
    isVegetarian?: boolean;
    weight?: string;
    allergens?: string;
    note?: string;
}

export const menuCategories = [
    "Polévky",
    "Na chuť",
    "Kuřecí",
    "Vepřové",
    "Hovězí",
    "Speciality",
    "Játra",
    "Čerstvé ryby",
    "Masové směsi",
    "Zeleninové saláty",
    "Bezmasá jídla",
    "Přílohy",
    "Omáčky",
    "Moučníky",
    "Zmrzlinové poháry",
    "Teplé nápoje",
    "Aperitivy",
];

export const menu: MenuItem[] = [
    // Polévky
    {
        id: "polevka-1",
        name: "Hovězí vývar s domácími játrovými knedlíčky a nudlemi",
        price: 59,
        category: "Polévky",
        weight: "0,33l",
        allergens: "1,3,7,9,13",
    },
    {
        id: "polevka-2",
        name: "Další dle denní nabídky",
        price: 0,
        category: "Polévky",
        note: "Cena dle nabídky",
    },

    // Na chuť
    {
        id: "nachut-1",
        name: "Topinka s masovou směsí, vajíčkem a sýrem",
        price: 199,
        category: "Na chuť",
        weight: "1ks",
    },
    {
        id: "nachut-2",
        name: "Čerstvý smažený candát hranolky",
        price: 259,
        category: "Na chuť",
        weight: "200g",
    },
    {
        id: "nachut-3",
        name: "Tatarský biftek, 6 ks topinek, česnek",
        price: 299,
        category: "Na chuť",
        weight: "200g",
    },

    // Kuřecí
    {
        id: "kureci-1",
        name: "Grilovaný kuřecí steak s restovanými fazolkami se slaninou",
        price: 239,
        category: "Kuřecí",
        weight: "200g",
    },
    {
        id: "kureci-2",
        name: "Grilovaná prsíčka plněná šunkou, sýrem, žampiony, kapií",
        price: 239,
        category: "Kuřecí",
        weight: "200g",
    },
    {
        id: "kureci-3",
        name: "Smažená prsíčka plněná šunkou, sýrem, žampiony, kapií",
        price: 239,
        category: "Kuřecí",
        weight: "200g",
    },
    {
        id: "kureci-4",
        name: "Grilovaná prsíčka zapečená hermelínem",
        price: 229,
        category: "Kuřecí",
        weight: "200g",
    },
    {
        id: "kureci-5",
        name: "Čínské biftečky",
        price: 239,
        category: "Kuřecí",
        weight: "200g",
    },

    // Vepřové
    {
        id: "veprove-1",
        name: "Farmářská panenka na grilu s vajíčkem",
        price: 259,
        category: "Vepřové",
        weight: "200g",
    },
    {
        id: "veprove-2",
        name: "Grilovaná panenka plněná hermelínem",
        price: 259,
        category: "Vepřové",
        weight: "200g",
    },
    {
        id: "veprove-3",
        name: "Grilované medailonky z panenky s anglickou slaninou",
        price: 259,
        category: "Vepřové",
        weight: "200g",
    },
    {
        id: "veprove-4",
        name: "Grilovaný steak z krkovičky, restované fazolky se slaninou",
        price: 249,
        category: "Vepřové",
        weight: "200g",
    },
    {
        id: "veprove-5",
        name: "Poctivý smažený řízek z krkovice",
        price: 239,
        category: "Vepřové",
        weight: "200g",
    },

    // Hovězí
    {
        id: "hovezi-1",
        name: "Grilovaný steak z pravé svíčkové, pepřová omáčka, vajíčko",
        price: 389,
        category: "Hovězí",
        weight: "200g",
    },
    {
        id: "hovezi-2",
        name: "Grilovaný steak z vysokého roštěnce, grilovaný chřest",
        price: 289,
        category: "Hovězí",
        weight: "200g",
    },
    {
        id: "hovezi-3",
        name: "Vídeňská rostěná s osmaženou cibulkou",
        price: 279,
        category: "Hovězí",
        weight: "200g",
    },

    // Speciality
    {
        id: "special-1",
        name: "Šimáková kapsa",
        description: "Hovězí roštěná s kuřecím masem plněné šunkou, sýrem, žampiony, kapií, pórkem",
        price: 289,
        category: "Speciality",
        weight: "200g",
    },
    {
        id: "special-2",
        name: "Dračí tlama",
        description: "Hovězí svíčková plněná masovou směsí",
        price: 369,
        category: "Speciality",
        weight: "200g",
    },
    {
        id: "special-3",
        name: "Grilovaná panenka špikovaná hovězí svíčkovou",
        price: 359,
        category: "Speciality",
        weight: "200g",
    },
    {
        id: "special-4",
        name: "Radotínský talíř se třemi druhy masa",
        description: "Kuřecí prso, hovězí roštěná, vepřová kotleta",
        price: 269,
        category: "Speciality",
        weight: "200g",
    },
    {
        id: "special-5",
        name: "Radostínské roládky",
        description: "Plněné tři druhy masa šunkou, sýrem, žampiony, pórkem, paprikou",
        price: 279,
        category: "Speciality",
        weight: "200g",
    },
    {
        id: "special-6",
        name: "Moravská kotleta se žampiony",
        description: "Kotleta zapečená sýrem, šunkou a žampiony",
        price: 269,
        category: "Speciality",
        weight: "200g",
    },
    {
        id: "special-7",
        name: "Šamanovi prsa",
        description: "Grilované kuřecí prsa plněná banánem",
        price: 259,
        category: "Speciality",
        weight: "200g",
    },
    {
        id: "special-8",
        name: "Kuře kamokery",
        description: "Kuřecích a hovězí nudličky se žampiony kapií, oříšky a smetanovo vínovou omáčkou",
        price: 279,
        category: "Speciality",
        weight: "200g",
    },
    {
        id: "special-9",
        name: "Hovězí stroganov",
        description: "Hovězí svíčková s cibulí kyselou okurkou, kapií, žampiony, a smetanovou omáčkou",
        price: 369,
        category: "Speciality",
        weight: "200g",
    },
    {
        id: "special-10",
        name: "Čertovo kuře",
        description: "Kořeněná kuřecí prsa špikované hovězí roštěnou",
        price: 279,
        category: "Speciality",
        weight: "200g",
    },
    {
        id: "special-11",
        name: "Tajemství šéfkuchaře",
        description: "Obalovaný špíz, šunka, vepřové maso, žampiony, sýr",
        price: 269,
        category: "Speciality",
        weight: "200g",
    },
    {
        id: "special-12",
        name: "Malajské kuře",
        description: "Kuřecí prso špikované biftekem, sypané žampiony",
        price: 369,
        category: "Speciality",
        weight: "200g",
    },
    {
        id: "special-13",
        name: "Kuřecí pařížský řízek",
        price: 249,
        category: "Speciality",
        weight: "200g",
    },
    {
        id: "special-14",
        name: "Lomská jednohubka",
        description: "Kuřeci prsa, vepřová kotleta, hovězí roštěná přoložená sýrem, banán",
        price: 259,
        category: "Speciality",
        weight: "200g",
    },

    // Játra
    {
        id: "jatra-1",
        name: "Smažená vepřová játra",
        price: 199,
        category: "Játra",
        weight: "200g",
    },
    {
        id: "jatra-2",
        name: "Grilovaná vepřová játra s cibulí a hořčicí",
        price: 199,
        category: "Játra",
        weight: "200g",
    },

    // Čerstvé ryby
    {
        id: "ryby-1",
        name: "Grilovaný losos s vínovou omáčkou",
        price: 349,
        category: "Čerstvé ryby",
        weight: "200g",
    },
    {
        id: "ryby-2",
        name: "Pomalu pečený pstruh na másle",
        price: 239,
        category: "Čerstvé ryby",
        weight: "200g",
    },
    {
        id: "ryby-3",
        name: "Filet z candáta s variací listových salátu a rajčaty",
        price: 289,
        category: "Čerstvé ryby",
        weight: "200g",
    },

    // Masové směsi
    {
        id: "smesi-1",
        name: "Svratecký guláš z hovězí roštěné",
        price: 249,
        category: "Masové směsi",
        weight: "200g",
    },
    {
        id: "smesi-2",
        name: "Pikantní masová směs",
        price: 229,
        category: "Masové směsi",
        weight: "200g",
    },

    // Zeleninové saláty
    {
        id: "salat-1",
        name: "Směs listových salátů s rajčaty a grilovanou panenkou",
        price: 249,
        category: "Zeleninové saláty",
        weight: "200g",
    },
    {
        id: "salat-2",
        name: "Caesar salát s kuřecím masem, slanina, sýr Gran Moravia",
        price: 259,
        category: "Zeleninové saláty",
        weight: "200g",
    },
    {
        id: "salat-3",
        name: "Šopský salát s balkánským sýrem",
        price: 150,
        category: "Zeleninové saláty",
        weight: "300g",
    },
    {
        id: "salat-4",
        name: "Rajčatový salát s cibulkou",
        price: 80,
        category: "Zeleninové saláty",
        weight: "150g",
    },
    {
        id: "salat-5",
        name: "Okurkový salát",
        price: 80,
        category: "Zeleninové saláty",
        weight: "150g",
    },

    // Bezmasá jídla
    {
        id: "bezmasa-1",
        name: "Smažený sýr (gouda)",
        price: 175,
        category: "Bezmasá jídla",
        weight: "150g",
        isVegetarian: true,
    },
    {
        id: "bezmasa-2",
        name: "Smažený hermelín",
        price: 175,
        category: "Bezmasá jídla",
        weight: "100g",
        isVegetarian: true,
    },
    {
        id: "bezmasa-3",
        name: "Smažené žampiony",
        price: 175,
        category: "Bezmasá jídla",
        weight: "200g",
        isVegetarian: true,
    },
    {
        id: "bezmasa-4",
        name: "Smažené olomoucké tvarůžky",
        price: 175,
        category: "Bezmasá jídla",
        weight: "100g",
        isVegetarian: true,
    },
    {
        id: "bezmasa-5",
        name: "Restovaná brokolice na másle",
        price: 175,
        category: "Bezmasá jídla",
        weight: "200g",
        isVegetarian: true,
    },

    // Přílohy
    {
        id: "priloha-1",
        name: "Smažené hranolky",
        price: 49,
        category: "Přílohy",
        weight: "150g",
    },
    {
        id: "priloha-2",
        name: "Smažené bramborové krokety",
        price: 49,
        category: "Přílohy",
        weight: "150g",
    },
    {
        id: "priloha-3",
        name: "Americké brambory",
        price: 49,
        category: "Přílohy",
        weight: "150g",
    },
    {
        id: "priloha-4",
        name: "Americké brambory s česnekem",
        price: 55,
        category: "Přílohy",
        weight: "150g",
    },
    {
        id: "priloha-5",
        name: "Šťouchané brambory s cibulkou a slaninou",
        price: 55,
        category: "Přílohy",
        weight: "150g",
    },
    {
        id: "priloha-6",
        name: "Domácí bramboráčky",
        price: 49,
        category: "Přílohy",
        weight: "3 ks",
    },
    {
        id: "priloha-7",
        name: "Vařené brambory s máslem",
        price: 45,
        category: "Přílohy",
        weight: "150g",
    },
    {
        id: "priloha-8",
        name: "Pečivo (chléb, rohlík)",
        price: 7,
        category: "Přílohy",
        weight: "1 ks",
    },
    {
        id: "priloha-9",
        name: "Restované fazolky se slaninou",
        price: 55,
        category: "Přílohy",
        weight: "150g",
    },

    // Omáčky
    {
        id: "omacka-1",
        name: "Kečup",
        price: 25,
        category: "Omáčky",
    },
    {
        id: "omacka-2",
        name: "Tatarská omáčka",
        price: 25,
        category: "Omáčky",
    },
    {
        id: "omacka-3",
        name: "Sweet chilli pálivá omáčka",
        price: 40,
        category: "Omáčky",
    },
    {
        id: "omacka-4",
        name: "Pepřová omáčka s barevným pepřem",
        price: 35,
        category: "Omáčky",
    },

    // Moučníky
    {
        id: "moucnik-1",
        name: "Domácí palačinka se zmrzlinou a ovocem a čokoládou",
        price: 155,
        category: "Moučníky",
        weight: "1 ks",
    },
    {
        id: "moucnik-2",
        name: "Rakvička se zmrzlinou, šlehačkou, čokoládou",
        price: 55,
        category: "Moučníky",
        weight: "1 ks",
    },
    {
        id: "moucnik-3",
        name: "Medovník",
        price: 70,
        category: "Moučníky",
        weight: "1 ks",
    },

    // Zmrzlinové poháry
    {
        id: "pohar-1",
        name: "Jožin z bažin",
        description: "ananas, kiwi, griotka",
        price: 120,
        category: "Zmrzlinové poháry",
    },
    {
        id: "pohar-2",
        name: "Jahodový pohár",
        price: 99,
        category: "Zmrzlinové poháry",
    },
    {
        id: "pohar-3",
        name: "Ananasový pohár",
        price: 99,
        category: "Zmrzlinové poháry",
    },
    {
        id: "pohar-4",
        name: "Broskvový pohár",
        price: 99,
        category: "Zmrzlinové poháry",
    },
    {
        id: "pohar-5",
        name: "Mandarinkový pohár",
        price: 99,
        category: "Zmrzlinové poháry",
    },
    {
        id: "pohar-6",
        name: "Míchaný pohár",
        price: 99,
        category: "Zmrzlinové poháry",
    },

    // Teplé nápoje
    {
        id: "napoj-1",
        name: "Turecká káva",
        price: 45,
        category: "Teplé nápoje",
    },
    {
        id: "napoj-2",
        name: "Vídeňská káva",
        price: 55,
        category: "Teplé nápoje",
    },
    {
        id: "napoj-3",
        name: "Instantní káva",
        price: 45,
        category: "Teplé nápoje",
    },
    {
        id: "napoj-4",
        name: "Espresso",
        price: 55,
        category: "Teplé nápoje",
    },
    {
        id: "napoj-5",
        name: "Cappuccino",
        price: 70,
        category: "Teplé nápoje",
    },
    {
        id: "napoj-6",
        name: "Latté",
        price: 70,
        category: "Teplé nápoje",
    },
    {
        id: "napoj-7",
        name: "Čaj",
        price: 40,
        category: "Teplé nápoje",
    },
    {
        id: "napoj-8",
        name: "Grog",
        price: 55,
        category: "Teplé nápoje",
    },

    // Aperitivy
    {
        id: "aperitiv-1",
        name: "Cinzano Bianco",
        price: 60,
        category: "Aperitivy",
        weight: "0,1l",
    },
    {
        id: "aperitiv-2",
        name: "Martini Dry",
        price: 60,
        category: "Aperitivy",
        weight: "0,1l",
    },
    {
        id: "aperitiv-3",
        name: "Metropol Bílý",
        price: 60,
        category: "Aperitivy",
        weight: "0,1l",
    },
    {
        id: "aperitiv-4",
        name: "Campari Bitte",
        price: 60,
        category: "Aperitivy",
        weight: "0,1l",
    },
];

// Poznámka: Za poloviční porce účtujeme 70% z ceny
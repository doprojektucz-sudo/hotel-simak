export interface Drink {
    id: string;
    name: string;
    category: string;
    size?: string;
    price: number;
    description?: string;
}

export const drinkCategories = [
    "Pivo",
    "Nealko",
    "Víno",
    "Teplé nápoje",
    "Aperitivy",
    "Destiláty",
];

export const drinks: Drink[] = [
    // Pivo
    {
        id: "pivo-1",
        name: "Pilsner Urquell",
        category: "Pivo",
        size: "0,5l",
        price: 55,
    },
    {
        id: "pivo-2",
        name: "Bernard",
        category: "Pivo",
        size: "0,5l",
        price: 55,
    },
    {
        id: "pivo-3",
        name: "Radegast",
        category: "Pivo",
        size: "0,5l",
        price: 50,
    },

    // Nealko
    {
        id: "nealko-1",
        name: "Kofola čepovaná",
        category: "Nealko",
        size: "0,5l",
        price: 40,
        description: "Pravá čepovaná Kofola",
    },
    {
        id: "nealko-2",
        name: "Coca-Cola",
        category: "Nealko",
        size: "0,33l",
        price: 45,
    },
    {
        id: "nealko-3",
        name: "Sprite",
        category: "Nealko",
        size: "0,33l",
        price: 45,
    },
    {
        id: "nealko-4",
        name: "Fanta",
        category: "Nealko",
        size: "0,33l",
        price: 45,
    },
    {
        id: "nealko-5",
        name: "Tonic",
        category: "Nealko",
        size: "0,33l",
        price: 45,
    },
    {
        id: "nealko-6",
        name: "Džus pomerančový",
        category: "Nealko",
        size: "0,2l",
        price: 35,
    },
    {
        id: "nealko-7",
        name: "Džus jablečný",
        category: "Nealko",
        size: "0,2l",
        price: 35,
    },
    {
        id: "nealko-8",
        name: "Minerální voda",
        category: "Nealko",
        size: "0,33l",
        price: 30,
    },
    {
        id: "nealko-9",
        name: "Minerální voda",
        category: "Nealko",
        size: "0,75l",
        price: 55,
    },

    // Víno
    {
        id: "vino-1",
        name: "Rulandské bílé",
        category: "Víno",
        size: "0,2l",
        price: 45,
    },
    {
        id: "vino-2",
        name: "Chardonnay",
        category: "Víno",
        size: "0,2l",
        price: 50,
    },
    {
        id: "vino-3",
        name: "Sauvignon",
        category: "Víno",
        size: "0,2l",
        price: 50,
    },
    {
        id: "vino-4",
        name: "Frankovka",
        category: "Víno",
        size: "0,2l",
        price: 45,
    },
    {
        id: "vino-5",
        name: "Modrý Portugal",
        category: "Víno",
        size: "0,2l",
        price: 50,
    },
    {
        id: "vino-6",
        name: "Cabernet Sauvignon",
        category: "Víno",
        size: "0,2l",
        price: 50,
    },
    {
        id: "vino-7",
        name: "Víno sudové bílé",
        category: "Víno",
        size: "0,2l",
        price: 35,
    },
    {
        id: "vino-8",
        name: "Víno sudové červené",
        category: "Víno",
        size: "0,2l",
        price: 35,
    },
    {
        id: "vino-9",
        name: "Víno sudové bílé",
        category: "Víno",
        size: "1l",
        price: 150,
    },
    {
        id: "vino-10",
        name: "Víno sudové červené",
        category: "Víno",
        size: "1l",
        price: 150,
    },

    // Teplé nápoje
    {
        id: "teply-1",
        name: "Turecká káva",
        category: "Teplé nápoje",
        price: 45,
    },
    {
        id: "teply-2",
        name: "Vídeňská káva",
        category: "Teplé nápoje",
        price: 55,
    },
    {
        id: "teply-3",
        name: "Instantní káva",
        category: "Teplé nápoje",
        price: 45,
    },
    {
        id: "teply-4",
        name: "Espresso",
        category: "Teplé nápoje",
        price: 55,
    },
    {
        id: "teply-5",
        name: "Cappuccino",
        category: "Teplé nápoje",
        price: 70,
    },
    {
        id: "teply-6",
        name: "Latté",
        category: "Teplé nápoje",
        price: 70,
    },
    {
        id: "teply-7",
        name: "Čaj",
        category: "Teplé nápoje",
        price: 40,
    },
    {
        id: "teply-8",
        name: "Grog",
        category: "Teplé nápoje",
        price: 55,
    },

    // Aperitivy
    {
        id: "aperitiv-1",
        name: "Cinzano Bianco",
        category: "Aperitivy",
        size: "0,1l",
        price: 60,
    },
    {
        id: "aperitiv-2",
        name: "Martini Dry",
        category: "Aperitivy",
        size: "0,1l",
        price: 60,
    },
    {
        id: "aperitiv-3",
        name: "Metropol Bílý",
        category: "Aperitivy",
        size: "0,1l",
        price: 60,
    },
    {
        id: "aperitiv-4",
        name: "Campari Bitte",
        category: "Aperitivy",
        size: "0,1l",
        price: 60,
    },

    // Destiláty
    {
        id: "destilat-1",
        name: "Becherovka",
        category: "Destiláty",
        size: "0,04l",
        price: 45,
    },
    {
        id: "destilat-2",
        name: "Fernet",
        category: "Destiláty",
        size: "0,04l",
        price: 45,
    },
    {
        id: "destilat-3",
        name: "Slivovice",
        category: "Destiláty",
        size: "0,04l",
        price: 50,
    },
    {
        id: "destilat-4",
        name: "Vodka",
        category: "Destiláty",
        size: "0,04l",
        price: 50,
    },
    {
        id: "destilat-5",
        name: "Rum",
        category: "Destiláty",
        size: "0,04l",
        price: 50,
    },
    {
        id: "destilat-6",
        name: "Whisky",
        category: "Destiláty",
        size: "0,04l",
        price: 60,
    },
    {
        id: "destilat-7",
        name: "Gin",
        category: "Destiláty",
        size: "0,04l",
        price: 55,
    },
];
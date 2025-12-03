export const dishTypes = [
    { value: "SOUP", label: "Polévky" },
    { value: "GAME", label: "Zvěřina" },
    { value: "PORK", label: "Vepřové" },
    { value: "BEEF", label: "Hovězí" },
    { value: "POULTRY", label: "Drůbež" },
    { value: "FISH", label: "Ryby" },
    { value: "MEATLESS", label: "Bezmasá" },
    { value: "SWEET", label: "Sladká" },
    { value: "DESSERT", label: "Dezerty" },
    { value: "DRINK", label: "Nápoje" },
] as const;

export type DishType = (typeof dishTypes)[number]["value"];
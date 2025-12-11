export type RoomType = "deluxe" | "classic";

export interface Room {
    id: string;
    name: string;
    type: RoomType;
    capacity: number;
    price: number;
    features: string[];
    description: string;
    href: string;
}

export const rooms: Room[] = [
    {
        id: "deluxe-double-1",
        name: "Dvoulůžkový pokoj Deluxe",
        type: "deluxe",
        capacity: 2,
        price: 900,
        features: [
            "Vlastní sociální zařízení",
            "Smart-TV",
            "Wi-Fi zdarma",
            "Moderní vybavení"
        ],
        description: "Moderně vybavený dvoulůžkový pokoj s vlastním sociálním zařízením.",
        href: "/images/deluxe-1.webp"
    },
    {
        id: "deluxe-quad-1",
        name: "Čtyřlůžkový pokoj Deluxe",
        type: "deluxe",
        capacity: 4,
        price: 900,
        features: [
            "Vlastní sociální zařízení",
            "Smart-TV",
            "Wi-Fi zdarma",
            "Moderní vybavení"
        ],
        description: "Prostorný moderní čtyřlůžkový pokoj ideální pro rodiny.",
        href: "/images/deluxe-2.webp"
    },
    {
        id: "deluxe-quad-2",
        name: "Čtyřlůžkový pokoj Deluxe",
        type: "deluxe",
        capacity: 4,
        price: 900,
        features: [
            "Vlastní sociální zařízení",
            "Smart-TV",
            "Wi-Fi zdarma",
            "Moderní vybavení",
            "Prostorný pokoj"
        ],
        description: "Prostorný moderní čtyřlůžkový pokoj ideální pro rodiny.",
        href: "/images/deluxe-3.webp"
    },
    {
        id: "classic-double",
        name: "Dvoulůžkový pokoj Klasik",
        type: "classic",
        capacity: 2,
        price: 700,
        features: [
            "Vlastní sociální zařízení",
            "TV",
            "Wi-Fi zdarma"
        ],
        description: "Útulný dvoulůžkový pokoj s klasickým vybavením.",
        href: "/images/klasik-1.webp"
    },
    {
        id: "classic-double-1",
        name: "Dvoulůžkový pokoj Klasik",
        type: "classic",
        capacity: 2,
        price: 700,
        features: [
            "Vlastní sociální zařízení",
            "TV",
            "Wi-Fi zdarma"
        ],
        description: "Útulný dvoulůžkový pokoj s klasickým vybavením.",
        href: "/images/klasik-2.webp"
    },
    {
        id: "classic-quad",
        name: "Čtyřlůžkový pokoj Klasik",
        type: "classic",
        capacity: 4,
        price: 700,
        features: [
            "Vlastní sociální zařízení",
            "TV",
            "Wi-Fi zdarma"
        ],
        description: "Prostorný klasický pokoj pro rodiny nebo skupiny přátel.",
        href: "/images/klasik-3.webp"
    }
];

export const accommodationInfo = {
    checkIn: "14:00",
    checkOut: "10:00",
    recreationFee: 25,
    recreationFeeNote: "Rekreační poplatek 25 Kč/osoba/den"
};
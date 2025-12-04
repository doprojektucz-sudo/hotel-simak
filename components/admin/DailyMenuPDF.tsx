import React from "react";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Image,
    Font,
} from "@react-pdf/renderer";

// Registrace fontu pro české znaky
Font.register({
    family: "Roboto",
    fonts: [
        {
            src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
            fontWeight: 400,
        },
        {
            src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
            fontWeight: 700,
        },
    ],
});

// Barvy z globals.css
const colors = {
    primary: {
        50: "#fefbf3",
        100: "#fdf6e3",
        200: "#faecc4",
        300: "#f5dc9a",
        400: "#efc76b",
        500: "#c9a547",
        600: "#b8943d",
        700: "#997a33",
        800: "#7d632e",
        900: "#685229",
    },
    secondary: {
        50: "#f7f5f4",
        100: "#ede8e6",
        200: "#ddd4cf",
        300: "#c5b5ad",
        400: "#a89388",
        500: "#8b7669",
        600: "#6d5e54",
        700: "#5a4d45",
        800: "#4c413b",
        900: "#3f3632",
    },
    gray: {
        50: "#f9fafb",
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827",
    },
};

interface DailyMenuDish {
    id: string;
    name: string;
    weight: string | null;
    price: number;
}

interface DishType {
    value: string;
    label: string;
    dishes: DailyMenuDish[];
}

interface DailyMenuPDFProps {
    title: string;
    dateText: string;
    dishesByType: DishType[];
    totalItems: number;
    logoUrl: string;
}

// Dynamické styly podle počtu položek
const getStyles = (totalItems: number) => {
    // Základní velikosti
    let titleSize = 24;
    let dateSize = 14;
    let categorySize = 11;
    let dishSize = 10;
    let priceSize = 10;
    let spacing = 12;
    let dishSpacing = 6;
    let categorySpacing = 14;
    let logoHeight = 60;
    let headerMargin = 20;

    // Zmenšení při větším počtu položek
    if (totalItems > 15) {
        titleSize = 20;
        dateSize = 12;
        categorySize = 10;
        dishSize = 9;
        priceSize = 9;
        spacing = 8;
        dishSpacing = 4;
        categorySpacing = 10;
        logoHeight = 50;
        headerMargin = 15;
    }

    if (totalItems > 25) {
        titleSize = 18;
        dateSize = 11;
        categorySize = 9;
        dishSize = 8;
        priceSize = 8;
        spacing = 6;
        dishSpacing = 3;
        categorySpacing = 8;
        logoHeight = 40;
        headerMargin = 10;
    }

    if (totalItems > 35) {
        titleSize = 16;
        dateSize = 10;
        categorySize = 8;
        dishSize = 7;
        priceSize = 7;
        spacing = 4;
        dishSpacing = 2;
        categorySpacing = 6;
        logoHeight = 35;
        headerMargin = 8;
    }

    return StyleSheet.create({
        page: {
            padding: 30,
            fontFamily: "Roboto",
            backgroundColor: "#ffffff",
        },
        header: {
            alignItems: "center",
            marginBottom: headerMargin,
            paddingBottom: spacing,
            borderBottomWidth: 2,
            borderBottomColor: colors.primary[600],
        },
        logo: {
            height: logoHeight,
            marginBottom: spacing,
        },
        title: {
            fontSize: titleSize,
            fontWeight: 700,
            color: colors.secondary[800],
            marginBottom: 4,
        },
        date: {
            fontSize: dateSize,
            color: colors.secondary[600],
            textTransform: "capitalize",
        },
        category: {
            marginBottom: categorySpacing,
        },
        categoryTitle: {
            fontSize: categorySize,
            fontWeight: 700,
            color: colors.primary[700],
            textTransform: "uppercase",
            letterSpacing: 1,
            marginBottom: dishSpacing,
            paddingBottom: 3,
            borderBottomWidth: 1,
            borderBottomColor: colors.primary[200],
        },
        dish: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            paddingVertical: dishSpacing,
            borderBottomWidth: 1,
            borderBottomColor: colors.gray[100],
            borderBottomStyle: "dotted",
        },
        dishLast: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            paddingVertical: dishSpacing,
            borderBottomWidth: 0,
        },
        dishInfo: {
            flex: 1,
            flexDirection: "row",
            paddingRight: 10,
        },
        dishWeight: {
            fontSize: dishSize,
            fontWeight: 700,
            color: colors.secondary[700],
            marginRight: 6,
        },
        dishName: {
            fontSize: dishSize,
            color: colors.secondary[800],
            flex: 1,
        },
        dishPrice: {
            fontSize: priceSize,
            fontWeight: 700,
            color: colors.primary[700],
        },
        footer: {
            marginTop: "auto",
            paddingTop: spacing,
            borderTopWidth: 1,
            borderTopColor: colors.primary[200],
            alignItems: "center",
        },
        footerText: {
            fontSize: 9,
            color: colors.secondary[600],
            marginBottom: 2,
        },
        footerContact: {
            fontSize: 8,
            color: colors.secondary[500],
        },
    });
};

export function DailyMenuPDF({
    title,
    dateText,
    dishesByType,
    totalItems,
    logoUrl,
}: DailyMenuPDFProps) {
    const styles = getStyles(totalItems);

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header s logem */}
                <View style={styles.header}>
                    <Image src={logoUrl} style={styles.logo} />
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.date}>{dateText}</Text>
                </View>

                {/* Kategorie a jídla */}
                {dishesByType.map((type) => (
                    <View key={type.value} style={styles.category}>
                        <Text style={styles.categoryTitle}>{type.label}</Text>
                        {type.dishes.map((dish, index) => {
                            const isLast = index === type.dishes.length - 1;
                            return (
                                <View
                                    key={dish.id}
                                    style={isLast ? styles.dishLast : styles.dish}
                                >
                                    <View style={styles.dishInfo}>
                                        {dish.weight && (
                                            <Text style={styles.dishWeight}>{dish.weight}</Text>
                                        )}
                                        <Text style={styles.dishName}>{dish.name}</Text>
                                    </View>
                                    <Text style={styles.dishPrice}>{dish.price},- Kč</Text>
                                </View>
                            );
                        })}
                    </View>
                ))}

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Přejeme dobrou chuť!</Text>
                    <Text style={styles.footerContact}>
                        Restaurace a Hotel U Šimáka | Tel: 728 490 498 | www.hotelusimaka.cz
                    </Text>
                </View>
            </Page>
        </Document>
    );
}
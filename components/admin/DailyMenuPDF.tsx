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

// Barvy optimalizované pro černobílý tisk
const colors = {
    black: "#000000",
    darkGray: "#333333",
    mediumGray: "#666666",
    lightGray: "#999999",
    lineGray: "#CCCCCC",
    dotGray: "#AAAAAA",
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

// Dynamické styly podle počtu položek - zvětšené pro lepší čitelnost
const getStyles = (totalItems: number) => {
    // Základní velikosti - kompaktní header, čitelné položky
    let titleSize = 24;
    let dateSize = 13;
    let categorySize = 14;
    let dishSize = 12;
    let priceSize = 12;
    let weightSize = 12;
    let spacing = 14;
    let dishSpacing = 7;
    let categorySpacing = 16;
    let logoHeight = 55;
    let headerMargin = 14;

    // Zmenšení při větším počtu položek
    if (totalItems > 15) {
        titleSize = 22;
        dateSize = 12;
        categorySize = 13;
        dishSize = 11;
        priceSize = 11;
        weightSize = 11;
        spacing = 12;
        dishSpacing = 6;
        categorySpacing = 14;
        logoHeight = 50;
        headerMargin = 12;
    }

    if (totalItems > 25) {
        titleSize = 20;
        dateSize = 11;
        categorySize = 12;
        dishSize = 10;
        priceSize = 10;
        weightSize = 10;
        spacing = 10;
        dishSpacing = 5;
        categorySpacing = 12;
        logoHeight = 45;
        headerMargin = 10;
    }

    if (totalItems > 35) {
        titleSize = 18;
        dateSize = 10;
        categorySize = 11;
        dishSize = 9;
        priceSize = 9;
        weightSize = 9;
        spacing = 8;
        dishSpacing = 4;
        categorySpacing = 10;
        logoHeight = 40;
        headerMargin = 8;
    }

    return StyleSheet.create({
        page: {
            padding: 30,
            paddingTop: 25,
            fontFamily: "Roboto",
            backgroundColor: "#ffffff",
        },
        header: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: headerMargin,
            paddingBottom: spacing - 4,
            borderBottomWidth: 2,
            borderBottomColor: colors.black,
        },
        logo: {
            height: logoHeight,
        },
        headerTextContainer: {
            flex: 1,
            alignItems: "flex-end",
            paddingLeft: 15,
        },
        title: {
            fontSize: titleSize,
            fontWeight: 700,
            color: colors.black,
            marginBottom: 2,
            letterSpacing: 0.5,
            textAlign: "right",
        },
        date: {
            fontSize: dateSize,
            fontWeight: 700,
            color: colors.darkGray,
            textTransform: "capitalize",
            textAlign: "right",
        },
        category: {
            marginBottom: categorySpacing,
        },
        categoryTitle: {
            fontSize: categorySize,
            fontWeight: 700,
            color: colors.black,
            textTransform: "uppercase",
            letterSpacing: 1.5,
            marginBottom: dishSpacing + 2,
            paddingBottom: 4,
            borderBottomWidth: 2,
            borderBottomColor: colors.black,
        },
        dish: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            paddingVertical: dishSpacing,
            borderBottomWidth: 1,
            borderBottomColor: colors.dotGray,
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
            paddingRight: 15,
        },
        dishWeight: {
            fontSize: weightSize,
            fontWeight: 700,
            color: colors.darkGray,
            marginRight: 8,
            minWidth: 35,
        },
        dishName: {
            fontSize: dishSize,
            color: colors.black,
            flex: 1,
            lineHeight: 1.3,
        },
        dishPrice: {
            fontSize: priceSize,
            fontWeight: 700,
            color: colors.black,
            minWidth: 55,
            textAlign: "right",
        },
        footer: {
            marginTop: "auto",
            paddingTop: 8,
            borderTopWidth: 1,
            borderTopColor: colors.black,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        footerText: {
            fontSize: 10,
            fontWeight: 700,
            color: colors.darkGray,
        },
        footerContact: {
            fontSize: 9,
            color: colors.mediumGray,
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
                {/* Header - kompaktní, logo vlevo, text vpravo */}
                <View style={styles.header}>
                    <Image src={logoUrl} style={styles.logo} />
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.date}>{dateText}</Text>
                    </View>
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

                {/* Footer - kompaktní na jeden řádek */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Přejeme dobrou chuť!</Text>
                    <Text style={styles.footerContact}>
                        Tel: 728 490 498 | www.usimaka.cz
                    </Text>
                </View>
            </Page>
        </Document>
    );
}
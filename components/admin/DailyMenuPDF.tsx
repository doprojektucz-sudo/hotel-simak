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

// Výpočet "hustoty" obsahu - kombinuje počet položek a kategorií
const calculateContentDensity = (totalItems: number, categoryCount: number) => {
    // Každá kategorie zabírá extra místo (nadpis + odsazení)
    const effectiveItems = totalItems + categoryCount * 2;
    return effectiveItems;
};

// Dynamické styly podle obsahu
const getStyles = (totalItems: number, categoryCount: number) => {
    const density = calculateContentDensity(totalItems, categoryCount);

    type ScaleLevel = {
        maxDensity: number;
        // Fonty - header se může zmenšovat, jídla zůstávají čitelná
        title: number;
        date: number;
        category: number;
        dish: number;
        price: number;
        weight: number;
        // Vertikální spacing - hlavní úspora místa
        logoHeight: number;
        pageTopPadding: number;
        pageSidePadding: number;
        headerMargin: number;
        headerPadding: number;
        categoryMargin: number;
        categoryTitleMargin: number;
        categoryTitlePadding: number;
        dishPadding: number;
        footerPadding: number;
        footerFontSize: number;
        lineHeight: number;
    };

    const scales: ScaleLevel[] = [
        {
            // Úroveň 1: Velmi málo položek (do 12 efektivních)
            maxDensity: 12,
            title: 26,
            date: 14,
            category: 14,
            dish: 12,
            price: 12,
            weight: 12,
            logoHeight: 55,
            pageTopPadding: 30,
            pageSidePadding: 35,
            headerMargin: 16,
            headerPadding: 12,
            categoryMargin: 16,
            categoryTitleMargin: 8,
            categoryTitlePadding: 5,
            dishPadding: 7,
            footerPadding: 10,
            footerFontSize: 10,
            lineHeight: 1.35,
        },
        {
            // Úroveň 2: Málo položek (do 18)
            maxDensity: 18,
            title: 24,
            date: 13,
            category: 13,
            dish: 12,
            price: 12,
            weight: 12,
            logoHeight: 50,
            pageTopPadding: 25,
            pageSidePadding: 32,
            headerMargin: 12,
            headerPadding: 10,
            categoryMargin: 12,
            categoryTitleMargin: 6,
            categoryTitlePadding: 4,
            dishPadding: 5,
            footerPadding: 8,
            footerFontSize: 10,
            lineHeight: 1.3,
        },
        {
            // Úroveň 3: Střední počet (do 25)
            maxDensity: 25,
            title: 22,
            date: 12,
            category: 12,
            dish: 11,
            price: 11,
            weight: 11,
            logoHeight: 45,
            pageTopPadding: 22,
            pageSidePadding: 30,
            headerMargin: 10,
            headerPadding: 8,
            categoryMargin: 9,
            categoryTitleMargin: 5,
            categoryTitlePadding: 3,
            dishPadding: 4,
            footerPadding: 6,
            footerFontSize: 9,
            lineHeight: 1.25,
        },
        {
            // Úroveň 4: Více položek (do 32)
            maxDensity: 32,
            title: 20,
            date: 11,
            category: 11,
            dish: 11,
            price: 11,
            weight: 11,
            logoHeight: 40,
            pageTopPadding: 18,
            pageSidePadding: 28,
            headerMargin: 8,
            headerPadding: 6,
            categoryMargin: 7,
            categoryTitleMargin: 4,
            categoryTitlePadding: 2,
            dishPadding: 3,
            footerPadding: 5,
            footerFontSize: 9,
            lineHeight: 1.2,
        },
        {
            // Úroveň 5: Hodně položek (do 40)
            maxDensity: 40,
            title: 18,
            date: 10,
            category: 10,
            dish: 10,
            price: 10,
            weight: 10,
            logoHeight: 35,
            pageTopPadding: 15,
            pageSidePadding: 25,
            headerMargin: 6,
            headerPadding: 5,
            categoryMargin: 5,
            categoryTitleMargin: 3,
            categoryTitlePadding: 2,
            dishPadding: 2.5,
            footerPadding: 4,
            footerFontSize: 8,
            lineHeight: 1.15,
        },
        {
            // Úroveň 6: Velmi hodně položek (do 50)
            maxDensity: 50,
            title: 16,
            date: 9,
            category: 10,
            dish: 10,
            price: 10,
            weight: 10,
            logoHeight: 32,
            pageTopPadding: 12,
            pageSidePadding: 22,
            headerMargin: 5,
            headerPadding: 4,
            categoryMargin: 4,
            categoryTitleMargin: 2,
            categoryTitlePadding: 1,
            dishPadding: 2,
            footerPadding: 3,
            footerFontSize: 8,
            lineHeight: 1.1,
        },
        {
            // Úroveň 7: Extrémní počet (nad 50)
            maxDensity: Infinity,
            title: 14,
            date: 8,
            category: 9,
            dish: 9,
            price: 9,
            weight: 9,
            logoHeight: 28,
            pageTopPadding: 10,
            pageSidePadding: 20,
            headerMargin: 4,
            headerPadding: 3,
            categoryMargin: 3,
            categoryTitleMargin: 1,
            categoryTitlePadding: 1,
            dishPadding: 1.5,
            footerPadding: 2,
            footerFontSize: 7,
            lineHeight: 1.05,
        },
    ];

    // Najdi správnou úroveň škálování
    const scale = scales.find((s) => density <= s.maxDensity) || scales[scales.length - 1];

    return StyleSheet.create({
        page: {
            paddingTop: scale.pageTopPadding,
            paddingBottom: scale.pageTopPadding,
            paddingHorizontal: scale.pageSidePadding,
            fontFamily: "Roboto",
            backgroundColor: "#ffffff",
        },
        header: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: scale.headerMargin,
            paddingBottom: scale.headerPadding,
            borderBottomWidth: 2,
            borderBottomColor: colors.black,
        },
        logo: {
            height: scale.logoHeight,
        },
        headerTextContainer: {
            flex: 1,
            alignItems: "flex-end",
            paddingLeft: 15,
        },
        title: {
            fontSize: scale.title,
            fontWeight: 700,
            color: colors.black,
            marginBottom: 1,
            letterSpacing: 0.5,
            textAlign: "right",
        },
        date: {
            fontSize: scale.date,
            fontWeight: 700,
            color: colors.darkGray,
            textTransform: "capitalize",
            textAlign: "right",
        },
        category: {
            marginBottom: scale.categoryMargin,
        },
        categoryTitle: {
            fontSize: scale.category,
            fontWeight: 700,
            color: colors.black,
            textTransform: "uppercase",
            letterSpacing: 1,
            marginBottom: scale.categoryTitleMargin,
            paddingBottom: scale.categoryTitlePadding,
            borderBottomWidth: 1.5,
            borderBottomColor: colors.black,
        },
        dish: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            paddingVertical: scale.dishPadding,
            borderBottomWidth: 0.5,
            borderBottomColor: colors.dotGray,
            borderBottomStyle: "dotted",
        },
        dishLast: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            paddingVertical: scale.dishPadding,
            borderBottomWidth: 0,
        },
        dishInfo: {
            flex: 1,
            flexDirection: "row",
            paddingRight: 10,
        },
        dishWeight: {
            fontSize: scale.weight,
            fontWeight: 700,
            color: colors.darkGray,
            marginRight: 6,
            minWidth: 32,
        },
        dishName: {
            fontSize: scale.dish,
            color: colors.black,
            flex: 1,
            lineHeight: scale.lineHeight,
        },
        dishPrice: {
            fontSize: scale.price,
            fontWeight: 700,
            color: colors.black,
            minWidth: 50,
            textAlign: "right",
        },
        footer: {
            marginTop: "auto",
            paddingTop: scale.footerPadding,
            borderTopWidth: 1,
            borderTopColor: colors.black,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        footerText: {
            fontSize: scale.footerFontSize,
            fontWeight: 700,
            color: colors.darkGray,
        },
        footerContact: {
            fontSize: scale.footerFontSize - 1,
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
    const categoryCount = dishesByType.length;
    const styles = getStyles(totalItems, categoryCount);

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Image style={styles.logo} src={logoUrl} />
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

                {/* Footer */}
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
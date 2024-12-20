
import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

// TypeScript types
interface CardProps {
    item: { src: string; title: string; category?: string };
    theme: "light" | "dark";
}

interface CardsCarouselDemoProps {
    data: Array<{ src: string; title: string; category?: string }>;
    theme?: "light" | "dark";
    autoAnimateInterval?: number;
}

// Carousel Card
const Card: React.FC<CardProps> = ({ item, theme }) => {
    return (
        <View style={[styles.card, theme === "dark" ? styles.cardDark : styles.cardLight]}>
            <Image source={{ uri: item.src }} style={styles.cardImage} />
            <Text style={[styles.cardTitle, theme === "dark" ? styles.textDark : styles.textLight]}>
                {item.title}
            </Text>
        </View>
    );
};

// Main Carousel Component
export const CardsCarouselDemo: React.FC<CardsCarouselDemoProps> = ({
                                                                        data,
                                                                        theme = "light",
                                                                        autoAnimateInterval = 3000,
                                                                    }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-animate the index
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex < data.length - 1 ? prevIndex + 1 : 0
            );
        }, autoAnimateInterval);

        return () => clearInterval(interval);
    }, [autoAnimateInterval, data.length]);

    const renderItem = ({ item }: { item: { src: string; title: string; category?: string } }) => (
        <Card item={item} theme={theme} />
    );

    return (
        <View style={[styles.carouselContainer, theme === "dark" ? styles.carouselDark : styles.carouselLight]}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => `${item.category ?? "item"}-${index}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                initialScrollIndex={currentIndex} // Set initial index
            />
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    carouselContainer: {
        flex: 1,
        paddingVertical: 20,
    },
    carouselLight: {},
    carouselDark: {
        backgroundColor: "#333",
    },
    card: {
        width: width * 0.8,
        marginHorizontal: 10,
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
    },
    cardImage: {
        width: "100%",
        height: 200,
        borderRadius: 20,
        marginBottom: 15,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 10,
    },
    cardLight: {
        backgroundColor: "#f5f5f7",
    },
    cardDark: {
        backgroundColor: "#555",
    },
    textLight: {
        color: "#333",
    },
    textDark: {
        color: "#fff",
    },
});

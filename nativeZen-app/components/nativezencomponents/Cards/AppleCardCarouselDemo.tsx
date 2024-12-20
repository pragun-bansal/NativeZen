// import React, { useEffect, useState } from "react";
// import { View, Text, Image, FlatList, StyleSheet, Dimensions, TextStyle } from "react-native";
//
// const { width } = Dimensions.get("window");
//
// // TypeScript types
// interface CardProps {
//     item: { src: string; title: string; category?: string };
//     height: number; // Height for both card and image
//     cardTitleStyle?: TextStyle; // Optional prop for custom title styles
//     cardCategoryStyle?: TextStyle; // Optional prop for custom category styles
// }
//
// interface AppleCardsCarouselDemoProps {
//     data: Array<{ src: string; title: string; category?: string }>;
//     autoAnimateInterval?: number;
//     height: number; // Height for both card and image
//     cardTitleStyle?: TextStyle; // Optional prop for default title styles
//     cardCategoryStyle?: TextStyle; // Optional prop for default category styles
// }
//
// // Carousel Card
// const Card: React.FC<CardProps> = ({ item, height, cardTitleStyle, cardCategoryStyle }) => {
//     return (
//         <View style={[styles.card, styles.cardDark, { height }]}>
//             <Image source={{ uri: item.src }} style={[styles.cardImage, { height }]} />
//             <Text style={[styles.cardCategory, cardCategoryStyle || styles.defaultCardCategory]}>
//                 {item.category}
//             </Text>
//             <Text style={[styles.cardTitle, cardTitleStyle || styles.defaultCardTitle]}>
//                 {item.title}
//             </Text>
//         </View>
//     );
// };
//
// // Main Carousel Component
// export const AppleCardsCarouselDemo: React.FC<AppleCardsCarouselDemoProps> = ({
//                                                                                   height,
//                                                                                   data,
//                                                                                   autoAnimateInterval = 3000,
//                                                                                   cardTitleStyle,
//                                                                                   cardCategoryStyle,
//                                                                               }) => {
//     const [currentIndex, setCurrentIndex] = useState(0);
//
//     // Auto-animate the index
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentIndex((prevIndex) =>
//                 prevIndex < data.length - 1 ? prevIndex + 1 : 0
//             );
//         }, autoAnimateInterval);
//
//         return () => clearInterval(interval);
//     }, [autoAnimateInterval, data.length]);
//
//     const renderItem = ({ item }: { item: { src: string; title: string; category?: string } }) => (
//         <Card
//             item={item}
//             height={height}
//             cardTitleStyle={cardTitleStyle}
//             cardCategoryStyle={cardCategoryStyle}
//         />
//     );
//
//     return (
//         <View style={styles.carouselContainer}>
//             <FlatList
//                 data={data}
//                 renderItem={renderItem}
//                 keyExtractor={(item, index) => `${item.category}-${index}`}
//                 horizontal
//                 showsHorizontalScrollIndicator={false}
//                 pagingEnabled
//                 initialScrollIndex={currentIndex} // Set initial index
//             />
//         </View>
//     );
// };
//
// // Styles
// const styles = StyleSheet.create({
//     carouselContainer: {
//         flex: 1,
//         paddingVertical: 20,
//     },
//     card: {
//         width: width * 0.8,
//         marginHorizontal: 10,
//         borderRadius: 20,
//         overflow: "hidden",  // Ensure full image coverage and text overlay
//         alignItems: "center",
//     },
//     cardImage: {
//         width: "100%",
//         position: "absolute",  // Ensures image covers entire card
//         top: 0,
//         left: 0,
//     },
//     cardCategory: {
//         position: "absolute", // Position text on top of the image
//         top: 20,
//         left: 20,
//         fontSize: 18,
//         fontWeight: "bold",
//         color: "#fff", // Light text color for dark theme
//     },
//     cardTitle: {
//         position: "absolute", // Position text on top of the image
//         top: 40,
//         left: 20,
//         fontSize: 18,
//         fontWeight: "bold",
//         color: "#fff", // Light text color for dark theme
//     },
//     cardDark: {
//         backgroundColor: "#555", // Dark background for card
//     },
//     defaultCardCategory: {
//         color: "#fff", // Default text style for card category
//     },
//     defaultCardTitle: {
//         color: "#fff", // Default text style for card title
//     },
// });
import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Dimensions, TextStyle } from 'react-native';

const { width } = Dimensions.get('window');

// TypeScript types
interface CardProps {
    item: { src: string; title: string; category?: string };
    height: number; // Height for both card and image
    cardTitleStyle?: TextStyle; // Optional prop for custom title styles
    cardCategoryStyle?: TextStyle; // Optional prop for custom category styles
}

interface AppleCardsCarouselDemoProps {
    data: Array<{ src: string; title: string; category?: string }>;
    autoAnimateInterval?: number;
    height: number; // Height for both card and image
    theme: 'light' | 'dark';
    cardWidth?: number; // Optional width of the card
    gap?: number; // Optional gap between cards
    cardTitleStyle?: TextStyle; // Optional prop for default title styles
    cardCategoryStyle?: TextStyle; // Optional prop for default category styles
}

// Carousel Card
const Card: React.FC<CardProps> = ({ item, height, cardTitleStyle, cardCategoryStyle }) => {
    return (
        <View style={[styles.card, styles.cardDark, { height }]}>
            <Image source={{ uri: item.src }} style={[styles.cardImage, { height }]} />
            <Text style={[styles.cardCategory, cardCategoryStyle || styles.defaultCardCategory]}>
                {item.category}
            </Text>
            <Text style={[styles.cardTitle, cardTitleStyle || styles.defaultCardTitle]}>{item.title}</Text>
        </View>
    );
};

// Main Carousel Component
export const AppleCardsCarouselDemo: React.FC<AppleCardsCarouselDemoProps> = ({
                                                                                  height,
                                                                                  data,
                                                                                  autoAnimateInterval = 3000,
                                                                                  theme = 'dark',
                                                                                  cardWidth = width * 0.8, // Default card width as 80% of the screen width
                                                                                  gap = 10, // Default gap between cards
                                                                                  cardTitleStyle,
                                                                                  cardCategoryStyle,
                                                                              }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Calculate the card width with gap
    const itemWidth = width/2;

    // Auto-animate the index
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setCurrentIndex((prevIndex) =>
    //             prevIndex < data.length - 1 ? prevIndex + 1 : 0
    //         );
    //     }, autoAnimateInterval);
    //
    //     return () => clearInterval(interval);
    // }, [autoAnimateInterval, data.length]);

    const renderItem = ({ item }: { item: { src: string; title: string; category?: string } }) => (
        <Card item={item} height={height} cardTitleStyle={cardTitleStyle} cardCategoryStyle={cardCategoryStyle} />
    );

    return (
        <View style={styles.carouselContainer}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => `${item.category}-${index}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                initialScrollIndex={currentIndex}
                getItemLayout={(data, index) => ({
                    length: itemWidth,
                    offset: itemWidth * index,
                    index,
                })}
                contentContainerStyle={{ paddingHorizontal: gap / 2 }} // Centering the items within the gap
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
    card: {
        width: Dimensions.get('window').width * 0.8,
        marginHorizontal: 10,
        borderRadius: 20,
        overflow: 'hidden',
        alignItems: 'center',
    },
    cardImage: {
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    cardCategory: {
        position: 'absolute',
        top: 20,
        left: 20,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    cardTitle: {
        position: 'absolute',
        top: 40,
        left: 20,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    cardDark: {
        backgroundColor: '#555',
    },
    defaultCardCategory: {
        color: '#fff',
    },
    defaultCardTitle: {
        color: '#fff',
    },
});

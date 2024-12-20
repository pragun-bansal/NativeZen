import React, { useState, useRef } from 'react';
import { View, Text, Image, Animated, TouchableWithoutFeedback, Dimensions, StyleSheet, TextStyle } from 'react-native';

const { width } = Dimensions.get('window');

interface CardProps {
    item: { src: string; title: string; category?: string; header?: string; pfp?: string };
    height: number;
    cardTitleStyle?: TextStyle;
    cardCategoryStyle?: TextStyle;
}

const OverlayCard: React.FC<CardProps> = ({ item, height, cardTitleStyle, cardCategoryStyle }) => {
    const [isPressed, setIsPressed] = useState(false);
    const shadowOpacity = useRef(new Animated.Value(0.5)).current;
    const imageOpacity = useRef(new Animated.Value(1)).current;
    const footerTranslateY = useRef(new Animated.Value(height)).current;

    const handlePress = () => {
        if (isPressed) {
            Animated.parallel([
                Animated.timing(shadowOpacity, {
                    toValue: 0.5,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(imageOpacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(footerTranslateY, {
                    toValue: height,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(shadowOpacity, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(imageOpacity, {
                    toValue: 0.5,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(footerTranslateY, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        }
        setIsPressed(!isPressed);
    };

    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <Animated.View style={[styles.card, { height, shadowOpacity }]}>
                <Animated.Image
                    source={{ uri: item.src }}
                    style={[styles.cardImage, { height, opacity: imageOpacity }]}
                    blurRadius={isPressed ? 10 : 0}
                />
                <View style={styles.header}>
                    <Image source={{ uri: item.pfp }} style={styles.cardPfp} />
                    <Text style={styles.headerText}>{item.header}</Text>
                </View>
                <Animated.View style={[styles.footer, { transform: [{ translateY: footerTranslateY }] }]}>
                    <Text style={[styles.cardCategory, cardCategoryStyle || styles.defaultCardCategory]}>{item.category}</Text>
                    <Text style={[styles.cardTitle, cardTitleStyle || styles.defaultCardTitle]}>{item.title}</Text>
                </Animated.View>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};

export default OverlayCard;

const styles = StyleSheet.create({
    card: {
        width: width * 0.8,
        marginHorizontal: 10,
        borderRadius: 20,
        overflow: 'hidden',
        alignItems: 'center',
        backgroundColor: 'black',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    cardImage: {
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,
    },
    header: {
        position: 'absolute',
        top: 20,
        left: 10,
        flexDirection: 'row',
    },
    cardPfp: {
        height: 30,
        width: 30,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#fff',
    },
    headerText: {
        paddingVertical: 3,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardCategory: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    defaultCardCategory: {
        color: '#fff',
    },
    defaultCardTitle: {
        color: '#fff',
    },
});
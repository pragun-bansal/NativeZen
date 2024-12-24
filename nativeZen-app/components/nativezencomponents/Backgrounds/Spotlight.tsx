import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Defs, Filter, G, Ellipse, FeGaussianBlur, FeFlood, FeBlend } from "react-native-svg";
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, interpolate } from "react-native-reanimated";

export const Spotlight = ({ animatedStyle }) => {
    return (
        <Animated.View style={[styles.spotlightContainer, animatedStyle]}>
            <Svg style={styles.svg} viewBox="0 0 3787 2842" fill="none">
                <Defs>
                    <Filter id="filter" x="0" y="0" width="5000" height="5000" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <FeFlood floodOpacity="0" result="BackgroundImageFix" />
                        <FeBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                        <FeGaussianBlur stdDeviation="20" result="effect1_foregroundBlur" />
                    </Filter>
                </Defs>
                <G filter="url(#filter)">
                    <Ellipse
                        cx="924.71"
                        cy="421"
                        rx="2000"
                        ry="400"
                        transform="rotate(35 924.71 -100)"
                        fill="white"
                        fillOpacity="0.5"
                    />
                </G>
            </Svg>
        </Animated.View>
    );
};

export const SpotlightPreview = ({width=300,height=300}) => {
    const animation = useSharedValue(-200);

    useEffect(() => {
        animation.value = withRepeat(
            withTiming(200, { duration: 2000 }),
            -1,
            true
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(animation.value, [-200, 200], [0, 0.5]),
        };
    });

    return (
        <View style={styles.container}>
            <Spotlight animatedStyle={animatedStyle} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>Spotlight{"\n"}is the new trend.</Text>
                <Text style={styles.description}>
                    Spotlight effect is a great way to draw attention to a specific part of the page. Here, we are drawing the attention towards
                    the text section of the page.
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width:300,
        height:300,
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.96)",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    spotlightContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    svg: {
        width: 500,
        height: 500,
    },
    textContainer: {
        zIndex: 10,
        alignItems: "center",
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        color: "#FFFFFF",
        backgroundColor: "transparent",
    },
    description: {
        marginTop: 12,
        fontSize: 16,
        textAlign: "center",
        color: "#AAAAAA",
        maxWidth: 300,
    },
});

export default SpotlightPreview;

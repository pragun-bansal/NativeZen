import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Svg, { Circle } from "react-native-svg";
import GradientText from "@/components/nativezencomponents/GradientText";

// Get screen dimensions
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function GridDotsBackgrond({ width = screenWidth, height = screenHeight, text = "Backgrounds", gap = 20 }) {
    const centerX = width / 2;
    const centerY = height / 2;

    // Function to calculate color based on distance from center
    function calculateColor(distance) {
        const maxDistance = Math.sqrt(centerX ** 2 + centerY ** 2); // Maximum possible distance
        const normalizedDistance = distance / maxDistance; // Normalize distance to a range of 0 to 1

        // Interpolate RGB values based on the normalized distance
        const r = Math.round(81 - (81) * (normalizedDistance ));
        const g = Math.round(81 - (81) * (normalizedDistance ));
        const b = Math.round(81 - (81) * (normalizedDistance ));

        const opacity = 0.8 - normalizedDistance; // Quadratic falloff for smoother opacity variation
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }

    return (
        <View style={styles.container}>
            {/* Full-Screen Grid Background */}
            <Svg height={height} width={width} style={StyleSheet.absoluteFill}>
                {/* Generate dots */}
                {Array.from({ length: Math.ceil(width / gap) +1}, (_, i) => {
                    Array.from({ length: Math.ceil(height / gap) +1}, (_, j) => {
                        const y = j * gap; // Y-coordinate of the dot
                        const x = i * gap; // X-coordinate of the dot
                        const distanceFromCenter = Math.sqrt((centerY - y) ** 2 + (centerX - x) ** 2);
                        const color = calculateColor(distanceFromCenter);
                        return (
                            <Circle
                                key={`dot-h-${i},${j}`}
                                cx={x}
                                cy={y}
                                r="1"
                                stroke={color}
                                strokeWidth="1"
                            />
                        );
                    })
                })}

            </Svg>

            <View width={width} height={height} style={styles.textContainer}>
                <GradientText
                    vertical={true}
                    style={styles.text}
                    colors={["#9A9A9A", "#c1c1c1"]}
                >
                    {text}
                </GradientText>
            </View>
        </View>
    );
}

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
    },
    textContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 36,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
    },
});

import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Svg, { Path } from "react-native-svg";
import GradientText from "@/components/nativezencomponents/GradientText";

// Get screen dimensions
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function GridLinesBackground({ width = screenWidth, height = screenHeight ,text="Backgrounds",gap=20}) {
    const centerX = width / 2;
    const centerY = height / 2;
    function calculateColor(distance) {
        const maxDistance = Math.sqrt(centerX ** 2 + centerY ** 2); // Maximum possible distance
        const normalizedDistance = distance / maxDistance; // Normalize distance to a range of 0 to 1

        // Interpolate RGB values based on the normalized distance
        const r = Math.round(81 - (81) * (normalizedDistance**2));
        const g = Math.round(81 - (81) * (normalizedDistance**2));
        const b = Math.round(81 - (81) * (normalizedDistance**2));

        const opacity = (0.7 - normalizedDistance ** 2); // Quadratic falloff for smoother opacity variation
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }

    return (
        <View style={styles.container}>
            {/* Full-Screen Grid Background */}
            <Svg height={height} width={width} style={StyleSheet.absoluteFill}>
                {/* Generate vertical grid lines */}
                {Array.from({ length: Math.ceil(width / gap) + 1 }, (_, i) => {
                    const x = i * gap; // X-coordinate of the vertical line
                    const distanceFromCenter = Math.abs(centerX - x);
                    const color = calculateColor(distanceFromCenter);
                    return (
                        <Path
                            key={`v-${i}`}
                            d={`M${x} 0 V${height}`}
                            stroke={color}
                            strokeWidth="1"
                        />
                    );
                })}

                {/* Generate horizontal grid lines */}
                {Array.from({ length: Math.ceil(height / gap) + 1 }, (_, i) => {
                    const y = i * gap; // Y-coordinate of the horizontal line
                    const distanceFromCenter = Math.abs(centerY - y);
                    const color = calculateColor(distanceFromCenter);
                    return (
                        <Path
                            key={`h-${i}`}
                            d={`M0 ${y} H${width}`}
                            stroke={color}
                            strokeWidth="1"
                        />
                    );
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

// Function to calculate color based on distance from center

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
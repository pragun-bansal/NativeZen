import React, { useRef, useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
import Animated, {
    Easing,
    useAnimatedProps,
    useSharedValue,
    withRepeat,
    withTiming,
} from "react-native-reanimated";

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface AnimatedBeamProps {
    curvature?: number;
    duration?: number;
    startXOffset?: number;
    startYOffset?: number;
    endXOffset?: number;
    endYOffset?: number;
}

export const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
                                                              curvature = 50,
                                                              duration = 4000,
                                                              startXOffset = 0,
                                                              startYOffset = 0,
                                                              endXOffset = 0,
                                                              endYOffset = 0,
                                                          }) => {
    const containerRef = useRef<View>(null);
    const fromRef = useRef<View>(null);
    const toRef = useRef<View>(null);

    const [beamPath, setBeamPath] = useState("");
    const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

    const dashOffset = useSharedValue(0); // Shared value for the animation

    // Animate the dash offset
    useEffect(() => {
        dashOffset.value = withRepeat(
            withTiming(100, {
                duration,
                easing: Easing.linear,
            }),
            -1, // Infinite repetition
            false
        );
    }, [duration]);

    const animatedProps = useAnimatedProps(() => ({
        strokeDashoffset: dashOffset.value,
    }));

    const updatePath = () => {
        if (containerRef.current && fromRef.current && toRef.current) {
            containerRef.current.measure((_, __, containerWidth, containerHeight, containerX, containerY) => {
                fromRef.current.measure((fx, fy, fWidth, fHeight, fPageX, fPageY) => {
                    toRef.current.measure((tx, ty, tWidth, tHeight, tPageX, tPageY) => {
                        const svgWidth = containerWidth;
                        const svgHeight = containerHeight;

                        setSvgDimensions({ width: svgWidth, height: svgHeight });

                        const startX = fPageX - containerX + fWidth / 2 + startXOffset;
                        const startY = fPageY - containerY + fHeight / 2 + startYOffset;
                        const endX = tPageX - containerX + tWidth / 2 + endXOffset;
                        const endY = tPageY - containerY + tHeight / 2 + endYOffset;

                        const controlY = startY - curvature;
                        const path = `M ${startX},${startY} Q ${(startX + endX) / 2},${controlY} ${endX},${endY}`;
                        setBeamPath(path);
                    });
                });
            });
        }
    };

    useEffect(() => {
        updatePath();
    }, [curvature, startXOffset, startYOffset, endXOffset, endYOffset]);

    return (
        <View style={styles.container} ref={containerRef} onLayout={updatePath}>
            <Svg
                width={svgDimensions.width}
                height={svgDimensions.height}
                style={styles.svg}
            >
                <Defs>
                    <LinearGradient id="beamGradient" x1="0" y1="0" x2="1" y2="1">
                        <Stop offset="0%" stopColor="#ffaa40" stopOpacity="0" />
                        <Stop offset="50%" stopColor="#9c40ff" />
                        <Stop offset="100%" stopColor="#9c40ff" stopOpacity="0" />
                    </LinearGradient>
                </Defs>
                <AnimatedPath
                    d={beamPath}
                    stroke="url(#beamGradient)"
                    strokeWidth="2"
                    animatedProps={animatedProps}
                />
            </Svg>
            <View style={[styles.circle, styles.fromCircle]} ref={fromRef} />
            <View style={[styles.circle, styles.toCircle]} ref={toRef} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "relative",
        width: "100%",
        height: 300,
    },
    svg: {
        position: "absolute",
        top: 0,
        left: 0,
    },
    circle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
        position: "absolute",
    },
    fromCircle: {
        left: 50,
        top: 50,
    },
    toCircle: {
        right: 50,
        bottom: 50,
    },
});

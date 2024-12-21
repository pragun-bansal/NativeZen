import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity, Image } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { BlurView } from "expo-blur";

const { w, h } = Dimensions.get("window");

const GRAVITY = 0.5;
const BOUNCE_FACTOR = 1;
const INITIAL_VELOCITY_X = 5;

export default function BounceGravity({height=h,width=w,theme="dark"}) {
    const styles = StyleSheet.create({
        container: {
            height: height,
            width,
            backgroundColor: "black",
            overflow: "hidden",
        },
        nonBlurredContent: {
            zIndex: 100,
        },
        touchable: {
            borderRadius: 900,
            shadowColor: "black",
            shadowOpacity: 0.1,
            shadowRadius: 10,
            shadowOffset: {
                width: 5,
                height: 5,
            },
            zIndex: 1,
            elevation: 3,
        },
    });
    const isLoaded = useRef(false);
    const animatedBlurBubbles = [
        {
            circle: 100,
            translateX: useSharedValue(Math.random() * (width - 50)), // Start off-screen to the left
            translateY: useSharedValue(Math.random() * (height - 50)),
            velocityX: useSharedValue(INITIAL_VELOCITY_X),
            velocityY: useSharedValue(0),
            color: "#cffc03",
        },
        {
            circle: 180,
            translateX: useSharedValue(Math.random() * (width - 90)),
            translateY: useSharedValue(Math.random() * (height - 90)),
            velocityX: useSharedValue(INITIAL_VELOCITY_X),
            velocityY: useSharedValue(0),
            color: "#fc0384",
        },
        {
            circle: 90,
            translateX: useSharedValue(Math.random() * (width - 45)),
            translateY: useSharedValue(Math.random() * (height - 45)),
            velocityX: useSharedValue(INITIAL_VELOCITY_X),
            velocityY: useSharedValue(0),
            color: "#8803fc",
        },
        {
            circle: 120,
            translateX: useSharedValue(Math.random() * (width - 120)),
            translateY: useSharedValue(Math.random() * (height - 120)),
            velocityX: useSharedValue(INITIAL_VELOCITY_X),
            velocityY: useSharedValue(0),
            color: "#fc8003",
        },
        {
            circle: 140,
            translateX: useSharedValue(Math.random() * (width - 70)),
            translateY: useSharedValue(Math.random() * (height - 70)),
            velocityX: useSharedValue(INITIAL_VELOCITY_X),
            velocityY: useSharedValue(0),
            color: "#0703fc",
        },
        {
            circle: 130,
            translateX: useSharedValue(Math.random() * (width - 65)),
            translateY: useSharedValue(Math.random() * (height - 65)),
            velocityX: useSharedValue(INITIAL_VELOCITY_X),
            velocityY: useSharedValue(0),
            color: "#fcb103",
        },
        {
            circle: 150,
            translateX: useSharedValue(Math.random() * (width - 75)),
            translateY: useSharedValue(Math.random() * (height - 75)),
            velocityX: useSharedValue(INITIAL_VELOCITY_X),
            velocityY: useSharedValue(0),
            color: "#03ebfc",
        },
    ];

    useEffect(() => {
        if (!isLoaded.current) {
            animatedBlurBubbles.forEach((item) => {
                const animate = () => {
                    // Update horizontal position and bounce off vertical edges
                    item.translateX.value += item.velocityX.value;
                    if (item.translateX.value >= width - item.circle ) {
                        item.translateX.value = width - item.circle-1;
                        item.velocityX.value *= -1; // Reverse horizontal direction
                    }
                    if (item.translateX.value <=0 ) {
                        item.translateX.value =1;
                        item.velocityX.value *= -1; // Reverse horizontal direction
                    }

                    // Apply gravity to vertical movement
                    item.velocityY.value += GRAVITY;
                    item.translateY.value += item.velocityY.value;

                    // Bounce off bottom and top edges
                    if (item.translateY.value >= height- item.circle) {
                        item.translateY.value = height- item.circle-1;
                        item.velocityY.value *= -((Math.random()*0.5)+0.7);
                    }

                    // if (item.translateY.value < 0) {
                    //     item.translateY.value = -1;
                    //     item.velocityY.value *= -BOUNCE_FACTOR;
                    // }

                    requestAnimationFrame(animate);
                };
                animate();
            });
            isLoaded.current = true;
        }
    }, [animatedBlurBubbles]);

    const style = (translateX, translateY) =>
        useAnimatedStyle(() => {
            return {
                transform: [
                    { translateX: translateX.value },
                    { translateY: translateY.value },
                ],
            };
        });

    return (
        <View style={styles.container}>
            {animatedBlurBubbles.map((item, index) => (
                <Animated.View
                    key={item.circle.toString()}
                    style={[
                        style(item.translateX, item.translateY),
                        { position: "absolute", zIndex: index },
                    ]}
                >
                    <TouchableOpacity
                        style={[
                            styles.touchable,
                            { width: item.circle, height: item.circle },
                            item.color && { backgroundColor: item.color },
                        ]}
                    >
                        {!item.color && (
                            <Image
                                style={[
                                    styles.touchable,
                                    { width: item.circle, height: item.circle },
                                ]}
                                source={item.image}
                            />
                        )}
                    </TouchableOpacity>
                </Animated.View>
            ))}
            {animatedBlurBubbles[0].color && (
                <BlurView
                    intensity={100}
                    style={[StyleSheet.absoluteFill, styles.nonBlurredContent]}
                />
            )}
        </View>
    );
}

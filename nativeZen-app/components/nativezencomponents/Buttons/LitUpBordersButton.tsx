// // // import React, { useState } from 'react';
// // // import {TouchableOpacity, Text, View, TouchableHighlight} from 'react-native';
// // // import { LinearGradient } from 'expo-linear-gradient';
// // //
// // // interface LitUpBordersButtonProps {
// // //     gradientColors: string[];
// // //     textColor: string;
// // //     text: string;
// // // }
// // //
// // // export const LitUpBordersButton: React.FC<LitUpBordersButtonProps> = ({ gradientColors=["#6466f1","#A856F7"], textColor="white", text="Lit Up Borders" }) => {
// // //     const [active, setActive] = useState(false);
// // //
// // //     return (
// // //         <TouchableOpacity
// // //             activeOpacity={1}
// // //             onPressIn={() => setActive(true)}
// // //             onPressOut={() => setActive(false)}
// // //             className="relative p-1 rounded-lg overflow-hidden active:bg-transparent"
// // //         >
// // //             <LinearGradient
// // //                 colors={gradientColors}
// // //                 className="absolute inset-0 rounded-lg p-2"
// // //             />
// // //             <View
// // //                 className="px-8 py-4 rounded-[6px] relative z-10 transition duration-200 text-white"
// // //                 style={{
// // //                     backgroundColor: active ? `linear-gradient(${gradientColors[0]}, ${gradientColors[1]})` : 'black',
// // //                 }}
// // //             >
// // //                 <Text className="inline-flex text-center text-base" style={{ color: textColor }}>
// // //                     {text}
// // //                 </Text>
// // //             </View>
// // //         </TouchableOpacity>
// // //     );
// // // };
// // import React, { useState } from "react";
// // import { TouchableOpacity, Text, View, StyleSheet, Animated } from "react-native";
// // import { LinearGradient } from "expo-linear-gradient";
// //
// // interface LitUpBordersButtonProps {
// //     gradientColors: string[];
// //     textColor: string;
// //     text: string;
// // }
// //
// // export const LitUpBordersButton: React.FC<LitUpBordersButtonProps> = ({
// //                                                                           gradientColors = ["#6466f1", "#A856F7"],
// //                                                                           textColor = "white",
// //                                                                           text = "Lit Up Borders",
// //                                                                       }) => {
// //     const [isPressed, setIsPressed] = useState(false);
// //     const scaleValue = new Animated.Value(1);
// //
// //     const handlePressIn = () => {
// //         setIsPressed(true);
// //         Animated.spring(scaleValue, {
// //             toValue: 0.95,
// //             useNativeDriver: true,
// //         }).start();
// //     };
// //
// //     const handlePressOut = () => {
// //         setIsPressed(false);
// //         Animated.spring(scaleValue, {
// //             toValue: 1,
// //             useNativeDriver: true,
// //         }).start();
// //     };
// //
// //     return (
// //         <TouchableOpacity
// //             activeOpacity={1}
// //             onPressIn={handlePressIn}
// //             onPressOut={handlePressOut}
// //             style={styles.buttonContainer}
// //         >
// //             <LinearGradient
// //                 colors={gradientColors}
// //                 style={[
// //                     styles.gradientBorder,
// //                     isPressed && styles.glowEffect,
// //                 ]}
// //             />
// //             <Animated.View
// //                 style={[
// //                     styles.innerButton,
// //                     { transform: [{ scale: scaleValue }] },
// //                 ]}
// //             >
// //                 <Text style={[styles.buttonText, { color: textColor }]}>{text}</Text>
// //             </Animated.View>
// //         </TouchableOpacity>
// //     );
// // };
// //
// // const styles = StyleSheet.create({
// //     buttonContainer: {
// //         position: "relative",
// //         padding: 2,
// //         borderRadius: 12,
// //         overflow: "hidden",
// //     },
// //     gradientBorder: {
// //         position: "absolute",
// //         inset: 0,
// //         borderRadius: 12,
// //         zIndex: 0,
// //     },
// //     glowEffect: {
// //         shadowColor: "#A856F7",
// //         shadowOffset: { width: 0, height: 0 },
// //         shadowOpacity: 0.6,
// //         shadowRadius: 20,
// //         elevation: 10, // For Android
// //     },
// //     innerButton: {
// //         paddingVertical: 12,
// //         paddingHorizontal: 24,
// //         backgroundColor: "#000",
// //         borderRadius: 10,
// //         justifyContent: "center",
// //         alignItems: "center",
// //         zIndex: 1,
// //     },
// //     buttonText: {
// //         fontSize: 16,
// //         fontWeight: "bold",
// //     },
// // });
// import React, { useState } from "react";
// import { TouchableOpacity, Text, View, StyleSheet, Animated } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
//
// interface LitUpBordersButtonProps {
//     gradientColors?: string[];
//     textColor?: string;
//     text?: string;
//     onPress?: () => void;
// }
//
// export const LitUpBordersButton: React.FC<LitUpBordersButtonProps> = ({
//                                                                           gradientColors = ["#6466f1", "#A856F7"],
//                                                                           textColor = "white",
//                                                                           text = "Lit Up Borders",
//                                                                           onPress = () => {},
//                                                                       }) => {
//     const [isPressed, setIsPressed] = useState(false);
//     const scaleValue = new Animated.Value(1);
//
//     const handlePressIn = () => {
//         setIsPressed(true);
//         Animated.spring(scaleValue, {
//             toValue: 0.95,
//             useNativeDriver: true,
//         }).start();
//     };
//
//     const handlePressOut = () => {
//         setIsPressed(false);
//         Animated.spring(scaleValue, {
//             toValue: 1,
//             useNativeDriver: true,
//         }).start();
//     };
//
//     return (
//         <TouchableOpacity
//             activeOpacity={1}
//             onPressIn={handlePressIn}
//             onPressOut={handlePressOut}
//             onPress={onPress} // Calls the passed-in onPress function
//             style={styles.buttonContainer}
//         >
//             <LinearGradient
//                 colors={gradientColors}
//                 style={[
//                     styles.gradientBorder,
//                     isPressed && styles.glowEffect,
//                 ]}
//             />
//             <Animated.View
//                 style={[
//                     styles.innerButton,
//                     { transform: [{ scale: scaleValue }] },
//                 ]}
//             >
//                 <Text style={[styles.buttonText, { color: textColor }]}>{text}</Text>
//             </Animated.View>
//         </TouchableOpacity>
//     );
// };
//
// const styles = StyleSheet.create({
//     buttonContainer: {
//         position: "relative",
//         padding: 2,
//         borderRadius: 12,
//         overflow: "hidden",
//     },
//     gradientBorder: {
//         position: "absolute",
//         inset: 0,
//         borderRadius: 12,
//         zIndex: 0,
//     },
//     glowEffect: {
//         shadowColor: "#A856F7",
//         shadowOffset: { width: 0, height: 0 },
//         shadowOpacity: 0.6,
//         shadowRadius: 20,
//         elevation: 10, // For Android
//     },
//     innerButton: {
//         paddingVertical: 12,
//         paddingHorizontal: 24,
//         backgroundColor: "#000",
//         borderRadius: 10,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     buttonText: {
//         fontSize: 16,
//         fontWeight: "bold",
//         zIndex:10
//     },
// });
import React, { useState } from "react";
import { TouchableOpacity, Text, View, StyleSheet, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface LitUpBordersButtonProps {
    gradientColors?: string[];
    textColor?: string;
    text?: string;
    direction?: "horizontal" | "vertical";
    onPress?: () => void;
}

export const LitUpBordersButton: React.FC<LitUpBordersButtonProps> = ({
                                                                          gradientColors = ["#6466f1", "#A856F7"],
                                                                          textColor = "white",
                                                                          text = "Lit Up Borders",
                                                                          direction = "horizontal",
                                                                          onPress = () => {},
                                                                      }) => {
    const [isPressed, setIsPressed] = useState(false);
    const scaleValue = new Animated.Value(1);

    const handlePressIn = () => {
        setIsPressed(true);
        Animated.spring(scaleValue, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        setIsPressed(false);
        Animated.spring(scaleValue, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const gradientStartEnd =
        direction === "vertical"
            ? { start: { x: 0.5, y: 0 }, end: { x: 0.5, y: 1 } }
            : { start: { x: 0, y: 0.5 }, end: { x: 1, y: 0.5 } };

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={onPress}
            style={styles.buttonContainer}
        >
            <LinearGradient
                colors={gradientColors}
                style={[
                    styles.gradientBorder,
                    isPressed && styles.glowEffect,
                    {zIndex: 0}
                ]}
                {...gradientStartEnd}
            />
            <Animated.View
                style={[
                    styles.innerButton,
                    { transform: [{ scale: scaleValue }] },
                ]}
            >
                <Text style={[styles.buttonText, { color: textColor }]}>{text}</Text>
            </Animated.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        position: "relative",
        padding: 2,
        borderRadius: 12,
        overflow: "hidden",
        margin: 10,
    },
    gradientBorder: {
        position: "absolute",
        inset: 0,
        borderRadius: 12,
        zIndex: 0,
    },
    glowEffect: {
        shadowColor: "#A856F7",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 20,
        elevation: 10, // For Android
    },
    innerButton: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        backgroundColor: "rgba(0, 0, 0,1)", // Ensures text is always visible
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
    },
});

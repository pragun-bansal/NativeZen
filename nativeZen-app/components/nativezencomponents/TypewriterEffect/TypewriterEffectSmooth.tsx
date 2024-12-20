// // import React, { useEffect, useRef, useState } from "react";
// // import { Animated, StyleSheet, Text, TextStyle, View } from "react-native";
// //
// // interface TypewriterProps {
// //     textArray: string[];
// //     minSpeed?: number;
// //     maxSpeed?: number;
// //     loop?: boolean;
// //     delay?: number;
// //     textStyle?: TextStyle;
// //     cursorStyle?: TextStyle;
// // }
// //
// // const DEFAULT_MIN_SPEED = 30;
// // const DEFAULT_MAX_SPEED = 60;
// // const DEFAULT_DELAY = 40;
// // const WHITE = "#ffffff";
// //
// // const styles = StyleSheet.create({
// //     container: {
// //         flexDirection: "row",
// //     },
// //     text: {
// //         color: WHITE,
// //         fontSize: 18,
// //     },
// //     cursor: {
// //         color: WHITE,
// //         fontSize: 18,
// //     },
// // });
// //
// // const TypeWriter: React.FC<TypewriterProps> = ({
// //                                                    textArray,
// //                                                    minSpeed = DEFAULT_MIN_SPEED,
// //                                                    maxSpeed = DEFAULT_MAX_SPEED,
// //                                                    loop = false,
// //                                                    delay = DEFAULT_DELAY,
// //                                                    textStyle,
// //                                                    cursorStyle,
// //                                                }) => {
// //     const [stringIndex, setStringIndex] = useState(0);
// //     const [textIndex, setTextIndex] = useState(0);
// //     const opacityValue = useRef(new Animated.Value(0)).current;
// //
// //     const getRandomSpeed = () => {
// //         return Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed;
// //     };
// //
// //     useEffect(() => {
// //         Animated.loop(
// //             Animated.sequence([
// //                 Animated.timing(opacityValue, {
// //                     toValue: 1,
// //                     duration: 2,
// //                     useNativeDriver: true,
// //                 }),
// //                 Animated.delay(300),
// //                 Animated.timing(opacityValue, {
// //                     toValue: 0,
// //                     duration: 2,
// //                     useNativeDriver: true,
// //                 }),
// //                 Animated.delay(300),
// //             ])
// //         ).start();
// //     }, [opacityValue]);
// //
// //     useEffect(() => {
// //         const currentChar = textArray[stringIndex].charAt(textIndex);
// //         const isSpace = currentChar === " ";
// //         const charSpeed = isSpace ? getRandomSpeed() + 200 : getRandomSpeed();
// //
// //         setTimeout(() => {
// //             if (textIndex < textArray[stringIndex].length) {
// //                 setTextIndex(textIndex + 1);
// //             } else {
// //                 if (stringIndex < textArray.length - 1) {
// //                     setTimeout(() => {
// //                         setTextIndex(0);
// //                         setStringIndex(stringIndex + 1);
// //                     }, delay);
// //                 } else {
// //                     if (loop) {
// //                         setTimeout(() => {
// //                             setTextIndex(0);
// //                             setStringIndex(0);
// //                         }, delay);
// //                     }
// //                 }
// //             }
// //         }, charSpeed);
// //     }, [textIndex, stringIndex, textArray, loop, delay, minSpeed, maxSpeed]);
// //
// //     return (
// //         <View style={styles.container}>
// //             <Text style={textStyle ? textStyle : styles.text}>
// //                 {textArray[stringIndex].substring(0, textIndex)}
// //             </Text>
// //             <Animated.View style={{ opacity: opacityValue }}>
// //                 <Text style={cursorStyle ? cursorStyle : styles.cursor}>▎</Text>
// //             </Animated.View>
// //         </View>
// //     );
// // };
// //
// // export default TypeWriter;
// //
// //
// //
// //
//
// import React, {
//     useEffect,
//     useRef,
//     useState,
//     useImperativeHandle,
//     forwardRef,
// } from "react";
// import { Animated, StyleSheet, Text, TextStyle, View } from "react-native";
//
// interface TypewriterProps {
//     textArray: string[];
//     minSpeed?: number;
//     maxSpeed?: number;
//     loop?: boolean;
//     delay?: number;
//     textStyle?: TextStyle;
//     cursorStyle?: TextStyle;
// }
//
// const DEFAULT_MIN_SPEED = 30;
// const DEFAULT_MAX_SPEED = 60;
// const DEFAULT_DELAY = 40;
// const WHITE = "#ffffff";
//
// const styles = StyleSheet.create({
//     container: {
//         flexDirection: "row",
//     },
//     text: {
//         color: WHITE,
//         fontSize: 18,
//     },
//     cursor: {
//         color: WHITE,
//         fontSize: 18,
//     },
// });
//
// const TypeWriter = forwardRef(
//     (
//         {
//             textArray,
//             minSpeed = DEFAULT_MIN_SPEED,
//             maxSpeed = DEFAULT_MAX_SPEED,
//             loop = false,
//             delay = DEFAULT_DELAY,
//             textStyle,
//             cursorStyle,
//         }: TypewriterProps,
//         ref
//     ) => {
//         const [stringIndex, setStringIndex] = useState(0);
//         const [textIndex, setTextIndex] = useState(0);
//         const opacityValue = useRef(new Animated.Value(0)).current;
//         const isPaused = useRef(false);
//
//         const getRandomSpeed = () => {
//             return Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed;
//         };
//
//         const typeString = (newString: string) => {
//             textArray.splice(stringIndex + 1, 0, newString);
//         };
//
//         const deleteChars = (num: number) => {
//             setTextIndex((prev) => Math.max(0, prev - num));
//         };
//
//         const pause = (ms: number) => {
//             isPaused.current = true;
//             setTimeout(() => {
//                 isPaused.current = false;
//             }, ms);
//         };
//
//         useImperativeHandle(ref, () => ({
//             typeString,
//             deleteChars,
//             pause,
//         }));
//
//         useEffect(() => {
//             if (isPaused.current) return;
//
//             const currentChar = textArray[stringIndex].charAt(textIndex);
//             const isSpace = currentChar === " ";
//             const charSpeed = isSpace ? getRandomSpeed() + 200 : getRandomSpeed();
//
//             const timeout = setTimeout(() => {
//                 if (textIndex < textArray[stringIndex].length) {
//                     setTextIndex(textIndex + 1);
//                 } else {
//                     if (stringIndex < textArray.length - 1) {
//                         setTimeout(() => {
//                             setTextIndex(0);
//                             setStringIndex(stringIndex + 1);
//                         }, delay);
//                     } else if (loop) {
//                         setTimeout(() => {
//                             setTextIndex(0);
//                             setStringIndex(0);
//                         }, delay);
//                     }
//                 }
//             }, charSpeed);
//
//             return () => clearTimeout(timeout);
//         }, [textIndex, stringIndex, textArray, loop, delay, minSpeed, maxSpeed]);
//
//         useEffect(() => {
//             Animated.loop(
//                 Animated.sequence([
//                     Animated.timing(opacityValue, {
//                         toValue: 1,
//                         duration: 200,
//                         useNativeDriver: true,
//                     }),
//                     Animated.delay(300),
//                     Animated.timing(opacityValue, {
//                         toValue: 0,
//                         duration: 200,
//                         useNativeDriver: true,
//                     }),
//                     Animated.delay(300),
//                 ])
//             ).start();
//         }, [opacityValue]);
//
//         return (
//             <View style={styles.container}>
//                 <Text style={textStyle ? textStyle : styles.text}>
//                     {textArray[stringIndex].substring(0, textIndex)}
//                 </Text>
//                 <Animated.View style={{ opacity: opacityValue }}>
//                     <Text style={cursorStyle ? cursorStyle : styles.cursor}>▎</Text>
//                 </Animated.View>
//             </View>
//         );
//     }
// );
//
// export default TypeWriter;

import React, { useEffect, useState } from "react";
import { Animated, StyleSheet, Text, TextStyle, View } from "react-native";

interface TypewriterProps {
    sequence: Array<
        | { type: "typeString"; value: string }
        | { type: "pause"; duration: number }
        | { type: "deleteChars"; count: number }
    >;
    minSpeed?: number;
    maxSpeed?: number;
    textStyle?: TextStyle;
    cursorStyle?: TextStyle;
}

const DEFAULT_MIN_SPEED = 30;
const DEFAULT_MAX_SPEED = 60;
const WHITE = "#ffffff";

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
    text: {
        color: WHITE,
        fontSize: 18,
    },
    cursor: {
        color: WHITE,
        fontSize: 18,
    },
});

const TypeWriterEffectSmooth: React.FC<TypewriterProps> = ({
                                                   sequence,
                                                   minSpeed = DEFAULT_MIN_SPEED,
                                                   maxSpeed = DEFAULT_MAX_SPEED,
                                                   textStyle,
                                                   cursorStyle,
                                               }) => {
    const [displayText, setDisplayText] = useState("");
    const [opacityValue] = useState(new Animated.Value(0));

    const getRandomSpeed = () => {
        return Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed;
    };

    useEffect(() => {
        const runSequence = async () => {
            for (const action of sequence) {
                if (action.type === "typeString") {
                    for (let i = 0; i < action.value.length; i++) {
                        setDisplayText((prev) => prev + action.value[i]);
                        await new Promise((resolve) =>
                            setTimeout(resolve, getRandomSpeed())
                        );
                    }
                } else if (action.type === "pause") {
                    await new Promise((resolve) =>
                        setTimeout(resolve, action.duration)
                    );
                } else if (action.type === "deleteChars") {
                    for (let i = 0; i < action.count; i++) {
                        setDisplayText((prev) => prev.slice(0, -1));
                        await new Promise((resolve) =>
                            setTimeout(resolve, getRandomSpeed())
                        );
                    }
                }
            }
        };

        runSequence();
    }, [sequence]);

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacityValue, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.delay(300),
                Animated.timing(opacityValue, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.delay(300),
            ])
        ).start();
    }, [opacityValue]);

    return (
        <View style={styles.container}>
            <Text style={textStyle ? textStyle : styles.text}>{displayText}</Text>
            <Animated.View style={{ opacity: opacityValue }}>
                <Text style={cursorStyle ? cursorStyle : styles.cursor}>▎</Text>
            </Animated.View>
        </View>
    );
};

export default TypeWriterEffectSmooth;

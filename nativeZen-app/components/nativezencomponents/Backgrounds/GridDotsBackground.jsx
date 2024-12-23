// // import React from "react";
// // import { View, Text, StyleSheet, Dimensions } from "react-native";
// // import Svg, { Circle,Rect } from "react-native-svg";
// // import GradientText from "@/components/nativezencomponents/GradientText";
// //
// // // Get screen dimensions
// // const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
// //
// // export default function GridDotsBackgrond({ width = screenWidth, height = screenHeight, text = "Backgrounds", gap = 20 }) {
// //     const centerX = width / 2;
// //     const centerY = height / 2;
// //
// //     // Function to calculate color based on distance from center
// //     function calculateColor(distance) {
// //         const maxDistance = Math.sqrt(centerX ** 2 + centerY ** 2); // Maximum possible distance
// //         const normalizedDistance = distance / maxDistance; // Normalize distance to a range of 0 to 1
// //
// //         // Interpolate RGB values based on the normalized distance
// //         const r = Math.round(81 - (81) * (normalizedDistance ));
// //         const g = Math.round(81 - (81) * (normalizedDistance ));
// //         const b = Math.round(81 - (81) * (normalizedDistance ));
// //
// //         const opacity = 1 - normalizedDistance; // Quadratic falloff for smoother opacity variation
// //         return `rgba(${r}, ${g}, ${b}, ${opacity})`;
// //         // return 'rgba(255, 255, 255, 0.8)';
// //     }
// //
// //     return (
// //         <View style={styles.container}>
// //             {/* Full-Screen Grid Background */}
// //             <Svg height={height} width={width} style={StyleSheet.absoluteFill}>
// //                 {/* Generate dots */}
// //                 {
// //                     Array.from({ length: Math.ceil(width / gap) + 1 }, (_, i) => {
// //                         const x = i * gap; // X-coordinate of the dot
// //                         return Array.from({ length: Math.ceil(height / gap) + 1 }, (_, j) => {
// //                             const y = j * gap; // Y-coordinate of the dot
// //                             const distanceFromCenter = Math.sqrt((centerY - y) ** 2 + (centerX - x) ** 2);
// //                             const color = calculateColor(distanceFromCenter);
// //
// //                             // Ensure unique key
// //                             return (
// //                                 // <Rect
// //                                 //     key={`dot-${i}-${j}`} // Unique key
// //                                 //     cx={x}
// //                                 //     cy={y}
// //                                 //     r="1"
// //                                 //     stroke={color}
// //                                 //     strokeWidth="4"
// //                                 // />
// //                                 <Rect // Replace with your preferred shape
// //                                     key={`dot-${i}-${j}`}
// //                                     x={x - 2}
// //                                     y={y - 2}
// //                                     width={4}
// //                                     height={4}
// //                                     fill={color}
// //                                 />
// //
// //                             );
// //                         });
// //                     })
// //
// //                 }
// //
// //             </Svg>
// //
// //             <View width={width} height={height} style={styles.textContainer}>
// //                 <GradientText
// //                     vertical={true}
// //                     style={styles.text}
// //                     colors={["#9A9A9A", "#c1c1c1"]}
// //                 >
// //                     {text}
// //                 </GradientText>
// //             </View>
// //         </View>
// //     );
// // }
// //
// // // Styles
// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //         backgroundColor: "black",
// //         alignItems: "center",
// //         justifyContent: "center",
// //     },
// //     textContainer: {
// //         flex: 1,
// //         justifyContent: "center",
// //         alignItems: "center",
// //     },
// //     text: {
// //         fontSize: 36,
// //         fontWeight: "bold",
// //         color: "white",
// //         textAlign: "center",
// //     },
// // });
//
// import React from "react";
// import { View, Text, StyleSheet, Dimensions } from "react-native";
// import Svg, { Circle, Rect, Line, Ellipse, Polygon, Path } from "react-native-svg";
// import GradientText from "@/components/nativezencomponents/GradientText";
//
// // Get screen dimensions
// const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
//
// export default function GridDotsBackground({
//                                                width = screenWidth,
//                                                height = screenHeight,
//                                                text = "Backgrounds",
//                                                gap = 20,
//                                                shape = "circle" // Default shape is "circle"
//                                            }) {
//     const centerX = width / 2;
//     const centerY = height / 2;
//
//     // Function to calculate color based on distance from center
//     function calculateColor(distance) {
//         const maxDistance = Math.sqrt(centerX ** 2 + centerY ** 2); // Maximum possible distance
//         const normalizedDistance = distance / maxDistance; // Normalize distance to a range of 0 to 1
//
//         // Interpolate RGB values based on the normalized distance
//         const r = Math.round(81 - 61 * normalizedDistance);
//         const g = Math.round(81 - 61 * normalizedDistance);
//         const b = Math.round(81 - 61 * normalizedDistance);
//
//         const opacity = 1 - normalizedDistance; // Quadratic falloff for smoother opacity variation
//         return `rgba(${r}, ${g}, ${b}, ${opacity})`;
//     }
//
//     // Function to render the selected shape
//     const renderShape = (x, y, color, key) => {
//         const size = 4; // Base size for shapes
//         switch (shape) {
//             case "circle":
//                 return (
//                     <Circle
//                         key={key}
//                         cx={x}
//                         cy={y}
//                         r={size / 2}
//                         fill={color}
//                     />
//                 );
//             case "rect":
//                 return (
//                     <Rect
//                         key={key}
//                         x={x - size / 2}
//                         y={y - size / 2}
//                         width={size}
//                         height={size}
//                         fill={color}
//                     />
//                 );
//             case "line":
//                 return (
//                     <>
//                         <Line
//                             key={`${key}-h`}
//                             x1={x - size / 2}
//                             y1={y}
//                             x2={x + size / 2}
//                             y2={y}
//                             stroke={color}
//                             strokeWidth={1}
//                         />
//                         <Line
//                             key={`${key}-v`}
//                             x1={x}
//                             y1={y - size / 2}
//                             x2={x}
//                             y2={y + size / 2}
//                             stroke={color}
//                             strokeWidth={1}
//                         />
//                     </>
//                 );
//             case "ellipse":
//                 return (
//                     <Ellipse
//                         key={key}
//                         cx={x}
//                         cy={y}
//                         rx={size}
//                         ry={size / 2}
//                         fill={color}
//                     />
//                 );
//             case "polygon":
//                 return (
//                     <Polygon
//                         key={key}
//                         points={`${x},${y - size} ${x - size},${y + size} ${x + size},${y + size}`}
//                         fill={color}
//                     />
//                 );
//             case "path":
//                 return (
//                     <Path
//                         key={key}
//                         d={`M ${x - size} ${y} L ${x} ${y - size} L ${x + size} ${y} L ${x} ${y + size} Z`}
//                         fill={color}
//                     />
//                 );
//             default:
//                 return null; // Fallback: no shape rendered
//         }
//     };
//
//     return (
//         <View style={styles.container}>
//             {/* Full-Screen Grid Background */}
//             <Svg height={height} width={width} style={StyleSheet.absoluteFill}>
//                 {/* Generate dots */}
//                 {Array.from({ length: Math.ceil(width / gap) + 1 }, (_, i) => {
//                     const x = i * gap; // X-coordinate of the dot
//                     return Array.from({ length: Math.ceil(height / gap) + 1 }, (_, j) => {
//                         const y = j * gap; // Y-coordinate of the dot
//                         const distanceFromCenter = Math.sqrt((centerY - y) ** 2 + (centerX - x) ** 2);
//                         const color = calculateColor(distanceFromCenter);
//
//                         // Ensure unique key
//                         const key = `dot-${i}-${j}`;
//                         return renderShape(x, y, color, key);
//                     });
//                 })}
//             </Svg>
//
//             <View width={width} height={height} style={styles.textContainer}>
//                 <GradientText
//                     vertical={true}
//                     style={styles.text}
//                     colors={["#9A9A9A", "#c1c1c1"]}
//                 >
//                     {text}
//                 </GradientText>
//             </View>
//         </View>
//     );
// }
//
// // Styles
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "black",
//         alignItems: "center",
//         justifyContent: "center",
//     },
//     textContainer: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     text: {
//         fontSize: 36,
//         fontWeight: "bold",
//         color: "white",
//         textAlign: "center",
//     },
// });
import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Svg, { Circle, Rect, Line, Ellipse, Polygon, Path, Text } from "react-native-svg";
import GradientText from "@/components/nativezencomponents/GradientText";

// Get screen dimensions
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function GridDotsBackground({
                                               width = screenWidth,
                                               height = screenHeight,
                                               text = "Backgrounds",
                                               gap = 20,
                                               shape = "circle", // Default shape
                                               size = 4, // Default size for the shapes
                                               textContent = "•", // Default text for "text" shape
                                           }) {
    const centerX = width / 2;
    const centerY = height / 2;

    // Function to calculate color based on distance from center
    function calculateColor(distance) {
        const maxDistance = Math.sqrt(centerX ** 2 + centerY ** 2); // Maximum possible distance
        const normalizedDistance = distance / maxDistance; // Normalize distance to a range of 0 to 1

        // Interpolate RGB values based on the normalized distance
        const r = Math.round(81 - 81 * normalizedDistance);
        const g = Math.round(81 - 81 * normalizedDistance);
        const b = Math.round(81 - 81 * normalizedDistance);

        const opacity = 1 - normalizedDistance; // Quadratic falloff for smoother opacity variation
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }

    // Function to render the selected shape
    // const renderShape = (x, y, color, key) => {
    //     switch (shape) {
    //         case "circle":
    //             return (
    //                 <Circle
    //                     key={key}
    //                     cx={x}
    //                     cy={y}
    //                     r={size / 2}
    //                     fill={color}
    //                 />
    //             );
    //         case "rect":
    //             return (
    //                 <Rect
    //                     key={key}
    //                     x={x - size / 2}
    //                     y={y - size / 2}
    //                     width={size}
    //                     height={size}
    //                     fill={color}
    //                 />
    //             );
    //         case "line":
    //             return (
    //                 <>
    //                     <Line
    //                         key={`${key}-h`}
    //                         x1={x - size / 2}
    //                         y1={y}
    //                         x2={x + size / 2}
    //                         y2={y}
    //                         stroke={color}
    //                         strokeWidth={1}
    //                     />
    //                     <Line
    //                         key={`${key}-v`}
    //                         x1={x}
    //                         y1={y - size / 2}
    //                         x2={x}
    //                         y2={y + size / 2}
    //                         stroke={color}
    //                         strokeWidth={1}
    //                     />
    //                 </>
    //             );
    //         case "ellipse":
    //             return (
    //                 <Ellipse
    //                     key={key}
    //                     cx={x}
    //                     cy={y}
    //                     rx={size}
    //                     ry={size / 2}
    //                     fill={color}
    //                 />
    //             );
    //         case "polygon":
    //             return (
    //                 <Polygon
    //                     key={key}
    //                     points={`${x},${y - size} ${x - size},${y + size} ${x + size},${y + size}`}
    //                     fill={color}
    //                 />
    //             );
    //         case "path":
    //             return (
    //                 <Path
    //                     key={key}
    //                     d={`M ${x - size} ${y} L ${x} ${y - size} L ${x + size} ${y} L ${x} ${y + size} Z`}
    //                     fill={color}
    //                 />
    //             );
    //         case "text":
    //             return (
    //                 <Text
    //                     key={key}
    //                     x={x}
    //                     y={y}
    //                     fontSize={size}
    //                     textAnchor="middle"
    //                     fill={color}
    //                     alignmentBaseline="middle"
    //                 >
    //                     {textContent}
    //                 </Text>
    //             );
    //         default:
    //             return null; // Fallback: no shape rendered
    //     }
    // };

    const renderShape = (x, y, color, key) => {
        switch (shape) {
            case "circle":
                return (
                    <Circle
                        key={key}
                        cx={x}
                        cy={y}
                        r={size / 2}
                        fill={color}
                    />
                );
            case "rect":
                return (
                    <Rect
                        key={key}
                        x={x - size / 2}
                        y={y - size / 2}
                        width={size}
                        height={size}
                        fill={color}
                    />
                );
            case "line":
                return (
                    <>
                        <Line
                            key={`${key}-h`} // Unique key for horizontal line
                            x1={x - size / 2}
                            y1={y}
                            x2={x + size / 2}
                            y2={y}
                            stroke={color}
                            strokeWidth={1}
                        />
                        <Line
                            key={`${key}-v`} // Unique key for vertical line
                            x1={x}
                            y1={y - size / 2}
                            x2={x}
                            y2={y + size / 2}
                            stroke={color}
                            strokeWidth={1}
                        />
                    </>
                );
            case "ellipse":
                return (
                    <Ellipse
                        key={key}
                        cx={x}
                        cy={y}
                        rx={size}
                        ry={size / 2}
                        fill={color}
                    />
                );
            case "polygon":
                return (
                    <Polygon
                        key={key}
                        points={`${x},${y - size} ${x - size},${y + size} ${x + size},${y + size}`}
                        fill={color}
                    />
                );
            case "path":
                return (
                    <Path
                        key={key}
                        d={`M ${x - size} ${y} L ${x} ${y - size} L ${x + size} ${y} L ${x} ${y + size} Z`}
                        fill={color}
                    />
                );
            case "text":
                return (
                    <Text
                        key={key}
                        x={x}
                        y={y}
                        fontSize={size}
                        textAnchor="middle"
                        fill={color}
                        alignmentBaseline="middle"
                    >
                        {textContent}
                    </Text>
                );
            default:
                return null; // Fallback: no shape rendered
        }
    };


    return (
        <View style={styles.container}>
            {/* Full-Screen Grid Background */}
            <Svg height={height} width={width} style={StyleSheet.absoluteFill}>
                {/* Generate dots */}
                {Array.from({ length: Math.ceil(width / gap) + 1 }, (_, i) => {
                    const x = i * gap; // X-coordinate of the dot
                    return Array.from({ length: Math.ceil(height / gap) + 1 }, (_, j) => {
                        const y = j * gap; // Y-coordinate of the dot
                        const distanceFromCenter = Math.sqrt((centerY - y) ** 2 + (centerX - x) ** 2);
                        const color = calculateColor(distanceFromCenter);

                        // Ensure unique key
                        const key = `dot-${i}-${j}`;
                        return renderShape(x, y, color, key);
                    });
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

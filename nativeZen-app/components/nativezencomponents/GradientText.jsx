// import React from "react";
// import { Text } from "react-native";
// import MaskedView from "@react-native-masked-view/masked-view";
// import {LinearGradient} from "expo-linear-gradient";
//
// const GradientText = (props) => {
//     return (
//         <MaskedView maskElement={<Text {...props} />}>
//             <LinearGradient
//                 colors={props.colors}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 0 }}
//             >
//                 <Text {...props} style={[props.style, { opacity: 0 }]} />
//             </LinearGradient>
//         </MaskedView>
//     );
// };
//
// export default GradientText;
import React from "react";
import { Text } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";

const GradientText = (props) => {
    const { colors, style, vertical, ...rest } = props;

    const gradientStartEnd = vertical
        ? { start: { x: 0, y: 0 }, end: { x: 0, y: 1 } }
        : { start: { x: 0, y: 0 }, end: { x: 1, y: 0 } };

    return (
        <MaskedView maskElement={<Text {...rest} style={[style, { textAlign: 'center' }]} />}>
            <LinearGradient
                colors={colors}
                {...gradientStartEnd}
            >
                <Text {...rest} style={[style, { opacity: 0,textAlign:"center" }]} />
            </LinearGradient>
        </MaskedView>
    );
};

export default GradientText;

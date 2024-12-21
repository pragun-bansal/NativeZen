
import React, { useState } from 'react';
import {TouchableOpacity, Text, View, TouchableHighlight} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface LitUpBordersButtonProps {
    gradientColors: string[];
    textColor: string;
}

export const LitUpBordersButton: React.FC<LitUpBordersButtonProps> = ({ gradientColors, textColor }) => {
    const [active, setActive] = useState(false);

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPressIn={() => setActive(true)}
            onPressOut={() => setActive(false)}
            className="relative p-1 rounded-lg overflow-hidden active:bg-transparent"
        >
            <LinearGradient
                colors={gradientColors}
                className="absolute inset-0 rounded-lg p-2"
            />
            <View
                className="px-8 py-4 rounded-[6px] relative z-10 transition duration-200 text-white"
                style={{
                    backgroundColor: active ? `linear-gradient(${gradientColors[0]}, ${gradientColors[1]})` : 'black',
                }}
            >
                <Text className="inline-flex text-center text-base" style={{ color: textColor }}>
                    Lit up borders
                </Text>
            </View>
        </TouchableOpacity>
    );
};

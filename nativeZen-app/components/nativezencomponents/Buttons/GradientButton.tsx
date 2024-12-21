import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface GradientButtonProps {
    gradientColors: string[];
    textColor: string;
}

export const GradientButton: React.FC<GradientButtonProps> = ({ gradientColors, textColor }) => {
    return (
        <TouchableOpacity className="rounded-full overflow-hidden">
            <LinearGradient
                colors={gradientColors}
                className="py-3 px-6 rounded-full">
                <Text className="text-lg font-bold" style={{ color: textColor }}>Gradient</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};
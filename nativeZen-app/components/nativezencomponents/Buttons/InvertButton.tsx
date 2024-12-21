import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface InvertButtonProps {
    bgColor: string;
    textColor: string;
}

export const InvertButton: React.FC<InvertButtonProps> = ({ bgColor, textColor }) => {
    return (
        <TouchableOpacity className="py-3 px-6 rounded-lg border-2 border-transparent shadow-md" style={{ backgroundColor: bgColor }}>
            <Text className="text-base font-bold" style={{ color: textColor }}>Invert it</Text>
        </TouchableOpacity>
    );
};
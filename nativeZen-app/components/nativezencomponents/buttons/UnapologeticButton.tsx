import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export const UnapologeticButton = () => {
    return (
        <TouchableOpacity className="py-3 px-6 rounded-lg border border-black bg-transparent shadow-md relative">
            <Text className="text-white text-base">Unapologetic</Text>
        </TouchableOpacity>
    );
};
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export const SimpleButton = () => {
    return (
        <TouchableOpacity className="py-2 px-4 rounded-lg border border-gray-400 bg-gray-200 shadow-sm">
            <Text className="text-gray-600 text-sm">Simple</Text>
        </TouchableOpacity>
    );
};
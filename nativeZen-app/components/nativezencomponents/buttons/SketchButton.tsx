import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export const SketchButton = () => {
    return (
        <TouchableOpacity className="py-2 px-4 rounded-lg border border-black bg-white shadow-md">
            <Text className="text-black text-base">Sketch</Text>
        </TouchableOpacity>
    );
};
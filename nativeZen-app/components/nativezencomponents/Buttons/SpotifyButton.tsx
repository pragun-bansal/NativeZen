import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export const SpotifyButton = () => {
    return (
        <TouchableOpacity className="px-4 m-2 py-2 rounded-full bg-green-500 shadow-md transform justify-center items-center">
            <Text className="text-white text-base font-bold uppercase">Spotify</Text>
        </TouchableOpacity>
    );
};

import React, { useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

export const PlaylistButton = () => {
    // State to track whether the button is active
    const [isActive, setIsActive] = useState(false);

    return (
        <TouchableOpacity
            onPressIn={() => setIsActive(true)}  // Set active state when pressed
            onPressOut={() => setIsActive(false)}  // Reset active state when press ends
            className={`px-8 py-4 m-2 rounded-full border-2 ${
                isActive ? 'border-[#616467] bg-[#616467] shadow-none' : 'border-[#616467] bg-transparent shadow-md'
            } transform justify-center items-center`}
        >
            <Text
                className={`text-base font-bold uppercase ${
                    isActive ? 'text-white dark:text-white ' : 'dark:text-white text-[#616467]'
                }`}
            >
                Playlist
            </Text>
        </TouchableOpacity>
    );
};

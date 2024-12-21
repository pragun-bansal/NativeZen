import React from 'react';
import { StyleSheet, TouchableOpacity, View,Text } from 'react-native';
// import { cn } from 'nativewind';

export const BorderMagicButton = () => {
    return (
        <TouchableOpacity
            className=
                'relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50'

        >
            <View className=
                'absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]'
            />
            <View className=
                'inline-flex h-full w-full items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl'
            >
                {/* You might need to adjust Text component for React Native */}
                <Text className='text-white'>Border Magic</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {}, // Add any necessary styles here
    spinner: {}, // Add any necessary styles here
    buttonTextContainer: {}, // Add any necessary styles here
    buttonText: {
        color: 'white',
    },
});

// export default Button;
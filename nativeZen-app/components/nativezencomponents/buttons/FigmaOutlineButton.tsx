import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

interface FigmaOutlineButtonProps {
    theme: 'dark' | 'light';
}

export const FigmaOutlineButton: React.FC<FigmaOutlineButtonProps> = ({ theme }) => {
    return (
        <TouchableOpacity style={[styles.button, theme === 'dark' ? styles.darkTheme : styles.lightTheme]}>
            <Text style={styles.buttonText}>Figma Outline</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
        fontWeight: 'bold',
        transition: 'transform 0.4s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    darkTheme: {
        borderColor: '#FFFFFF',
        backgroundColor: 'transparent',
        color: '#FFFFFF',
        borderWidth: 1,
    },
    lightTheme: {
        borderColor: '#000000',
        backgroundColor: 'transparent',
        color: '#000000',
        borderWidth: 1,
    },
    buttonText: {
        fontSize: 16,
        transform: [{ translateY: -1 }],
    },
});

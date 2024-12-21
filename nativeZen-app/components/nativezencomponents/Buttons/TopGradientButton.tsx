import React from 'react';
import { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

interface TopGradientButtonProps {
    theme: 'dark' | 'light';
}

export const TopGradientButton: React.FC<TopGradientButtonProps> = ({ theme }) => {
    const styles = StyleSheet.create({
        button: {
            paddingHorizontal: 8,
            paddingVertical: 2,
            borderRadius: 12,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: theme === 'dark' ? '#4A5568' : '#718096',
            transition: 'box-shadow 0.2s ease-in-out',
        },
        darkTheme: {
            backgroundColor: '#1A202C',
        },
        lightTheme: {
            backgroundColor: '#E2E8F0',
        },
        gradientBackground: {
            position: 'absolute',
            insetX: 0,
            top: -1,
            height: 1,
            width: '50%',
            backgroundColor: 'transparent',
            shadowColor: theme === 'dark' ? '#FFFFFF' : '#1A202C',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 1,
            shadowRadius: 10,
            background: 'linear-gradient(to right, transparent, teal)',
        },
        buttonText: {
            zIndex: 20,
            color: theme === 'dark' ? '#FFFFFF' : '#1A202C',
            fontSize: 14,
        },
    });

    return (
        <TouchableOpacity style={[styles.button, theme === 'dark' ? styles.darkTheme : styles.lightTheme]}>
            <View style={styles.gradientBackground} />
            <Text style={styles.buttonText}>Top gradient</Text>
        </TouchableOpacity>
    );
};


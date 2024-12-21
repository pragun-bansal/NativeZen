import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const BackdropBlurButton = () => {
    return (
        <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Backdrop blur</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(5px)',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        elevation: 5,
    },
    text: {
        color: '#000',
        fontSize: 16,
    },
});

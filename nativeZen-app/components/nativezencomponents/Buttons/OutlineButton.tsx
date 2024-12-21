import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const OutlineButton = () => {
    return (
        <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Outline</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#9CA3AF',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
    },
    text: {
        color: '#000',
        fontSize: 16,
    },
});

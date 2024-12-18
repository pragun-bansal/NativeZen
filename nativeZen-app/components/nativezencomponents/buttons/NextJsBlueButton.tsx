import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const NextJsBlueButton = () => {
    return (
        <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Next.js Blue</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        backgroundColor: '#0070f3',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        elevation: 5,
    },
    text: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const BrutalButton = () => {
    return (
        <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Brutal</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#000',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        elevation: 5,
    },
    text: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

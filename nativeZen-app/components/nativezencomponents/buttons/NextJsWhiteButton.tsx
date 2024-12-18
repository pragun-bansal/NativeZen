import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const NextJsWhiteButton = () => {
    return (
        <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Next White</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
    },
    text: {
        color: '#696969',
        fontSize: 16,
    },
});

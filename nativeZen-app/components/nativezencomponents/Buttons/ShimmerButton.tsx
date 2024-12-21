import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

export const ShimmerButton = () => {
    return (
        <TouchableOpacity style={styles.button}>
            <View style={styles.gradient} />
            <Text style={styles.text}>Shimmer</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        borderColor: '#000',
        borderWidth: 1,
        backgroundColor: 'transparent',
        position: 'relative',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        elevation: 5,
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
        backgroundImage: 'linear-gradient(110deg, #000103, #1e2631)',
        backgroundSize: '200% 100%',
        backgroundPosition: '0 0',
        height: '100%',
        borderRadius: 8,
    },
    text: {
        color: '#6B7280',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

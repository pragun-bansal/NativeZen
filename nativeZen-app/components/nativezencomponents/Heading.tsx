import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useColorScheme } from 'react-native';

type HeadingProps = {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: React.ReactNode;
  style?: object;
};

const Heading: React.FC<HeadingProps> = ({ variant, children, style }) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const getVariantStyles = (variant: HeadingProps['variant']) => {
    switch (variant) {
      case 'h1':
        return styles.h1;
      case 'h2':
        return styles.h2;
      case 'h3':
        return styles.h3;
      case 'h4':
        return styles.h4;
      case 'h5':
        return styles.h5;
      case 'h6':
        return styles.h6;
      default:
        return styles.h1;
    }
  };

  const dynamicStyles = {
    color: isDarkMode ? '#FFFFFF' : '#212121',
    ...getVariantStyles(variant),
  };

  return (
    <View style={[dynamicStyles, style]}>
      <Text style={[dynamicStyles, style]}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 32,
    color: 'orange',
    fontWeight: '700',
    marginBottom: 8,
  },
  h2: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 6,
  },
  h3: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 6,
  },
  h4: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 6,
  },
  h5: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 6,
  },
  h6: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 6,
  },
});

export default Heading;

import React, { useRef, useEffect, memo } from 'react';
import { View, Animated, Dimensions, Image, StyleSheet, Platform, Easing } from 'react-native';

const { width, height } = Dimensions.get('window');

interface AutoParallaxScrollProps {
  images: string[];
  gridRows?: number;
  rowSpeeds?: number[]; // Speed for each row
  containerStyle?: any;
  imageStyle?: any;
  theme?: 'light' | 'dark'; // Theme for the styling
}

const AutoParallaxScroll: React.FC<AutoParallaxScrollProps> = ({
  images,
  gridRows = 3,
  rowSpeeds = [],
  containerStyle,
  imageStyle,
  theme = 'light',
}) => {
  // Fixed dimensions to take 60% of screen height
  const CONTAINER_HEIGHT = height * 0.6;
  const IMAGE_WIDTH = width * 0.7;
  const IMAGE_HEIGHT = CONTAINER_HEIGHT / gridRows - 20;

  // Animated values for each row
  const scrollAnimations = useRef(
    Array.from({ length: gridRows }, () => new Animated.Value(0))
  ).current;

  // Automatic scrolling animation for each row
  useEffect(() => {
    const animations = scrollAnimations.map((animatedValue, index) => {
      // Use custom speed or default to scrollSpeed
      const speed = rowSpeeds[index] || 50;
      return Animated.loop(
        Animated.timing(animatedValue, {
          toValue: -width,
          duration: speed * 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
    });

    // Start all animations simultaneously
    animations.forEach(anim => anim.start());

    // Cleanup
    return () => {
      animations.forEach(anim => anim.stop());
    };
  }, [rowSpeeds]);

  // Parallax image component
  const ParallaxImage = memo(({ src, index, rowIndex }: { src: string; index: number; rowIndex: number }) => {
    // Scale and subtle movement effect
    const scale = scrollAnimations[rowIndex].interpolate({
      inputRange: [-width, 0, width],
      outputRange: [0.95, 1, 0.95],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={[
          {
            width: IMAGE_WIDTH,
            height: IMAGE_HEIGHT,
            marginHorizontal: 10,
            borderRadius: 20,
            overflow: 'hidden',
            transform: [{ translateX: scrollAnimations[rowIndex] }, { scale }],
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 5,
            elevation: 5,
          },
          imageStyle,
        ]}
      >
        <Image source={{ uri: src }} style={StyleSheet.absoluteFillObject} resizeMode="cover" />
      </Animated.View>
    );
  });

  // Render rows with repeating images
  const renderParallaxRows = () => {
    const imagesPerRow = Math.ceil(images.length / gridRows);

    return Array.from({ length: gridRows }).map((_, rowIndex) => {
      // Duplicate images to create infinite scroll effect
      const rowImages = [
        ...images.slice(rowIndex * imagesPerRow, (rowIndex + 1) * imagesPerRow),
        ...images.slice(rowIndex * imagesPerRow, (rowIndex + 1) * imagesPerRow),
      ];

      return (
        <View
          key={rowIndex}
          style={{
            height: IMAGE_HEIGHT,
            marginVertical: 5,
            flexDirection: 'row',
            overflow: 'hidden',
          }}
        >
          {rowImages.map((image, idx) => (
            <ParallaxImage key={idx} src={image} index={idx} rowIndex={rowIndex} />
          ))}
        </View>
      );
    });
  };

  // Apply dark or light theme styles
  const themeStyles = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <View
      style={[
        {
          height: CONTAINER_HEIGHT,
          backgroundColor: themeStyles.backgroundColor,
          justifyContent: 'center',
          overflow: 'hidden',
        },
        containerStyle,
      ]}
    >
      {renderParallaxRows()}
    </View>
  );
};

// Light and dark theme styling (ShadCN-inspired)
const lightTheme = {
  backgroundColor: '#f4f4f4', // Light background
  imageBorderColor: '#e0e0e0', // Light border color
  shadowColor: '#000', // Dark shadow
};

const darkTheme = {
  backgroundColor: 'transparent', // Dark background
  imageBorderColor: '#333', // Dark border color
  shadowColor: '#fff', // Light shadow
};

export default AutoParallaxScroll;

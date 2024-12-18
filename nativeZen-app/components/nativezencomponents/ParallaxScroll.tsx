import React, { useRef } from 'react';
import { View, FlatList, Animated, Dimensions, Image, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface ParallaxScrollProps {
  images: string[];
  scrollSpeed?: number; // Speed at which images move in relation to scroll
  imageHeight?: number; // Height of each image
  imageWidth?: number; // Width of each image
  gridColumns?: number; // Number of columns in the grid
  containerStyle?: any; // Custom styles for the container
  imageStyle?: any; // Custom styles for images
  blurEffect?: boolean; // Option to apply blur effect to images
  icon?: string; // Optional icon to overlay on images
  animationDuration?: number; // Duration of animation for parallax effect
}

const ParallaxScroll: React.FC<ParallaxScrollProps> = ({
  images,
  scrollSpeed = 50,
  imageHeight = 250,
  imageWidth = width - 40,
  gridColumns = 3, // Set default grid to 3 columns
  containerStyle,
  imageStyle,
  blurEffect = false,
  icon,
  animationDuration = 300,
}) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  // Function to apply different parallax speeds for each column
  const imageMove = (index: number, columnIndex: number) => {
    const adjustedSpeed = columnIndex === 1 ? scrollSpeed / 2 : scrollSpeed; // Slow middle column
    return scrollY.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [adjustedSpeed * (index % 2 === 0 ? 1 : -1), 0, -adjustedSpeed * (index % 2 === 0 ? 1 : -1)],
      extrapolate: 'clamp',
    });
  };

  // Render each image with its parallax effect
  const renderImage = (src: string, index: number, columnIndex: number) => (
    <Animated.View
      key={index}
      style={[
        {
          height: imageHeight,
          width: imageWidth,
          marginBottom: 20,
          overflow: 'hidden',
          transform: [{ translateY: imageMove(index, columnIndex) }],
        },
        imageStyle,
      ]}
    >
      {blurEffect ? (
        <Image
          source={{ uri: src }}
          style={StyleSheet.absoluteFillObject}
          blurRadius={5}
          resizeMode="cover"
        />
      ) : (
        <Image
          source={{ uri: src }}
          style={{ height: '100%', width: '100%', borderRadius: 10 }}
          resizeMode="cover"
        />
      )}
      {icon && (
        <View style={{ position: 'absolute', top: '50%', left: '50%', transform: [{ translateX: -15 }, { translateY: -15 }] }}>
          <AntDesign name={icon} size={30} color="white" />
        </View>
      )}
    </Animated.View>
  );

  // Render the grid of images based on the number of columns
  const renderGrid = () => {
    const imagesPerColumn = Math.ceil(images.length / gridColumns);
    return Array.from({ length: gridColumns }).map((_, columnIndex) => (
      <View key={columnIndex} style={{ flex: 1, flexDirection: 'column', marginHorizontal: 10 }}>
        {images.slice(columnIndex * imagesPerColumn, (columnIndex + 1) * imagesPerColumn).map((image, idx) =>
          renderImage(image, columnIndex * imagesPerColumn + idx, columnIndex)
        )}
      </View>
    ));
  };

  // Wrap FlatList with Animated.createAnimatedComponent
  const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

  return (
    <AnimatedFlatList
      contentContainerStyle={[
        { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', paddingHorizontal: 10 },
        containerStyle,
      ]}
      data={images}
      renderItem={({ item, index }) => renderImage(item, index, index % gridColumns)}
      keyExtractor={(item, index) => index.toString()}
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
      scrollEventThrottle={16}
    />
  );
};

export default ParallaxScroll;

import React from 'react';
import { Image, Dimensions, StyleSheet } from 'react-native';
import GeneralCarousel from './GenericCarousel';

interface ImageItem {
  id: string;
  url: string;
  title: string;
}

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  image: {
    width: SCREEN_WIDTH,
    height: 300,
    resizeMode: 'cover',
  },
  carouselContainer: {
    height: 300,
    backgroundColor: '#000',
  },
});

const ImageCarousel: React.FC = () => {
  // Using Picsum for random beautiful images
  const images: ImageItem[] = [
    {
      id: '1',
      url: 'https://picsum.photos/800/600?random=1',
      title: 'Random Nature',
    },
    {
      id: '2',
      url: 'https://picsum.photos/800/600?random=2',
      title: 'Random Architecture',
    },
    {
      id: '3',
      url: 'https://picsum.photos/800/600?random=3',
      title: 'Random Landscape',
    },
    {
      id: '4',
      url: 'https://picsum.photos/800/600?random=4',
      title: 'Random City',
    },
    {
      id: '5',
      url: 'https://picsum.photos/800/600?random=5',
      title: 'Random Art',
    },
  ];

  const renderImage = (item: ImageItem) => (
    <Image
      source={{ uri: item.url }}
      style={styles.image}
      // Adding a placeholder color while image loads
      defaultSource={{ uri: 'https://via.placeholder.com/800x600/222222/ffffff?text=Loading...' }}
    />
  );

  return (
    <GeneralCarousel
      data={images}
      renderItem={renderImage}
      itemWidth={SCREEN_WIDTH}
      autoSwipeInterval={3000}
      showControls={true}
      showDots={true}
      containerStyle={styles.carouselContainer}
    />
  );
};

// Alternative example using Unsplash Source API
const AlternativeImageCarousel: React.FC = () => {
  const unsplashImages: ImageItem[] = [
    {
      id: '1',
      url: 'https://source.unsplash.com/800x600/?nature',
      title: 'Nature Shot',
    },
    {
      id: '2',
      url: 'https://source.unsplash.com/800x600/?city',
      title: 'City Shot',
    },
    {
      id: '3',
      url: 'https://source.unsplash.com/800x600/?technology',
      title: 'Technology Shot',
    },
    {
      id: '4',
      url: 'https://source.unsplash.com/800x600/?architecture',
      title: 'Architecture Shot',
    },
  ];

  const renderUnsplashImage = (item: ImageItem) => (
    <Image
      source={{ uri: item.url }}
      style={styles.image}
      // Adding a placeholder color while image loads
      defaultSource={{ uri: 'https://via.placeholder.com/800x600/222222/ffffff?text=Loading...' }}
    />
  );

  return (
    <GeneralCarousel
      data={unsplashImages}
      renderItem={renderUnsplashImage}
      itemWidth={SCREEN_WIDTH}
      autoSwipeInterval={4000}
      showControls={true}
      showDots={true}
      containerStyle={styles.carouselContainer}
    />
  );
};

export { ImageCarousel, AlternativeImageCarousel };
import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, FlatList, StyleSheet, PanResponder, useColorScheme, Text } from 'react-native';

interface CarouselProps<T> {
  data: T[];
  renderItem: (item: T) => React.ReactNode;
  itemWidth?: number;
  autoSwipeInterval?: number;
  showControls?: boolean;
  showDots?: boolean;
  containerStyle?: object;
  itemStyle?: object;
}

const styles = StyleSheet.create({
  carousel: {
    position: 'relative',
    width: '100%',
    height: 300,
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  prevBtn: {
    position: 'absolute',
    top: '50%',
    left: 10,
    zIndex: 10,
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
  },
  nextBtn: {
    position: 'absolute',
    top: '50%',
    right: 10,
    zIndex: 10,
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
  },
  arrowText: {
    fontSize: 24,
    color: '#fff',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeDot: {
    fontSize: 30,
    color: '#fff',
    margin: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  inactiveDot: {
    fontSize: 30,
    color: 'rgba(255, 255, 255, 0.5)',
    margin: 5,
  },
});

const SWIPE_THRESHOLD = 50;
const DEFAULT_AUTO_SWIPE_INTERVAL = 2000;

function GeneralCarousel<T>({
  data,
  renderItem,
  itemWidth = 300,
  autoSwipeInterval = DEFAULT_AUTO_SWIPE_INTERVAL,
  showControls = true,
  showDots = true,
  containerStyle = {},
  itemStyle = {},
}: CarouselProps<T>) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const flatListRef = useRef<FlatList>(null);
  const colorScheme = useColorScheme();
  const autoSwipeTimer = useRef<NodeJS.Timeout | null>(null);

  const startAutoSwipe = () => {
    if (autoSwipeTimer.current) {
      clearInterval(autoSwipeTimer.current);
    }
    autoSwipeTimer.current = setInterval(() => {
      if (!isPaused) {
        const nextIndex = (currentIndex + 1) % data.length;
        setCurrentIndex(nextIndex);
        scrollToIndex(nextIndex);
      }
    }, autoSwipeInterval);
  };

  const stopAutoSwipe = () => {
    if (autoSwipeTimer.current) {
      clearInterval(autoSwipeTimer.current);
      autoSwipeTimer.current = null;
    }
  };

  useEffect(() => {
    startAutoSwipe();
    return () => stopAutoSwipe();
  }, [currentIndex, isPaused]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
      },
      onPanResponderGrant: () => {
        setIsPaused(true);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -SWIPE_THRESHOLD && currentIndex < data.length - 1) {
          onNext();
        } else if (gestureState.dx > SWIPE_THRESHOLD && currentIndex > 0) {
          onPrev();
        } else {
          scrollToIndex(currentIndex);
        }
        setTimeout(() => setIsPaused(false), 1000);
      },
    })
  ).current;

  const scrollToIndex = (index: number) => {
    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0,
    });
  };

  const onNext = () => {
    const newIndex = (currentIndex + 1) % data.length;
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const onPrev = () => {
    const newIndex = currentIndex === 0 ? data.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const handleButtonPress = (action: () => void) => {
    setIsPaused(true);
    action();
    setTimeout(() => setIsPaused(false), 1000);
  };

  const renderCarouselItem = ({ item }: { item: T }) => (
    <View style={[styles.itemContainer, { width: itemWidth }, itemStyle]}>
      {renderItem(item)}
    </View>
  );

  const getItemLayout = (_: any, index: number) => ({
    length: itemWidth,
    offset: itemWidth * index,
    index,
  });

  return (
    <View style={[styles.carousel, containerStyle]}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderCarouselItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        getItemLayout={getItemLayout}
        {...panResponder.panHandlers}
      />
      
      {showControls && (
        <>
          <TouchableOpacity 
            style={styles.prevBtn} 
            onPress={() => handleButtonPress(onPrev)}
          >
            <Text style={styles.arrowText}>←</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.nextBtn} 
            onPress={() => handleButtonPress(onNext)}
          >
            <Text style={styles.arrowText}>→</Text>
          </TouchableOpacity>
        </>
      )}

      {showDots && (
        <View style={styles.dotsContainer}>
          {data.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                handleButtonPress(() => {
                  setCurrentIndex(index);
                  scrollToIndex(index);
                });
              }}
            >
              <Text style={index === currentIndex ? styles.activeDot : styles.inactiveDot}>•</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

export default GeneralCarousel;
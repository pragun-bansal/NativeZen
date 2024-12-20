import React, { useState, useEffect, useContext, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  RefreshControl,
  ScrollView,
} from 'react-native';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

// Theme context with proper typing
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

interface GridItem {
  id: string | number;
  content: string | React.ReactNode;
  backgroundColor?: string;
  onPress?: () => void;
}

interface GridProps {
  items: GridItem[];
  columns?: number;
  gap?: number;
  animationType?: 'fade' | 'slide' | 'scale' | 'rotate' | 'none';
  style?: any;
  itemStyle?: any;
  onRefresh?: () => Promise<void>;
  onEndReached?: () => void;
  itemAspectRatio?: number;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  staggerDelay?: number;
  onItemPress?: (item: GridItem) => void;
  masonry?: boolean;
}

const Grid: React.FC<GridProps> = ({
  items,
  columns = 2,
  gap = 10,
  animationType = 'fade',
  style,
  itemStyle,
  onRefresh,
  onEndReached,
  itemAspectRatio = 1,
  header,
  footer,
  staggerDelay = 100,
  onItemPress,
  masonry = false,
}) => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark';
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const [animations, setAnimations] = useState<Animated.Value[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [masonryHeights, setMasonryHeights] = useState<number[]>([]);

  // Handle screen rotation
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenWidth(window.width);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    });

    return () => {
      // @ts-ignore - Type definitions might be outdated
      subscription?.remove();
    };
  }, []);

  // Initialize animations
  useEffect(() => {
    if (items.length && animations.length !== items.length) {
      const newAnimations = items.map(() => new Animated.Value(0));
      setAnimations(newAnimations);
    }
  }, [items]);

  const getAnimationStyle = useCallback((animation: Animated.Value) => {
    switch (animationType) {
      case 'fade':
        return {
          opacity: animation,
        };
      case 'slide':
        return {
          opacity: animation,
          transform: [
            {
              translateY: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
        };
      case 'scale':
        return {
          opacity: animation,
          transform: [
            {
              scale: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0.5, 1],
              }),
            },
          ],
        };
      case 'rotate':
        return {
          opacity: animation,
          transform: [
            {
              rotate: animation.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg'],
              }),
            },
          ],
        };
      default:
        return {};
    }
  }, [animationType]);

  const handleAnimation = (index: number) => {
    if (animations[index]) {
      Animated.timing(animations[index], {
        toValue: 1,
        duration: 500,
        delay: staggerDelay * index,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleRefresh = async () => {
    if (onRefresh) {
      setRefreshing(true);
      await onRefresh();
      setRefreshing(false);
    }
  };

  const itemWidth = (screenWidth - gap * (columns + 1)) / columns;

  const renderItem = (item: GridItem, index: number) => {
    const styleForAnimation = animations[index] ? getAnimationStyle(animations[index]) : {};

    const itemHeight = masonry ? masonryHeights[index] || itemWidth * itemAspectRatio : itemWidth * itemAspectRatio;

    return (
      <Animated.View
        key={item.id}
        style={[
          styles.item,
          {
            width: itemWidth,
            height: itemHeight,
            margin: gap / 2,
            backgroundColor: item.backgroundColor || (isDarkMode ? '#333' : '#f5f5f5'),
          },
          styleForAnimation,
          itemStyle,
        ]}
        onLayout={() => handleAnimation(index)}
      >
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => onItemPress ? onItemPress(item) : item.onPress?.()}
          activeOpacity={0.7}
        >
          {typeof item.content === 'string' ? (
            <Text style={[
              styles.itemText,
              isDarkMode ? styles.darkText : styles.lightText
            ]}>
              {item.content}
            </Text>
          ) : (
            item.content
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <ScrollView
      style={[styles.container, style]}
      refreshControl={
        onRefresh ? (
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        ) : undefined
      }
      onScroll={({ nativeEvent }) => {
        const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
        const paddingToBottom = 20;
        if (layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom) {
          onEndReached?.();
        }
      }}
      scrollEventThrottle={400}
    >
      {header}
      <View style={[
        styles.grid,
        { padding: gap / 2 }
      ]}>
        {items.map((item, index) => renderItem(item, index))}
      </View>
      {footer}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  touchable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  lightText: {
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
});

export default Grid;
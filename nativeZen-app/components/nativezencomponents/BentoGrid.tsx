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
  ScrollView,
} from 'react-native';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Define grid item sizes
type GridSize = 'small' | 'medium' | 'large' | 'wide' | 'tall';

interface BentoItem {
  id: string | number;
  content: string | React.ReactNode;
  size: GridSize;
  backgroundColor?: string;
  onPress?: () => void;
  priority?: number; // For responsive layout adjustments
  animationDelay?: number;
}

interface BentoGridProps {
  items: BentoItem[];
  gap?: number;
  animationType?: 'fade' | 'slide' | 'scale' | 'rotate' | 'none';
  style?: any;
  itemStyle?: any;
  baseItemSize?: number;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  onItemPress?: (item: BentoItem) => void;
  layout?: 'fixed' | 'adaptive';
  maxColumns?: number;
  aspectRatio?: number;
}

const BentoGrid: React.FC<BentoGridProps> = ({
  items,
  gap = 10,
  animationType = 'scale',
  style,
  itemStyle,
  baseItemSize = 120,
  header,
  footer,
  onItemPress,
  layout = 'fixed',
  maxColumns = 4,
  aspectRatio = 1,
}) => {
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const [animations] = useState<{ [key: string]: Animated.Value }>({});
  const [layoutPattern, setLayoutPattern] = useState<number[][]>([]);

  // Initialize animations for each item
  useEffect(() => {
    items.forEach((item) => {
      if (!animations[item.id]) {
        animations[item.id] = new Animated.Value(0); // Initialize animation
      }
    });
  }, [items]);

  // Handle screen rotation and layout updates
  useEffect(() => {
    const handleDimensionsChange = ({ window }: { window: any }) => {
      setScreenWidth(window.width);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    };

    const subscription = Dimensions.addEventListener('change', handleDimensionsChange);
    return () => {
      // @ts-ignore - Type definitions might be outdated
      subscription?.remove();
    };
  }, []);

  // Calculate item dimensions based on size type
  const getItemDimensions = useCallback((size: GridSize, availableWidth: number) => {
    const unit = (availableWidth - (maxColumns + 1) * gap) / maxColumns;
    
    switch (size) {
      case 'small':
        return { width: unit, height: unit * aspectRatio };
      case 'medium':
        return { width: unit * 2 + gap, height: unit * aspectRatio };
      case 'large':
        return { width: unit * 2 + gap, height: unit * 2 * aspectRatio + gap };
      case 'wide':
        return { width: unit * 3 + gap * 2, height: unit * aspectRatio };
      case 'tall':
        return { width: unit, height: unit * 2 * aspectRatio + gap };
      default:
        return { width: unit, height: unit * aspectRatio };
    }
  }, [gap, maxColumns, aspectRatio]);

  // Bounce configurations
  const getAnimationStyle = useCallback((animation: Animated.Value) => {
    if (!animation) return {}; // Prevent errors if animation is undefined

    switch (animationType) {
      case 'fade':
        return { opacity: animation };
      case 'scale':
        return {
          opacity: animation,
          transform: [{
            scale: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0.8, 1],
            }),
          }],
        };
      case 'slide':
        return {
          opacity: animation,
          transform: [{
            translateY: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [50, 0],
            }),
          }],
        };
      case 'rotate':
        return {
          opacity: animation,
          transform: [{
            rotate: animation.interpolate({
              inputRange: [0, 1],
              outputRange: ['45deg', '0deg'],
            }),
          }],
        };
      default:
        return {};
    }
  }, [animationType]);

  // Handle item animation
  const animateItem = useCallback((id: string | number, delay: number = 0) => {
    if (!animations[id]) return; // Ensure animation exists before starting
    Animated.timing(animations[id], {
      toValue: 1,
      duration: 500,
      delay,
      useNativeDriver: true,
    }).start();
  }, [animations]);

  // Render individual grid item
  const renderItem = useCallback((item: BentoItem, index: number) => {
    const dimensions = getItemDimensions(item.size, screenWidth);
    const animationStyle = getAnimationStyle(animations[item.id]);

    return (
      <Animated.View
        key={item.id}
        style={[ 
          styles.item, 
          {
            width: dimensions.width,
            height: dimensions.height,
            margin: gap / 2,
            backgroundColor: item.backgroundColor || '#f5f5f5',
          },
          animationStyle,
          itemStyle,
        ]}
        onLayout={() => animateItem(item.id, item.animationDelay || index * 100)}
      >
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => onItemPress?.(item)}
          activeOpacity={0.7}
        >
          {typeof item.content === 'string' ? (
            <Text style={styles.itemText}>{item.content}</Text>
          ) : (
            item.content
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  }, [screenWidth, gap, getItemDimensions, getAnimationStyle, animations, itemStyle, onItemPress]);

  // Create adaptive layout based on screen size
  const createAdaptiveLayout = useCallback(() => {
    const availableWidth = screenWidth - gap * 2;
    const columns = Math.min(Math.floor(availableWidth / (baseItemSize + gap)), maxColumns);
    let currentRow: BentoItem[] = [];
    const rows: BentoItem[][] = [];

    items.sort((a, b) => (b.priority || 0) - (a.priority || 0));

    items.forEach((item) => {
      const itemWidth = getItemDimensions(item.size, screenWidth).width;
      const rowWidth = currentRow.reduce((sum, rowItem) => 
        sum + getItemDimensions(rowItem.size, screenWidth).width + gap, 0);

      if (rowWidth + itemWidth <= availableWidth) {
        currentRow.push(item);
      } else {
        rows.push([...currentRow]);
        currentRow = [item];
      }
    });

    if (currentRow.length > 0) {
      rows.push(currentRow);
    }

    return rows;
  }, [items, screenWidth, gap, baseItemSize, maxColumns, getItemDimensions]);

  // Render the grid
  const renderGrid = () => {
    if (layout === 'adaptive') {
      const adaptiveLayout = createAdaptiveLayout();
      return adaptiveLayout.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((item, index) => renderItem(item, rowIndex * maxColumns + index))}
        </View>
      ));
    }

    return items.map((item, index) => renderItem(item, index));
  };

  return (
    <ScrollView style={[styles.container, style]}>
      {header}
      <View style={[styles.grid, { padding: gap / 2 }]}>
        {renderGrid()}
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
    justifyContent: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
  },
  item: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  touchable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default BentoGrid;

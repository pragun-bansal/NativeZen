import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, LayoutAnimation, Platform, UIManager } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

// Enable layout animations for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Predefined themes
export const defaultThemes = {
  light: {
    background: 'bg-white',
    titleColor: 'text-gray-900',
    contentColor: 'text-gray-700',
    iconColor: 'text-gray-600',
    expandedBackground: 'bg-gray-50',
  },
  dark: {
    background: 'bg-gray-900',
    titleColor: 'text-gray-100',
    contentColor: 'text-gray-300',
    iconColor: 'text-gray-400',
    expandedBackground: 'bg-gray-800',
  }
};

export interface AccordionProps {
  title: string;
  content: string;
  theme?: keyof typeof defaultThemes | { [key: string]: string };
  icon?: React.ComponentProps<typeof AntDesign>['name'];
  expandedIcon?: React.ComponentProps<typeof AntDesign>['name'];
  customStyles?: {
    container?: string;
    title?: string;
    content?: string;
    icon?: string;
  };
  animationStyle?: 'fade' | 'scale';
  onExpand?: () => void;
  onCollapse?: () => void;
  defaultExpanded?: boolean;
  iconSize?: number;
  animationDuration?: number;
  blurEffect?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  content,
  theme = 'light',
  icon = 'down',
  expandedIcon = 'up',
  customStyles = {},
  animationStyle = 'fade', // default to fade animation
  onExpand,
  onCollapse,
  defaultExpanded = false,
  iconSize = 20,
  animationDuration = 300,
  blurEffect = false
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const fadeAnim = useRef(new Animated.Value(defaultExpanded ? 1 : 0)).current;
  const scaleAnim = useRef(new Animated.Value(defaultExpanded ? 1 : 0.95)).current;

  const selectedTheme = typeof theme === 'string' ? defaultThemes[theme] : theme;

  const toggleAccordion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);

    // Start the animation based on the selected style
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: isExpanded ? 0 : 1,
        duration: animationDuration,
        useNativeDriver: true
      }),
      Animated.spring(scaleAnim, {
        toValue: isExpanded ? 0.95 : 1,
        friction: 5,
        useNativeDriver: true
      })
    ]).start();

    isExpanded ? onCollapse?.() : onExpand?.();
  };

  const animatedStyles = {
    fade: { opacity: fadeAnim },
    scale: { transform: [{ scale: scaleAnim }] }
  };

  const Container = blurEffect ? BlurView : View;

  return (
    <Animated.View 
      style={[animatedStyles[animationStyle]]}
      className={`${selectedTheme.background} rounded-2xl overflow-hidden shadow-lg ${customStyles.container || ''}`}
    >
      <TouchableOpacity
        onPress={toggleAccordion}
        activeOpacity={0.7}
        className={`p-5 flex-row justify-between items-center transition-all ease-in-out duration-300 ${isExpanded ? selectedTheme.expandedBackground : ''}`}
      >
        <View className="flex-1 pr-4">
          {/* Wrapping title text with <Text> component */}
          <Text className={`text-xl font-semibold ${selectedTheme.titleColor} ${customStyles.title || ''}`}>
            {title}
          </Text>
        </View>
        <AntDesign
          name={isExpanded ? expandedIcon : icon}
          size={iconSize}
          className={`${selectedTheme.iconColor} ${customStyles.icon || ''}`}
        />
      </TouchableOpacity>

      {isExpanded && (
        <Animated.View 
          style={{
            ...animatedStyles[animationStyle],
            paddingHorizontal: 16,
            paddingBottom: 16,
            paddingTop: 8
          }}
        >
          {/* Wrapping content text with <Text> component */}
          <Text className={`text-md ${selectedTheme.contentColor} ${customStyles.content || ''}`}>
            {content}
          </Text>
        </Animated.View>
      )}
    </Animated.View>
  );
};

export default Accordion;

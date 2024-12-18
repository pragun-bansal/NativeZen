import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, LayoutAnimation, Platform, UIManager } from 'react-native';
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { BlurView } from 'expo-blur';

// Enable layout animations for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Predefined themes
export const themes = {
  light: {
    background: 'bg-white',
    questionColor: 'text-gray-900',
    answerColor: 'text-gray-700',
    iconColor: 'text-gray-600',
    expandedBackground: 'bg-gray-50',
  },
  dark: {
    background: 'bg-gray-900',
    questionColor: 'text-gray-100',
    answerColor: 'text-gray-300',
    iconColor: 'text-gray-400',
    expandedBackground: 'bg-gray-800',
  },
  ocean: {
    background: 'bg-blue-50',
    questionColor: 'text-blue-900',
    answerColor: 'text-blue-800',
    iconColor: 'text-blue-600',
    expandedBackground: 'bg-blue-100',
  },
  forest: {
    background: 'bg-green-50',
    questionColor: 'text-green-900',
    answerColor: 'text-green-800',
    iconColor: 'text-green-600',
    expandedBackground: 'bg-green-100',
  }
};

export interface FAQCardProps {
  question: string;
  answer: string;
  theme?: keyof typeof themes;
  icon?: React.ComponentProps<typeof AntDesign>['name'];
  expandedIcon?: React.ComponentProps<typeof AntDesign>['name'];
  customStyles?: {
    container?: string;
    question?: string;
    answer?: string;
    icon?: string;
  };
  animationStyle?: 'fade' | 'slide' | 'scale';
  onExpand?: () => void;
  onCollapse?: () => void;
  defaultExpanded?: boolean;
  iconSize?: number;
  animationDuration?: number;
  blurEffect?: boolean;
}

const FAQCard: React.FC<FAQCardProps> = ({
  question,
  answer,
  theme = 'light',
  icon = 'down',
  expandedIcon = 'up',
  customStyles = {},
  animationStyle = 'fade',
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
  const slideAnim = useRef(new Animated.Value(defaultExpanded ? 1 : 0)).current;

  const selectedTheme = themes[theme];

  const toggleFAQ = () => {
    // Trigger layout animation
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    
    setIsExpanded(!isExpanded);

    // Animate based on selected style
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
      }),
      Animated.timing(slideAnim, {
        toValue: isExpanded ? 0 : 1,
        duration: animationDuration,
        useNativeDriver: true
      })
    ]).start();

    // Call expand/collapse callbacks
    isExpanded ? onCollapse?.() : onExpand?.();
  };

  const animatedStyles = {
    fade: { opacity: fadeAnim },
    scale: { transform: [{ scale: scaleAnim }] },
    slide: { 
      transform: [{ 
        translateY: slideAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [-20, 0]
        })
      }]
    }
  };

  const Container = blurEffect ? BlurView : View;

  return (
    <Animated.View 
      style={[
        animatedStyles[animationStyle],
            { marginBottom: isExpanded ? 8 : 5,
                marginTop: isExpanded ? 8 : 5
             }, 
      ]}
      className={`${selectedTheme.background} rounded-xl overflow-hidden shadow-md ${customStyles.container || ''}`}
    >
      <TouchableOpacity 
        onPress={toggleFAQ}
        className={`p-4 flex-row justify-between items-center ${isExpanded ? selectedTheme.expandedBackground : ''}`}
      >
        <View className="flex-1 pr-4">
          <Text className={`text-lg font-bold ${selectedTheme.questionColor} ${customStyles.question || ''}`}>
            {question}
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
            paddingBottom: 16
          }}
        >
          <Text className={`text-sm ${selectedTheme.answerColor} ${customStyles.answer || ''}`}>
            {answer}
          </Text>
        </Animated.View>
      )}
    </Animated.View>
  );
};

export default FAQCard;
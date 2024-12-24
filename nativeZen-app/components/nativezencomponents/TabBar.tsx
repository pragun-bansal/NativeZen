import React, { useState, ReactNode } from "react";
import {
  View,
  StyleSheet,
  LayoutChangeEvent,
  Pressable,
  Text,
  StyleProp,
  ViewStyle,
} from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type LabelPosition = 'below-icon' | 'beside-icon';
type BarVariant = 'default' | 'text-outside' | 'top-line' | 'text-right' | 'curved-raised';

interface BottomBarProps extends BottomTabBarProps {
  darkTheme?: boolean;
  activeTabColor?: string;
  inactiveTabColor?: string;
  backgroundColor?: string;
  indicatorColor?: string;
  iconSize?: number;
  labelSize?: number;
  onTabPress?: (routeName: string) => void;
  customIndicatorStyle?: Animated.AnimateStyle<StyleProp<ViewStyle>>;
  showIndicator?: boolean;
  isFloating?: boolean;
  barStyle?: "default" | "curved";
  showText?: boolean;
  centerButton?: {
    icon: React.ReactNode;
    onPress: () => void;
    size?: number;
    backgroundColor?: string;
    padding?: number;
    leftItemCount?: number;
  };
  curveHeight?: number;
  curveStyle?: {
    backgroundColor?: string;
    shadowColor?: string;
    shadowOpacity?: number;
    elevation?: number;
  };
  barVariant?: BarVariant;
  activeLineHeight?: number;
  activeLineWidth?: number;
  raisedHeight?: number;
  activeIconColor?: string;
  activeTextColor?: string;
}

const BottomBar: React.FC<BottomBarProps> = ({
  state,
  descriptors,
  navigation,
  darkTheme = false,
  activeTabColor = "#000000",
  inactiveTabColor = "#757575",
  backgroundColor = darkTheme ? "#121212" : "#ffffff",
  indicatorColor = darkTheme ? "#000000" : "#03dac6",
  iconSize = 26,
  labelSize = 12,
  onTabPress,
  customIndicatorStyle,
  showIndicator = false,
  isFloating = true,
  barStyle = "curved",
  showText = false,
  centerButton,
  curveHeight = 15,
  curveStyle = {
    backgroundColor: "transparent",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    elevation: 5,
  },
  barVariant = 'text-right',
  activeLineHeight = 3,
  activeLineWidth = 20,
  raisedHeight = 10,
  activeIconColor,
  activeTextColor,
}: BottomBarProps) => {
  const [dimensions, setDimensions] = useState<{ height: number; width: number }>({ 
    height: 50, 
    width: 100 
  });
  const buttonWidth = centerButton 
    ? (dimensions.width - (centerButton?.size || 60)) / state.routes.length
    : dimensions.width / state.routes.length;
  const tabPositionX = useSharedValue(0);
  const tabScale = useSharedValue(1);
  const tabOpacity = useSharedValue(1);
  const indicatorScale = useSharedValue(1);

  const onTabbarLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  };

  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: tabPositionX.value },
      { scaleX: indicatorScale.value }
    ],
    opacity: tabOpacity.value,
  }));

  const animatedTabStyle = useAnimatedStyle(() => ({
    transform: [{ scale: tabScale.value }],
  }));

  const barStyles = [
    styles.tabbar,
    { backgroundColor },
    isFloating && styles.floatingBar,
    barStyle === "curved" && styles.curvedBar,
    barStyle === "default" && styles.defaultBar,
  ];

  const renderLabel = (label: string | ((props: any) => ReactNode), isFocused: boolean, color: string, variant: BarVariant): ReactNode => {
    if (typeof label === 'function') {
      return label({
        focused: isFocused,
        color: color,
        position: variant === 'text-right' ? 'beside-icon' : 'below-icon',
        children: ''
      });
    }
    
    const labelStyle = [
      styles.label,
      {
        color: isFocused && (barVariant === 'text-right' || barVariant === 'text-outside') 
          ? '#ffffff' 
          : isFocused 
            ? (activeTextColor || activeTabColor) 
            : inactiveTabColor,
        fontSize: labelSize,
      },
      variant === 'text-outside' && styles.textOutsideLabel,
      variant === 'text-right' && styles.textRightLabel,
    ];

    return variant !== 'curved-raised' ? (
      <Text style={labelStyle}>
        {label}
      </Text>
    ) : null;
  };

  const getCurvedBackground = () => {
    if (barStyle !== "curved") return null;
    
    return (
      <View
        style={[
          styles.curvedBackground,
          {
            height: curveHeight,
            backgroundColor: curveStyle.backgroundColor,
            shadowColor: curveStyle.shadowColor,
            shadowOpacity: curveStyle.shadowOpacity,
            elevation: curveStyle.elevation,
          },
        ]}
      />
    );
  };

  const leftItemCount = centerButton?.leftItemCount ?? Math.floor(state.routes.length / 2);
  const getAdjustedIndex = (index: number) => {
    if (!centerButton) return index;
    const centerIndex = leftItemCount;
    if (index >= centerIndex) {
      return index + 1;
    }
    return index;
  };

  const centerButtonStyles = [
    styles.centerButton,
    {
      width: centerButton?.size || 60,
      height: centerButton?.size || 60,
      backgroundColor: centerButton?.backgroundColor || '#ffffff',
      padding: centerButton?.padding || 12,
      borderRadius: (centerButton?.size || 60) / 2,
      left: (dimensions.width - (centerButton?.size || 60)) / 2,
    },
  ];

  return (
    <View onLayout={onTabbarLayout} style={[
      barStyles,
      barVariant === 'curved-raised' && styles.raisedBar
    ]}>
      {getCurvedBackground()}
      {showIndicator && (
        <Animated.View
          style={[
            styles.indicator,
            {
              backgroundColor: indicatorColor,
              width: buttonWidth,
            },
            animatedIndicatorStyle,
            customIndicatorStyle,
          ]}
        />
      )}
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const handlePress = () => {
          tabPositionX.value = withTiming(buttonWidth * index, { duration: 200 });
          tabScale.value = withTiming(0.9, { duration: 100 }, () => {
            tabScale.value = withTiming(1, { duration: 100 });
          });
          indicatorScale.value = withTiming(0.8, { duration: 150 }, () => {
            indicatorScale.value = withTiming(1, { duration: 150 });
          });

          if (onTabPress) onTabPress(route.name);

          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const handleLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        const isAfterCenter = centerButton && index >= leftItemCount;
        const adjustedIndex = getAdjustedIndex(index);

        const tabContainerStyle = [
          styles.iconContainer,
          isFocused && barVariant === 'default' && styles.activeCircle,
          isFocused && barVariant === 'text-right' && [
            styles.textRightContainer,
            { backgroundColor: backgroundColor }
          ],
          isFocused && barVariant === 'curved-raised' && styles.curvedRaisedContainer,
          barVariant === 'text-right' && styles.textRightBase,
          (isFocused && (barVariant === 'text-right' || barVariant === 'text-outside')) && {
            backgroundColor: activeTabColor,
            borderRadius: 20,
            padding: 8,
          }
        ];

        return (
          <Pressable
            key={route.name}
            onPress={handlePress}
            onLongPress={handleLongPress}
            style={[
              styles.tabButton,
              barVariant === 'curved-raised' && styles.raisedTabButton,
              centerButton && index >= leftItemCount && {
                marginLeft: centerButton?.size || 60,
              },
            ]}
          >
            {isFocused && barVariant === 'top-line' && (
              <View style={[
                styles.topLine,
                { backgroundColor: activeTabColor, height: activeLineHeight, width: activeLineWidth }
              ]} />
            )}
            <View style={tabContainerStyle}>
              {options.tabBarIcon &&
                options.tabBarIcon({
                  color: isFocused && (barVariant === 'text-right' || barVariant === 'text-outside') 
                    ? '#ffffff' 
                    : isFocused 
                      ? (activeIconColor || activeTabColor) 
                      : inactiveTabColor,
                  size: iconSize,
                  focused: isFocused,
                })}
              {showText && renderLabel(
                label, 
                isFocused, 
                isFocused ? activeTabColor : inactiveTabColor,
                barVariant
              )}
            </View>
          </Pressable>
        );
      })}
      {centerButton && (
        <Pressable
          onPress={centerButton.onPress}
          style={centerButtonStyles}
        >
          {centerButton.icon}
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tabbar: {
    flexDirection: "row",
    alignItems: "center",
    height: 80,
    paddingTop: 5,
    paddingBottom: 5,
    paddingHorizontal: 10,
    position: 'relative',
    marginBottom: 20,
    opacity: 0.99
  },
  floatingBar: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  defaultBar: {
    borderRadius: 0,
  },
  curvedBar: {
    borderRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  curvedBackground: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
  },
  indicator: {
    position: "absolute",
    height: 4,
    bottom: 0,
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  curvedTabButton: {
    marginBottom: 10,
  },
  iconContainer: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  activeCircle: {
    position: "relative",
    top: 0,
    width: 80,
    height: 40,
    borderRadius: 25,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    paddingVertical: 5,
  },
  curvedActiveCircle: {
    // Add any specific styles for curved mode
  },
  label: {
    marginTop: 2,
    marginBottom:2,
    textAlign: "center",
    fontSize: 10,
  },
  centerButton: {
    position: "absolute",
    bottom: 20,
    transform: [{ translateX: -30 }, { translateY: -15 }],
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    zIndex: 1,
  },
  textOutsideLabel: {
    position: 'absolute',
    bottom: -20,
  },
  textRightLabel: {
    marginLeft: 8,
    marginTop: 0,
  },
  textRightContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  textRightBase: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topLine: {
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: [{ translateX: -10 }],
  },
  raisedBar: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  raisedTabButton: {
    transform: [{ translateY: -10 }],
  },
  curvedRaisedContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default BottomBar;

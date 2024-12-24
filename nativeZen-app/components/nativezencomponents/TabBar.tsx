import React, { useState } from "react";
import {
  View,
  StyleSheet,
  LayoutChangeEvent,
  Pressable,
  Text,
} from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface BottomBarProps extends BottomTabBarProps {
  darkTheme?: boolean;
  activeTabColor?: string;
  inactiveTabColor?: string;
  backgroundColor?: string;
  indicatorColor?: string;
  iconSize?: number;
  labelSize?: number;
  onTabPress?: (routeName: string) => void;
  customIndicatorStyle?: object;
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
  };
}

const BottomBar: React.FC<BottomBarProps> = ({
  state,
  descriptors,
  navigation,
  darkTheme = false,
  activeTabColor = darkTheme ? "#ffffff" : "#000000",
  inactiveTabColor = darkTheme ? "#777777" : "#cccccc",
  backgroundColor = darkTheme ? "#121212" : "#ffffff",
  indicatorColor = darkTheme ? "#6200ee" : "#03dac6",
  iconSize = 24,
  labelSize = 12,
  onTabPress,
  customIndicatorStyle,
  showIndicator = false,
  isFloating = false,
  barStyle = "default",
  showText = false,
  centerButton,
}: BottomBarProps) => {
  const [dimensions, setDimensions] = useState({ height: 50, width: 100 });
  const buttonWidth = centerButton 
    ? dimensions.width / (state.routes.length + 1)
    : dimensions.width / state.routes.length;
  const tabPositionX = useSharedValue(0);

  const onTabbarLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  };

  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: tabPositionX.value }],
  }));

  const barStyles = [
    styles.tabbar,
    { backgroundColor },
    isFloating && styles.floatingBar,
    barStyle === "curved" && styles.curvedBar,
  ];

  return (
    <View onLayout={onTabbarLayout} style={barStyles}>
      {barStyle === "curved" && <View style={styles.curvedBackground} />}
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

        const isAfterCenter = centerButton && index >= Math.floor(state.routes.length / 2);
        const adjustedIndex = isAfterCenter ? index + 1 : index;

        return (
          <Pressable
            key={route.name}
            onPress={handlePress}
            onLongPress={handleLongPress}
            style={[
              styles.tabButton,
              barStyle === "curved" && styles.curvedTabButton,
              centerButton && {
                marginLeft: index === Math.floor(state.routes.length / 2) ? buttonWidth : 0,
              },
            ]}
          >
            <View style={[
              styles.iconContainer,
              isFocused && barStyle === "curved" && styles.activeCircle
            ]}>
              {options.tabBarIcon &&
                options.tabBarIcon({
                  color: isFocused ? activeTabColor : inactiveTabColor,
                  size: iconSize,
                  focused: isFocused,
                })}
              {showText && (
                <Text
                  style={[
                    styles.label,
                    {
                      color: isFocused ? activeTabColor : inactiveTabColor,
                      fontSize: labelSize,
                    },
                  ]}
                >
                  {label}
                </Text>
              )}
            </View>
          </Pressable>
        );
      })}
      {centerButton && (
        <Pressable
          onPress={centerButton.onPress}
          style={[
            styles.centerButton,
            {
              width: centerButton.size || 60,
              height: centerButton.size || 60,
              backgroundColor: centerButton.backgroundColor || '#ffffff',
              padding: centerButton.padding || 12,
              borderRadius: (centerButton.size || 60) / 2,
            },
          ]}
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
    height: 60,
    paddingTop: 10,
    paddingBottom: 10,
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
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  curvedBar: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  curvedBackground: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 30,
    backgroundColor: "transparent",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
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
  },
  activeCircle: {
    position: "relative",
    top: 0,
    width: 50,
    height: 50,
    borderRadius: 25,
    // backgroundColor: "#ffffff",
    
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    paddingBottom: 5,
  },
  label: {
    marginTop: 2,
    textAlign: "center",
    fontSize: 10,
  },
  centerButton: {
    position: "absolute",
    bottom: 25,
    left: '50%',
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
});

export default BottomBar;

import React, { useState, useEffect } from "react";
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
  withSpring,
  withTiming,
  interpolate,
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
  isFloating?: boolean;
  barStyle?: "default" | "curved";
  showText?: boolean;
  centerButton?: {
    icon: React.ReactNode;
    onPress: () => void;
    size?: number;
    backgroundColor?: string;
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
  isFloating = false,
  barStyle = "default",
  showText = true,
  centerButton,
}: BottomBarProps) => {
  const [dimensions, setDimensions] = useState({ height: 50, width: 100 });
  const buttonWidth = dimensions.width / (state.routes.length + (centerButton ? 1 : 0));
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
    <View
      onLayout={onTabbarLayout}
      style={barStyles}>
      {barStyle === "curved" && <View style={styles.curvedBackground} />}
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
      {centerButton && (
        <Pressable
          onPress={centerButton.onPress}
          style={[
            styles.centerButton,
            {
              width: centerButton.size || 60,
              height: centerButton.size || 60,
              backgroundColor: centerButton.backgroundColor || indicatorColor,
            },
          ]}>
          {centerButton.icon}
        </Pressable>
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

        return (
          <Pressable
            key={route.name}
            onPress={handlePress}
            onLongPress={handleLongPress}
            style={[styles.tabButton, barStyle === "curved" && styles.curvedTabButton]}>
            <View
              style={[
                isFocused && barStyle === "curved" && styles.activeCircle,
              ]}>
              {options.tabBarIcon &&
                options.tabBarIcon({
                  color: isFocused ? activeTabColor : inactiveTabColor,
                  size: iconSize,
                  focused: isFocused,
                })}
            </View>
            {showText && (
              <Animated.Text
                style={[
                  styles.label,
                  {
                    color: isFocused ? activeTabColor : inactiveTabColor,
                    fontSize: labelSize,
                  },
                ]}>
                {label}
              </Animated.Text>
            )}
          </Pressable>
        );
      })}
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
  },
  floatingBar: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  curvedBar: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  curvedBackground: {
    position: "absolute",
    bottom: -30,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
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
  activeCircle: {
    position: "absolute",
    top: -15,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  label: {
    marginTop: 4,
    textAlign: "center",
  },
  centerButton: {
    position: "absolute",
    bottom: -30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
});

export default BottomBar;

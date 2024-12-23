import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import BottomBar from '@/components/nativezencomponents/TabBar';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
    tabBar={(props) =>  <BottomBar
      {...props}
      darkTheme={true} // Uses the dark theme
      activeTabColor="#33333" // Color for active tabs
      isFloating
      inactiveTabColor="#888888" // Color for inactive tabs
      backgroundColor="#333333" // Background color for the bar
      indicatorColor="#00ffcc" // Indicator line color
      iconSize={28} // Size of the icons
      labelSize={12} // Size of the text labels
      barStyle="curved" // Curved style for the bar
      showText={true} // Toggles whether to show text labels
      centerButton={{
        icon: <IconSymbol size={28} name="paperplane.fill" color={"black"} />, // Replace with your custom icon component
        onPress: () => console.log("Center button pressed"), // Define onPress behavior
        size: 20, // Size of the center button
        backgroundColor: "#ff5733", // Background color for the center button
      }}
      onTabPress={(routeName) =>
        console.log(`Tab pressed: ${routeName}`)
      } // Optional callback for tab press
    />}
      // screenOptions={{
      //   tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      //   headerShown: false,
      //   tabBarButton: HapticTab,
      //   tabBarBackground: TabBarBackground,
      //   tabBarStyle: Platform.select({
      //     ios: {
      //       // Use a transparent background on iOS to show the blur effect
      //       position: 'absolute',
      //     },
      //     default: {},
      //   }),
      // }}
      >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}

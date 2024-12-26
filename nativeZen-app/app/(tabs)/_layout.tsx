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
    tabBar={(props) => <BottomBar
      {...props}
      darkTheme={true}
      isFloating={false}
      backgroundColor="#333333"
      activeTabColor="#000000"
      inactiveTabColor="#666666"
      showText={true}
      iconSize={28}
      labelSize={12}
      barVariant="text-right"
      activeTextColor='#848484'
      activeIconColor='#00ffcc'
      // centerButton={{
      //   icon: <IconSymbol size={32} name="paperplane.fill" color="#333333" />,
      //   onPress: () => console.log("Center button pressed"),
      //   size: 60,
      //   backgroundColor: "#00ffcc"
      // }}
      onTabPress={(routeName) => console.log(`Tab pressed: ${routeName}`)}
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
            name="form"
            options={{
                title: 'Form',
                tabBarIcon: ({ color }) => <IconSymbol size={28} name="list.dash" color={color} />,
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

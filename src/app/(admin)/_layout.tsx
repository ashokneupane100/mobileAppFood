import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context"; // Import useSafeAreaInsets

import Colors from "@/constants/Colors";
import { useColorScheme } from "@components/useColorScheme";
import { useClientOnlyValue } from "@components/useClientOnlyValue";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />; // Increased size to 20
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets(); // Get safe area insets

  console.log("Admin TabLayout - tabBarStyle:", {
    backgroundColor: Colors.light.tint,
    paddingBottom: Platform.OS === "android" ? insets.bottom + 10 : 0,
  });

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.background,
        tabBarInactiveTintColor: "gainsboro",
        tabBarStyle: {
          backgroundColor: Colors.light.tint, // Blue background
          height: 60, // Increase tab bar height for better visibility
          paddingBottom:
            Platform.OS === "android" ? insets.bottom + 10 : 0, // Add padding to account for system navigation bar
          paddingTop: 5, // Add some padding at the top for balance
        },
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "bold",
          marginBottom: 5, // Adjust label position
        },
      }}
    >
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen
        name="menu/index" // Match the file-based route
        options={{
          title: "Menu",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="cutlery" color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "Orders",
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />
    </Tabs>
  );
}
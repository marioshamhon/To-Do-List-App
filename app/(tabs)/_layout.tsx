import React from "react";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "tailwindcss/colors";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        sceneStyle: { backgroundColor: "transparent" },
        tabBarStyle: {
          backgroundColor: "transparent",
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color="white"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={24}
              color="white"
            />
          ),
          title: "Profile",
        }}
      />
    </Tabs>
  );
};

export default _layout;

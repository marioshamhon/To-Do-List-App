import React from "react";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "tailwindcss/colors";

const _layout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
          tabBarActiveTintColor: colors.blue[600],
          tabBarIcon: () => (
            <Ionicons name="home-outline" size={24} color="black" />
          ),
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: () => (
            <Ionicons name="person-outline" size={24} color="black" />
          ),
          title: "Profile",
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default _layout;

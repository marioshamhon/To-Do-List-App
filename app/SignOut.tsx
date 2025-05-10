import React from "react";
import { View, Text, Pressable } from "react-native";

export default function SignOut() {
  return (
    <View className="flex-1 justify-center px-4 bg-white ">
      <Text className="text-2xl font-bold mb-6 text-center">Sign out</Text>

      <Pressable className="bg-blue-600 rounded py-3">
        <Text className="text-center text-white font-semibold">Sign out</Text>
      </Pressable>
    </View>
  );
}

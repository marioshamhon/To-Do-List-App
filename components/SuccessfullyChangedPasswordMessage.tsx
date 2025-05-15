import { View, Text, Pressable } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SetTabProps } from "../app/(tabs)/Profile";

export default function SuccessfullyChangedPasswordMessage({
  setSelectedTab,
}: SetTabProps) {
  return (
    <View className="items-center px-6">
      <View className="rounded-full justify-center items-center bg-green-600 w-20 h-20 mb-2 mt-2">
        <AntDesign name="check" size={40} color="white" />
      </View>
      <Text className="text-2xl font-bold text-center mb-2">
        Successfully Changed Password!
      </Text>
      <Pressable
        className="bg-blue-600 rounded py-3 mb-4 w-full"
        onPress={() => setSelectedTab("")}
      >
        <Text className="text-center text-white font-semibold">Ok</Text>
      </Pressable>
    </View>
  );
}

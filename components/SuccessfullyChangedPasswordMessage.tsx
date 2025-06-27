import { View, Text } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SetTabProps } from "../app/(tabs)/Profile";
import ButtonWithGradient from "../components/ButtonWithGradient";

export default function SuccessfullyChangedPasswordMessage({
  setSelectedTab,
}: SetTabProps) {
  return (
    <View className="items-center p-8 rounded-3xl bg-white/20 gap-y-4">
      <View className="rounded-full justify-center items-center w-20 h-20 bg-green-600">
        <AntDesign name="check" size={40} color="white" />
      </View>
      <Text className="text-2xl text-white font-bold text-center">
        Successfully Changed Password!
      </Text>
      <ButtonWithGradient
        colors={["#FB923C", "#A855F7", "#3B82F6"]}
        onPress={() => setSelectedTab("")}
        buttonText="OK"
      ></ButtonWithGradient>
    </View>
  );
}

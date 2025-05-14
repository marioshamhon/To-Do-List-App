import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import colors from "tailwindcss/colors";

export default function ChangePassword() {
  const [display, setDisplay] = useState<"verify password" | "update password">(
    "verify password"
  );

  function showVerifyPassword() {
    return (
      <>
        <Text className="text-2xl font-bold mb-6 text-center">
          Change Password
        </Text>

        <TextInput
          className="border border-gray-300 rounded px-3 py-2 mb-4"
          placeholder="Enter current password"
          placeholderTextColor={colors.gray[400]}
        />
        <Pressable className="bg-blue-600 rounded py-3 mb-4">
          <Text className="text-center text-white font-semibold">Submit</Text>
        </Pressable>
      </>
    );
  }

  function showEnterNewPassword() {
    return (
      <>
        <Text className="text-2xl font-bold mb-6 text-center">
          Enter New Password
        </Text>
        <TextInput
          className="border border-gray-300 rounded px-3 py-2 mb-4"
          placeholder="Enter new password"
          placeholderTextColor={colors.gray[400]}
        />
        <TextInput
          className="border border-gray-300 rounded px-3 py-2 mb-4"
          placeholder="Confirm new password"
          placeholderTextColor={colors.gray[400]}
        />
        <Pressable className="bg-blue-600 rounded py-3 mb-4">
          <Text className="text-center text-white font-semibold">Save</Text>
        </Pressable>
      </>
    );
  }

  return (
    <View>
      {display === "verify password"
        ? showVerifyPassword()
        : showEnterNewPassword()}
    </View>
  );
}

import { useState } from "react";
import { Text, TextInput, Pressable } from "react-native";
import colors from "tailwindcss/colors";
import { handleUpdateUserPassword } from "../helper_functions/userHelpers";
import { ChangePasswordProps } from "./ChangePassword";

export default function NewPasswordForm({
  setStep,
  setErrorMessage,
}: ChangePasswordProps) {
  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <>
      <Text className="text-2xl font-bold mb-6 text-center">
        Enter New Password
      </Text>
      <TextInput
        className="border border-gray-300 rounded px-3 py-2 mb-4"
        placeholder="Enter new password"
        placeholderTextColor={colors.gray[400]}
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <TextInput
        className="border border-gray-300 rounded px-3 py-2 mb-4"
        placeholder="Confirm new password"
        placeholderTextColor={colors.gray[400]}
        secureTextEntry
        onChangeText={setConfirmPassword}
        value={confirmPassword}
      />
      <Pressable
        className="bg-blue-600 rounded py-3 mb-4"
        onPress={() =>
          handleUpdateUserPassword(
            password,
            confirmPassword,
            setPassword,
            setConfirmPassword,
            setStep,
            setErrorMessage
          )
        }
      >
        <Text className="text-center text-white font-semibold">Save</Text>
      </Pressable>
    </>
  );
}

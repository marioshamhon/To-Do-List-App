import { useState } from "react";
import { Text, TextInput, Pressable } from "react-native";
import colors from "tailwindcss/colors";
import { handleVerifyPassword } from "../helper_functions/userHelpers";
import { ChangePasswordProps } from "./ChangePassword";

export default function VerifyPasswordForm({
  setStep,
  setErrorMessage,
}: ChangePasswordProps) {
  const [verifyPassword, setVerifyPassword] = useState("");

  return (
    <>
      <Text className="text-2xl font-bold mb-6 text-center">
        Change Password
      </Text>

      <TextInput
        className="border border-gray-300 rounded px-3 py-2 mb-4"
        placeholder="Enter current password"
        secureTextEntry
        placeholderTextColor={colors.gray[400]}
        onChangeText={setVerifyPassword}
        value={verifyPassword}
      />
      <Pressable
        className="bg-blue-600 rounded py-3 mb-4"
        onPressIn={() =>
          handleVerifyPassword(
            verifyPassword,
            setStep,
            setErrorMessage,
            setVerifyPassword
          )
        }
      >
        <Text className="text-center text-white font-semibold">Submit</Text>
      </Pressable>
    </>
  );
}

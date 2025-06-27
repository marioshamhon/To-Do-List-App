import { useState } from "react";
import { Text, TextInput, Pressable, View } from "react-native";
import { handleUpdateUserPassword } from "../helper_functions/userHelpers";
import { ChangePasswordProps } from "./ChangePassword";
import { useAuth } from "../contexts/auth.context";
import ButtonWithGradient from "../components/ButtonWithGradient";

export default function NewPasswordForm({
  setStep,
  setErrorMessage,
  errorMessage,
}: ChangePasswordProps) {
  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const { accessToken, setAccessToken } = useAuth();

  return (
    <View className="p-8 rounded-3xl bg-white/20">
      {errorMessage ? (
        <Text className="text-red-500 text-center mb-1">{errorMessage}</Text>
      ) : null}
      <Text className="text-2xl text-white font-bold mb-6 text-center">
        Enter New Password
      </Text>
      <TextInput
        className="border border-white rounded-2xl p-4 mb-4 placeholder:text-white text-white"
        placeholder="Enter new password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <TextInput
        className="border border-white rounded-2xl p-4 mb-4 placeholder:text-white text-white"
        placeholder="Confirm new password"
        secureTextEntry
        onChangeText={setConfirmPassword}
        value={confirmPassword}
      />
      <ButtonWithGradient
        colors={["#FB923C", "#A855F7", "#3B82F6"]}
        onPress={() =>
          handleUpdateUserPassword(
            password,
            confirmPassword,
            setPassword,
            setConfirmPassword,
            setStep,
            setErrorMessage,
            accessToken,
            setAccessToken
          )
        }
        buttonText="Save"
      ></ButtonWithGradient>
    </View>
  );
}

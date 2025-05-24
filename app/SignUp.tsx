import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { Link } from "expo-router";
import colors from "tailwindcss/colors";
import { useClearInputs } from "../hooks/useClearInputs";
import { handleRegister } from "../helper_functions/authHelpers";
import { useAuth } from "../contexts/auth.context";
import { useRouter } from "expo-router";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { setUser, setAccessToken } = useAuth();

  const router = useRouter();

  useClearInputs(setName, setEmail, setPassword, setErrorMessage);

  return (
    <View className="flex-1 justify-center  px-4 bg-white">
      <Text className="text-2xl font-bold mb-6 text-center">Sign Up</Text>

      <TextInput
        className="border border-gray-300 rounded px-3 py-2 mb-4"
        placeholder="Name"
        placeholderTextColor={colors.gray[400]}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        className="border border-gray-300 rounded px-3 py-2 mb-4"
        placeholder="Email"
        placeholderTextColor={colors.gray[400]}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        className="border border-gray-300 rounded px-3 py-2 mb-6"
        placeholder="Password"
        placeholderTextColor={colors.gray[400]}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {errorMessage ? (
        <Text className="text-red-500 text-center mb-4">{errorMessage}</Text>
      ) : null}

      <Pressable
        className="bg-blue-600 rounded py-3 mb-4"
        onPress={() =>
          handleRegister(
            name,
            email,
            password,
            setErrorMessage,
            setPassword,
            setUser,
            setAccessToken,
            router
          )
        }
      >
        <Text className="text-center text-white font-semibold">Sign up!</Text>
      </Pressable>

      {/* 7. Sign in Link */}
      <View className="flex-row justify-center">
        <Text>Have an account? </Text>
        <Link className="text-blue-600" push href="/SignIn">
          Sign in
        </Link>
      </View>
    </View>
  );
}

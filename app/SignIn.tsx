import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { Link } from "expo-router";
import colors from "tailwindcss/colors";
import { useClearInputs } from "../hooks/useClearInputs";
import { handleLogin } from "../helper_functions/authHelpers";
import { useAuth } from "../contexts/auth.context";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { setUser, setAccessToken } = useAuth();

  useClearInputs(setEmail, setPassword, setErrorMessage);

  return (
    <View className="flex-1 justify-center  px-4 bg-white">
      {/* 1. Title */}
      <Text className="text-2xl font-bold mb-6 text-center">Sign In</Text>

      {/* 2. Email input */}
      <TextInput
        className="border border-gray-300 rounded px-3 py-2 mb-4"
        placeholder="Email"
        placeholderTextColor={colors.gray[400]}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {/* 3. Password input */}
      <TextInput
        className="border border-gray-300 rounded px-3 py-2 mb-6"
        placeholder="Password"
        placeholderTextColor={colors.gray[400]}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* 4. Error message */}
      {errorMessage ? (
        <Text className="text-red-500 text-center mb-4"> {errorMessage}</Text>
      ) : null}

      {/* 5. Login button */}
      <Pressable
        className="bg-blue-600 rounded py-3 mb-4"
        onPress={() =>
          handleLogin(
            email,
            password,
            setErrorMessage,
            setPassword,
            setUser,
            setAccessToken
          )
        }
      >
        <Text className="text-center text-white font-semibold">Log In</Text>
      </Pressable>

      {/* 6. Sign-up link text */}
      <View className="flex-row justify-center">
        <Text>Don’t have an account? </Text>
        <Link className="text-blue-600" push href="/SignUp">
          Sign Up
        </Link>
      </View>
    </View>
  );
}

import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { Link } from "expo-router";
import { useClearInputs } from "../hooks/useClearInputs";
import { handleRegister } from "../helper_functions/authHelpers";
import { useAuth } from "../contexts/auth.context";
import { useRouter } from "expo-router";
import ButtonWithGradient from "../components/ButtonWithGradient";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { setUser, setAccessToken } = useAuth();

  const router = useRouter();

  useClearInputs(setName, setEmail, setPassword, setErrorMessage);

  return (
    <View className="flex-1 justify-center px-4">
      <View className="p-8 rounded-3xl bg-white/20">
        <Text className="text-2xl text-white font-bold mb-6 text-center">
          Sign Up
        </Text>

        <TextInput
          className="border border-white rounded-2xl p-4 mb-4 placeholder:text-white text-white"
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          className="border border-white rounded-2xl p-4 mb-4 placeholder:text-white text-white"
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          className="border border-white rounded-2xl p-4 mb-4 placeholder:text-white text-white"
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {errorMessage ? (
          <Text className="text-red-500 text-center mb-4">{errorMessage}</Text>
        ) : null}

        <ButtonWithGradient
          colors={["#FB923C", "#A855F7", "#3B82F6"]}
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
          buttonText="Sign Up!"
        ></ButtonWithGradient>

        <View className="flex-row justify-center mt-2">
          <Text className="text-white">Have an account? </Text>
          <Link className="text-blue-600" push href="/SignIn">
            Sign in
          </Link>
        </View>
      </View>
    </View>
  );
}

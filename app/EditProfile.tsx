import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import colors from "tailwindcss/colors";
import { useClearInputs } from "../hooks/useClearInputs";

export default function EditProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useClearInputs(setName, setEmail, setPassword, setErrorMessage);

  return (
    <View className="flex-1 justify-center  px-4 bg-white">
      {/* 1. Title */}
      <Text className="text-2xl font-bold mb-6 text-center">Edit Profile</Text>

      {/* 2. Name input */}
      <TextInput
        className="border border-gray-300 rounded px-3 py-2 mb-4"
        placeholder="Name"
        placeholderTextColor={colors.gray[400]}
        value={name}
        onChangeText={setName}
      />

      {/* 3. Email input */}
      <TextInput
        className="border border-gray-300 rounded px-3 py-2 mb-4"
        placeholder="Email"
        placeholderTextColor={colors.gray[400]}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {/* 4. Password input */}
      <TextInput
        className="border border-gray-300 rounded px-3 py-2 mb-6"
        placeholder="Password"
        placeholderTextColor={colors.gray[400]}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* 5. Error message display */}
      {errorMessage ? (
        <Text className="text-red-500 text-center mb-4">{errorMessage}</Text>
      ) : null}

      {/* 6. Submit button */}
      <Pressable
        className="bg-blue-600 rounded py-3"
        onPress={() => console.log("submit button in edit profile pressed")}
      >
        <Text className="text-center text-white font-semibold">Submit</Text>
      </Pressable>
    </View>
  );
}

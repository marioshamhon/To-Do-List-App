import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { useRouter, Link } from 'expo-router'
import { placeholderTextColor } from '../styles/colors.js';
import { signInUser } from '@/services/auth.service.js';

export default function SignInScreen() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

   const router = useRouter();
  
  const handleLogIn = async () => {
    setErrorMessage(''); // Clear previous error

    if ((email === '') && (password === '')) {
      setErrorMessage('Please provide an email and password');
      return;
    }

    if (email === '')  {
      setErrorMessage('Please provide an email');
      return;
    }

    if (password === '')  {
      setErrorMessage('Please provide an password');
      return;
    }
  
    const result = await signInUser(email, password);
  
    if (result.success) {
      router.replace('/SignUpScreen'); // Navigate to sign up screen screen (change this later)
    } else {
      setErrorMessage(result.message);
      setPassword('');
    }
  };

  return (
    <View className="flex-1 justify-center  px-4 bg-white">
      {/* 1. Title */}
      <Text className="text-2xl font-bold mb-6 text-center">
        Sign In
      </Text>

      {/* 2. Email input */}
      <TextInput
        className="border border-gray-300 rounded px-3 py-2 mb-4"
        placeholder="Email"
        placeholderTextColor={placeholderTextColor}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {/* 3. Password input */}
      <TextInput
        className="border border-gray-300 rounded px-3 py-2 mb-6"
        placeholder="Password"
        placeholderTextColor={placeholderTextColor}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* 4. Error message */}
        {errorMessage ? (
          <Text className="text-red-500 text-center mb-4"> {errorMessage}</Text>
        ): null}
    

      {/* 5. Login button */}
      <TouchableOpacity
        className="bg-blue-500 rounded py-3 mb-4"
        onPress={handleLogIn}
      >
        <Text className="text-center text-white font-semibold">
          Log In
        </Text>
      </TouchableOpacity>

      {/* 6. Sign-up link text */}
      <View className="flex-row justify-center">
        <Text>Don’t have an account? </Text>
        <Link className="text-blue-500" href="/SignUpScreen">Sign Up</Link>
      </View>
    </View>
  )
}

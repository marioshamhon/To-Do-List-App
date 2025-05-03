import React, { useState } from 'react'
import { View, Text, TextInput, Pressable } from 'react-native'
import { useRouter, Link } from 'expo-router'
import { placeholderTextColor } from '../styles/colors.js';
import { registerUser } from '../services/auth.service.js'

export default function SignUpScreen() {
  const [name, setName] = useState('') 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  const handleRegister = async () => {
    
    const minimumPasswordLength = 6;
    
    setErrorMessage(''); // Clear previous error

    if ((name === '') && (email === '') && (password === '')) {
      setErrorMessage('Please provide a name, email, and password');
      return;
    }

    if (name === '')  {
      setErrorMessage('Please provide a name');
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

    if (password.length < minimumPasswordLength)  {
      setPassword('');
      setErrorMessage(`Password too short please provide an password with a minimum of ${minimumPasswordLength} characters`);
      return;
    }
    const result = await registerUser(name, email, password);
  
    if (result.success) {
      router.push('/Home'); // Navigate to sign in screen (change this later)
    } else {
      setErrorMessage(result.message);
      setPassword('');
    }
  };

  return (
    <View className="flex-1 justify-center  px-4 bg-white">
      {/* 1. Title */}
      <Text className="text-2xl font-bold mb-6 text-center">
        Sign Up 
      </Text>

      {/* 2. Name input */}
      <TextInput
        className="border border-gray-300 rounded px-3 py-2 mb-4"
        placeholder="Name"
        placeholderTextColor={placeholderTextColor}
        value={name}
        onChangeText={setName}
      />

      {/* 3. Email input */}
      <TextInput
        className="border border-gray-300 rounded px-3 py-2 mb-4"
        placeholder="Email"
        placeholderTextColor={placeholderTextColor}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {/* 4. Password input */}
      <TextInput
        className="border border-gray-300 rounded px-3 py-2 mb-6"
        placeholder="Password"
        placeholderTextColor={placeholderTextColor}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* 5. Error message display */}
      {errorMessage ? (
        <Text className="text-red-500 text-center mb-4">{errorMessage}</Text>
      ) : null}

      {/* 6. Sign Up button */}
      <Pressable
        className="bg-blue-500 rounded py-3 mb-4"
        onPress={handleRegister}
      >
        {/* 7. Sign in Link */}
        <Text className="text-center text-white font-semibold">
          Sign up!
        </Text>
      </Pressable>

      {/* 5. Sign-In link text */}
      <View className="flex-row justify-center">
        <Text>Have an account? </Text>
        <Link className="text-blue-500" href="/SignInScreen">Sign in</Link>
      </View>
    </View>
  )
}

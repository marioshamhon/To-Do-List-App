import { Stack } from "expo-router";
import "../global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <StatusBar hidden={true} />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="SignIn" />
          <Stack.Screen name="SignUp" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

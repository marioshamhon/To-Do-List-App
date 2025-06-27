import { Stack } from "expo-router";
import "../global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "../contexts/auth.context";
import { TodoProvider } from "../contexts/todo.context";
import { LinearGradient } from "expo-linear-gradient";

export default function RootLayout() {
  return (
    <AuthProvider>
      <TodoProvider>
        <GestureHandlerRootView>
          <SafeAreaProvider>
            <LinearGradient
              style={{ flex: 1 }}
              colors={["#FB923C", "#A855F7", "#3B82F6"]}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 1 }}
            >
              <StatusBar hidden={true} />

              <Stack
                screenOptions={{
                  headerShown: false,
                  contentStyle: { backgroundColor: "transparent" },
                }}
              >
                <Stack.Screen name="index" />
                <Stack.Screen name="SignIn" />
                <Stack.Screen name="SignUp" />
                <Stack.Screen name="(tabs)" />
              </Stack>
            </LinearGradient>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </TodoProvider>
    </AuthProvider>
  );
}

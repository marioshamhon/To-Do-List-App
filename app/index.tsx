import { useEffect } from "react";
import { Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../contexts/auth.context";

export default function Index() {
  const router = useRouter();

  const { user, accessToken, isLoading } = useAuth();

  const isAuthenticated = !isLoading && accessToken && user;

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/Home");
    }
  }, [isAuthenticated]);

  if (isLoading || isAuthenticated) {
    return null;
  }

  return (
    <View className="flex-1 justify-center items-center gap-y-2 bg-white">
      {/* App title */}
      <Text className="text-2xl font-bold text-center">The Todo List App</Text>

      {/* Log In button */}
      <Pressable
        className=" w-64 bg-blue-600 px-8 py-3 rounded"
        onPress={() => router.push("/SignIn")}
      >
        <Text className="text-white text-lg text-center">Sign In</Text>
      </Pressable>

      {/* Sign Up button */}
      <Pressable
        className="w-64 bg-green-600 px-8 py-3 rounded"
        onPress={() => router.push("/SignUp")}
      >
        <Text className="text-white text-lg text-center">Sign Up</Text>
      </Pressable>
    </View>
  );
}

import { Text, View, Pressable, Platform } from "react-native";
import { useRouter } from "expo-router";
import { useAuthRedirect } from "../hooks/useAuthRedirect";

export default function Index() {
  const { isAuthenticated, isLoading, errorMessage } = useAuthRedirect();

  const router = useRouter();

  if (isLoading || isAuthenticated) {
    return null;
  }

  return (
    <View className="flex-1 justify-center items-center gap-y-2 bg-white">
      <Text className="text-2xl font-bold text-center">The Todo List App</Text>

      <Pressable
        className=" w-64 bg-blue-600 px-8 py-3 rounded"
        onPress={() => router.push("/SignIn")}
      >
        <Text className="text-white text-lg text-center">Sign In</Text>
      </Pressable>

      <Pressable
        className="w-64 bg-green-600 px-8 py-3 rounded"
        onPress={() => router.push("/SignUp")}
      >
        <Text className="text-white text-lg text-center">Sign Up</Text>
      </Pressable>

      {errorMessage ? (
        <Text className="text-red-500 text-center mb-4"> {errorMessage}</Text>
      ) : null}
    </View>
  );
}

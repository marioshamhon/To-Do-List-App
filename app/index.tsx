import { Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {

  const router = useRouter()

  return (
    <View className="flex-1 justify-center items-center gap-y-2">
    {/* App title */}
      <Text className="text-2xl font-bold text-center">
        The Todo List App
      </Text>

      {/* Log In button */}
      <Pressable
        className=" w-64 bg-blue-600 px-8 py-3 rounded"
        onPress={() => router.push('/SignInScreen')}
      >
        <Text className="text-white text-lg text-center">Sign In</Text>
      </Pressable>

      {/* Sign Up button */}
      <Pressable
        className="w-64 bg-green-600 px-8 py-3 rounded"
        onPress={() => router.push('/SignUpScreen')}
      >
        <Text className="text-white text-lg text-center">Sign Up</Text>
      </Pressable>
  </View>
  );
}

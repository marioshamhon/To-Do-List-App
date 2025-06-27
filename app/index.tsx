import { Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useAuthRedirect } from "../hooks/useAuthRedirect";
import ButtonWithGradient from "../components/ButtonWithGradient";

export default function Index() {
  const { isAuthenticated, isLoading, errorMessage } = useAuthRedirect();

  const router = useRouter();

  if (isLoading || isAuthenticated) {
    return null;
  }

  return (
    <View className="flex-1 justify-center items-center">
      <View className="p-8 gap-y-2">
        {errorMessage ? (
          <Text className="text-red-500 font-bold text-center mb-4">
            {" "}
            {errorMessage}
          </Text>
        ) : null}
        <Text className="text-2xl font-bold text-center text-white">
          The Simple Todo List App
        </Text>

        <ButtonWithGradient
          colors={["#FB923C", "#3B82F6"]}
          onPress={() => router.push("/SignIn")}
          buttonText="Sign In"
        ></ButtonWithGradient>

        <ButtonWithGradient
          colors={["#3B82F6", "#FB923C"]}
          onPress={() => router.push("/SignUp")}
          buttonText="Sign Up"
        ></ButtonWithGradient>
      </View>
    </View>
  );
}

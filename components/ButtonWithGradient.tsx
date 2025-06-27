import { Pressable, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { cssInterop } from "nativewind";
import type { LinearGradientProps } from "expo-linear-gradient";
import type { PressableProps } from "react-native";

interface ButtonProps {
  colors: LinearGradientProps["colors"];
  onPress: PressableProps["onPress"];
  buttonText: string;
}

export default function ButtonWithGradient({
  colors,
  onPress,
  buttonText,
}: ButtonProps) {
  const LinearGradientWithTW = cssInterop(LinearGradient, {
    className: "style",
  });

  return (
    <LinearGradientWithTW
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="rounded-2xl p-4"
    >
      <Pressable onPress={onPress}>
        <Text className="text-white text-lg text-center">{buttonText}</Text>
      </Pressable>
    </LinearGradientWithTW>
  );
}

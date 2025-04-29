import { Stack } from "expo-router";
import "../global.css"
import { SafeAreaProvider} from "react-native-safe-area-context";
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar hidden={true}/>
      <Stack screenOptions={{headerShown: false}}>
          <Stack.Screen name="index"    />
          <Stack.Screen name="SignInScreen"    />
          <Stack.Screen name="SignUpScreen" />
      </Stack>
  </SafeAreaProvider>
  )
}

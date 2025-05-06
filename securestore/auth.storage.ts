import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "authToken";

// Save token
export async function saveToken(token: string) {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
}

// Get token
export async function getToken() {
  return await SecureStore.getItemAsync(TOKEN_KEY);
}

// Delete token (for sign out)
export async function deleteToken() {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}

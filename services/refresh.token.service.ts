import { Platform } from "react-native";
import { saveItem, getItem } from "../securestore/auth.storage";

const refreshTokenApiURl = "http://192.168.1.6:5000/api/auth/refresh-token";

export async function refreshAccessToken() {
  try {
    let refreshToken: string | null = null;

    if (Platform.OS !== "web") {
      refreshToken = await getItem("refreshToken");

      if (!refreshToken) {
        return { success: false, message: "No refresh token found" };
      }
    }

    const response = await fetch(refreshTokenApiURl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        platform: Platform.OS,
      },
      ...(Platform.OS === "web" ? { credentials: "include" } : {}),
      ...(Platform.OS !== "web"
        ? { body: JSON.stringify({ refreshToken }) }
        : {}),
    });

    const responseData = await response.json();

    if (response.ok) {
      if (Platform.OS !== "web") {
        await saveItem("refreshToken", responseData.newRefreshToken);
      }

      return { success: true, accessToken: responseData.accessToken };
    } else {
      return {
        success: false,
        message: responseData.error || "Refresh token failed server side",
        statusCode: response.status,
      };
    }
  } catch (error) {
    console.error("Error in refreshToken function:", error);
    return { success: false, message: "Unexpected error occurred" };
  }
}

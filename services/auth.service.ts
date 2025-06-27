import { Dispatch, SetStateAction } from "react";
import { Platform } from "react-native";
import { saveItem, getItem } from "../securestore/auth.storage";
import fetchWrapper from "./fetchWrapper";

const signUpApiUrl = "http://192.168.1.6:5000/api/auth/sign-up";

const signInApiUrl = "http://192.168.1.6:5000/api/auth/sign-in";

const signOutApiUrl = "http://192.168.1.6:5000/api/auth/sign-out";

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  try {
    const response = await fetch(signUpApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        platform: Platform.OS,
      },

      credentials: "include",
      body: JSON.stringify({ name, email, password }),
    });

    const responseData = await response.json();

    if (response.ok) {
      if (Platform.OS !== "web") {
        await saveItem("refreshToken", responseData.data.refreshToken);
      }

      return { success: true, data: responseData.data };
    } else {
      return {
        success: false,
        message: responseData.error || "Registration failed server side",
      };
    }
  } catch (error) {
    console.error("Error in registerUser function:", error);
    return { success: false, message: "Error: Please try again." };
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const response = await fetch(signInApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        platform: Platform.OS,
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const responseData = await response.json();

    if (response.ok) {
      if (Platform.OS !== "web") {
        await saveItem("refreshToken", responseData.data.refreshToken);
      }

      return { success: true, data: responseData.data };
    } else {
      return {
        success: false,
        message: responseData.error || "Sign in failed server side",
      };
    }
  } catch (error) {
    console.error("Error in loginUser function:", error);
    return {
      success: false,
      message: "Error: Failed to sign in. Please try again",
    };
  }
}

export async function logOutUser(
  accessToken: string,
  setAccessToken: Dispatch<SetStateAction<string>>
) {
  try {
    let refreshToken: string | null = null;

    if (Platform.OS !== "web") {
      refreshToken = await getItem("refreshToken");

      if (!refreshToken) {
        return {
          success: false,
          message: "No refresh token found from logOutUser function",
        };
      }
    }

    const response = await fetchWrapper(
      signOutApiUrl,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          platform: Platform.OS,
        },

        ...(Platform.OS === "web" ? { credentials: "include" } : {}),
        ...(Platform.OS !== "web"
          ? { body: JSON.stringify({ refreshToken }) }
          : {}),
      },
      accessToken,
      setAccessToken
    );

    const responseData = await response.json();

    if (response.ok) {
      return { success: true };
    } else {
      return {
        success: false,
        message: responseData.error || "logOutUser failed server side",
      };
    }
  } catch (error) {
    console.error("Error in logOutUser function:", error);
    return {
      success: false,
      message: "Error: Failed to sign out. Please try again.",
    };
  }
}

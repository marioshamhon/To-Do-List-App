import { Dispatch, SetStateAction } from "react";
import { Platform } from "react-native";
import { saveItem } from "../securestore/auth.storage";
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
    return { success: false, message: "Unexpected error occurred" };
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
    return { success: false, message: "Unexpected error occurred" };
  }
}

export async function logOutUser(
  accessToken: string,
  setAccessToken: Dispatch<SetStateAction<string>>
) {
  try {
    const response = await fetchWrapper(
      signOutApiUrl,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          platform: Platform.OS,
        },
        credentials: "include",
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
    return { success: false, message: "Unexpected error occurred" };
  }
}

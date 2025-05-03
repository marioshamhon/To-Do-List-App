import { saveToken } from "../securestore/auth.storage.js";

const signUpApiUrl = "http://192.168.1.6:5000/api/auth/sign-up";

const signInApiUrl = "http://192.168.1.6:5000/api/auth/sign-in";

export async function registerUser(name, email, password) {
  try {
    const response = await fetch(signUpApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ name, email, password }),
    });

    const responseData = await response.json();

    if (response.ok) {
      await saveToken(responseData.data.token);
      return { success: true };
    } else {
      return {
        success: false,
        message: responseData.error || "Registration failed",
      };
    }
  } catch (error) {
    console.error("Error in registerUser function:", error);
    return { success: false, message: "Unexpected error occurred" };
  }
}

export async function loginUser(email, password) {
  try {
    const response = await fetch(signInApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ email, password }),
    });

    const responseData = await response.json();

    if (response.ok) {
      await saveToken(responseData.data.token);
      return { success: true };
    } else {
      return {
        success: false,
        message: responseData.error || "Sign in failed",
      };
    }
  } catch (error) {
    console.error("Error in registerUser function:", error);
    return { success: false, message: "Unexpected error occurred" };
  }
}

import { saveItem } from "../securestore/auth.storage";

const signUpApiUrl = "http://192.168.1.6:5000/api/auth/sign-up";

const signInApiUrl = "http://192.168.1.6:5000/api/auth/sign-in";

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
      },

      body: JSON.stringify({ name, email, password }),
    });

    const responseData = await response.json();

    if (response.ok) {
      await saveItem("token", responseData.data.token);

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
      },

      body: JSON.stringify({ email, password }),
    });

    const responseData = await response.json();

    if (response.ok) {
      await saveItem("token", responseData.data.token);
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

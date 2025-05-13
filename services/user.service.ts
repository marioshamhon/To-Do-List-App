import { getItem } from "../securestore/auth.storage";

const userApiURl = "http://192.168.1.6:5000/api/user/";

export async function fetchUser() {
  try {
    const token = await getItem("token");

    if (!token) {
      throw new Error(
        "Token not found this is comming from the updateUserName Function"
      );
    }

    const response = await fetch(userApiURl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData = await response.json();

    if (response.ok) {
      return { success: true, data: responseData.data };
    } else {
      return {
        success: false,
        message: responseData.error || "fetchUser failed server side",
      };
    }
  } catch (error) {
    console.error("Error in fetchUser function:", error);
    return { success: false, message: "Unexpected error occurred" };
  }
}

export async function updateUserName(name: string) {
  try {
    const token = await getItem("token");

    if (!token) {
      throw new Error(
        "Token not found this is comming from the updateUserName Function"
      );
    }

    const response = await fetch(userApiURl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({ name }),
    });

    const responseData = await response.json();

    if (response.ok) {
      return { success: true, data: responseData.data };
    } else {
      return {
        success: false,
        message: responseData.error || "updateUserName failed server side",
      };
    }
  } catch (error) {
    console.error("Error in updateUserName function:", error);
    return { success: false, message: "Unexpected error occurred" };
  }
}

export async function updateUserEmail(email: string) {
  try {
    const token = await getItem("token");

    if (!token) {
      throw new Error(
        "Token not found this is comming from the updateUserEmail Function"
      );
    }

    const response = await fetch(userApiURl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({ email }),
    });

    const responseData = await response.json();

    if (response.ok) {
      return { success: true, data: responseData.data };
    } else {
      return {
        success: false,
        message: responseData.error || "updateUserEmail failed server side",
      };
    }
  } catch (error) {
    console.error("Error in updateUserEmail function:", error);
    return { success: false, message: "Unexpected error occurred" };
  }
}

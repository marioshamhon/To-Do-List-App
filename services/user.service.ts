import { Dispatch, SetStateAction } from "react";
import fetchWrapper from "./fetchWrapper";

const userApiUrl = "http://192.168.1.6:5000/api/user/";
const verifyPasswordApiUrl =
  "http://192.168.1.6:5000/api/user/verify-password/";

const changePasswordApiUrl =
  "http://192.168.1.6:5000/api/user/change-password/";

export async function fetchUser(
  accessToken: string,
  setAccessToken: Dispatch<SetStateAction<string>>
) {
  if (!accessToken) {
    console.log("error on hot save");
    console.log(accessToken);
    return;
  }
  try {
    const response = await fetchWrapper(
      userApiUrl,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
      accessToken,
      setAccessToken
    );

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

export async function updateUserName(
  name: string,
  accessToken: string,
  setAccessToken: Dispatch<SetStateAction<string>>
) {
  try {
    const response = await fetchWrapper(
      userApiUrl,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ name }),
      },
      accessToken,
      setAccessToken
    );

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

export async function updateUserEmail(
  email: string,
  accessToken: string,
  setAccessToken: Dispatch<SetStateAction<string>>
) {
  try {
    const response = await fetchWrapper(
      userApiUrl,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ email }),
      },
      accessToken,
      setAccessToken
    );

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

export async function verifyUserPassword(
  password: string,
  accessToken: string,
  setAccessToken: Dispatch<SetStateAction<string>>
) {
  try {
    const response = await fetchWrapper(
      verifyPasswordApiUrl,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ password }),
      },
      accessToken,
      setAccessToken
    );

    const responseData = await response.json();

    if (response.ok) {
      return { success: true, message: responseData.message };
    } else {
      return {
        success: false,
        message: responseData.error || "verifyPassword failed server side",
      };
    }
  } catch (error) {
    console.error("Error in verifyPassword function:", error);
    return { success: false, message: "Unexpected error occurred" };
  }
}

export async function updateUserPassword(
  password: string,
  accessToken: string,
  setAccessToken: Dispatch<SetStateAction<string>>
) {
  try {
    const response = await fetchWrapper(
      changePasswordApiUrl,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ password }),
      },
      accessToken,
      setAccessToken
    );

    const responseData = await response.json();

    if (response.ok) {
      return { success: true, mesage: responseData.message };
    } else {
      return {
        success: false,
        message: responseData.error || "updateUserEmail failed server side",
      };
    }
  } catch (error) {
    console.error("Error in updateUserPassword function:", error);
    return { success: false, message: "Unexpected error occurred" };
  }
}

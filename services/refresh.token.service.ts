const refreshTokenApiURl = "http://192.168.1.6:5000/api/auth/refresh-token";

export async function refreshAccessToken(refreshToken: string) {
  try {
    const response = await fetch(refreshTokenApiURl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    const responseData = await response.json();

    if (response.ok) {
      return { success: true, accessToken: responseData.accessToken };
    } else {
      return {
        success: false,
        message: responseData.error || "Refresh token failed server side",
      };
    }
  } catch (error) {
    console.error("Error in refreshToken function:", error);
    return { success: false, message: "Unexpected error occurred" };
  }
}

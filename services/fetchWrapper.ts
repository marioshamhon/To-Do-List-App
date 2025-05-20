import { getItem } from "expo-secure-store";
import { Dispatch, SetStateAction } from "react";

const refreshTokenApiURl = "http://192.168.1.6:5000/api/auth/refresh-token";

export default async function fetchWrapper(
  url: string,
  options: RequestInit,
  currentAccessToken: string,
  setAccessToken: Dispatch<SetStateAction<string>>
): Promise<Response> {
  options.headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${currentAccessToken}`,
  };

  let response = await fetch(url, options);

  if (response.status === 401) {
    const refreshToken = await getItem("refreshToken");

    if (!refreshToken) {
      return response;
    }

    const responseFromRefreshTokenEndpoint = await fetch(refreshTokenApiURl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    const responseData = await responseFromRefreshTokenEndpoint.json();

    if (!responseFromRefreshTokenEndpoint.ok || !responseData.accessToken) {
      return response;
    }

    const newAccessToken = responseData.accessToken;

    setAccessToken(newAccessToken);

    options.headers = {
      ...(options.headers || {}),
      Authorization: `Bearer ${newAccessToken}`,
    };

    response = await fetch(url, options);
  }

  return response;
}

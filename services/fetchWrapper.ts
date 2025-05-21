import { getItem } from "expo-secure-store";
import { Dispatch, SetStateAction } from "react";
import { refreshAccessToken } from "./auth.service";

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

    const result = await refreshAccessToken(refreshToken);

    if (!result.success) {
      console.log(result.message);
      return response;
    }

    const newAccessToken = result.accessToken;

    setAccessToken(newAccessToken);

    options.headers = {
      ...(options.headers || {}),
      Authorization: `Bearer ${newAccessToken}`,
    };

    response = await fetch(url, options);
  }

  return response;
}

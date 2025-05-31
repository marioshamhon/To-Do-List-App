import { Dispatch, SetStateAction } from "react";
import { refreshAccessToken } from "./refresh.token.service";

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
    const result = await refreshAccessToken();

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

import { Dispatch, SetStateAction } from "react";

import fetchWrapper from "./fetchWrapper";
import { Todo } from "../helper_functions/todoHelpers";

const geminiApiURl = "http://192.168.1.6:5000/api/gemini/suggestions";

export async function fetchAiSuggestions(
  todosArray: Todo[],
  accessToken: string,
  setAccessToken: Dispatch<SetStateAction<string>>
) {
  try {
    const response = await fetchWrapper(
      geminiApiURl,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ todosArray }),
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
        message: responseData.error || "get gemini failed server side",
      };
    }
  } catch (error) {
    console.error("Error in fetchAiSuggestions function:", error);
    return {
      success: false,
      message: "Error: Cannot get Gemini AI suggestions. Please try again",
    };
  }
}

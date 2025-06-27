import { Dispatch, SetStateAction } from "react";
import { Todo } from "./todoHelpers";
import { AiSuggestion } from "../components/AiSuggestionsModal";
import { fetchAiSuggestions } from "../services/gemini.service";

export async function handleFetchGeminiSuggestions(
  todosArray: Todo[],
  setSuggestionsArray: Dispatch<SetStateAction<AiSuggestion[]>>,
  accessToken: string,
  setAccessToken: Dispatch<SetStateAction<string>>,
  setErrorMessage: Dispatch<SetStateAction<string>>,
  setIsSuggestionsLoading: Dispatch<SetStateAction<boolean>>
) {
  const result = await fetchAiSuggestions(
    todosArray,
    accessToken,
    setAccessToken
  );

  if (!result.success) {
    setErrorMessage(result.message);
    setIsSuggestionsLoading(false);
    return;
  }

  setSuggestionsArray(result.data.suggestions);
  setIsSuggestionsLoading(false);
}

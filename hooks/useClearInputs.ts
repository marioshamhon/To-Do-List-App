import React, { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

export function useClearInputs(
  ...setters: Array<React.Dispatch<React.SetStateAction<string>>>
) {
  useFocusEffect(
    useCallback(() => {
      setters.forEach((setter) => setter(""));
    }, [])
  );
}

import { useRouter, usePathname } from "expo-router";
import { useEffect, useState, useRef } from "react";
import { Platform } from "react-native";
import { useAuth } from "../contexts/auth.context";
import { validateRefreshToken } from "../services/auth.service";

export function useAuthRedirect() {
  const { user, accessToken, isLoading } = useAuth();
  const router = useRouter();
  const pathName = usePathname();

  const [errorMessage, setErrorMessage] = useState("");

  const isAuthenticated = !isLoading && accessToken && user;

  const run = useRef(false);

  useEffect(() => {
    if (Platform.OS === "web" && !run.current) {
      run.current = true;
      return;
    }

    async function checkAuthAndRedirect() {
      if (isAuthenticated) {
        router.replace("/Home");
      } else if (!isLoading && !isAuthenticated) {
        const result = await validateRefreshToken();

        if (result.success) {
          setErrorMessage("Error unauthorized user. please log in again");
        }
      }
    }

    checkAuthAndRedirect();
  }, [isAuthenticated]);

  return { isAuthenticated, errorMessage, isLoading };
}

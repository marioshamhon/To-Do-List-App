import { useRouter, usePathname } from "expo-router";
import { useEffect, useState, useRef } from "react";
import { Platform } from "react-native";
import { useAuth } from "../contexts/auth.context";

export function useAuthRedirect() {
  const { user, accessToken, isLoading, isRefreshTokenExpired } = useAuth();
  const router = useRouter();

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
      } else if (!isLoading) {
        if (isRefreshTokenExpired) {
          setErrorMessage("Error: Session expired. Please log in again");
        } else if (accessToken && !user) {
          setErrorMessage(
            "Error: cannot automatically sign in user. Please Try again"
          );
        }
      }
    }

    checkAuthAndRedirect();
  }, [isAuthenticated]);

  return { isAuthenticated, errorMessage, isLoading };
}

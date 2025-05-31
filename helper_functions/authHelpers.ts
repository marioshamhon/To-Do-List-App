import { Dispatch, SetStateAction } from "react";
import type { Router } from "expo-router";
import { registerUser, loginUser, logOutUser } from "../services/auth.service";
import { User } from "@/contexts/auth.context";
import { deleteItem, getItem } from "../securestore/auth.storage";
import { Platform } from "react-native";

export async function handleRegister(
  name: string,
  email: string,
  password: string,
  setErrorMessage: Dispatch<SetStateAction<string>>,
  setPassword: Dispatch<SetStateAction<string>>,
  setUser: (user: User) => void,
  setAcessToken: Dispatch<SetStateAction<string>>,
  router: Router
) {
  const minimumPasswordLength = 6;

  setErrorMessage(""); // Clear previous error

  if (name === "" && email === "" && password === "") {
    setErrorMessage("Please provide a name, email, and password");
    return;
  }

  if (name === "") {
    setErrorMessage("Please provide a name");
    return;
  }

  if (email === "") {
    setErrorMessage("Please provide an email");
    return;
  }

  if (password === "") {
    setErrorMessage("Please provide an password");
    return;
  }

  if (password.length < minimumPasswordLength) {
    setPassword("");
    setErrorMessage(
      `Password too short please provide an password with a minimum of ${minimumPasswordLength} characters`
    );
    return;
  }
  const result = await registerUser(name, email, password);

  if (result.success) {
    const [newUserFromDB] = result.data.user;
    setUser(newUserFromDB);
    setAcessToken(result.data.accessToken);

    router.push("/Home");
  } else {
    setErrorMessage(result.message);
    setPassword("");
  }
}

export async function handleLogin(
  email: string,
  password: string,
  setErrorMessage: Dispatch<SetStateAction<string>>,
  setPassword: Dispatch<SetStateAction<string>>,
  setUser: (user: User) => void,
  setAcessToken: Dispatch<SetStateAction<string>>,
  router: Router
) {
  setErrorMessage(""); // Clear previous error

  if (email === "" && password === "") {
    setErrorMessage("Please provide an email and password");
    return;
  }

  if (email === "") {
    setErrorMessage("Please provide an email");
    return;
  }

  if (password === "") {
    setErrorMessage("Please provide an password");
    return;
  }

  const result = await loginUser(email, password);

  if (result.success) {
    setUser(result.data.user);
    setAcessToken(result.data.accessToken);

    router.push("/Home");
  } else {
    setErrorMessage(result.message);
    setPassword("");
  }
}

export async function handleSignOut(
  accessToken: string,
  setAccessToken: Dispatch<SetStateAction<string>>,
  setUser: (user: User | null) => void,
  setErrorMessage: Dispatch<SetStateAction<string>>,
  router: Router
) {
  const result = await logOutUser(accessToken, setAccessToken);

  if (!result.success) {
    setErrorMessage(result.message);
    return;
  }

  if (Platform.OS !== "web") {
    await deleteItem("refreshToken");

    const refreshToken = await getItem("refreshToken");

    if (refreshToken) {
      console.log("Failed to delete refresh token from secure store");
      return;
    }
  }

  setUser(null);

  setAccessToken("");

  router.replace("/");
}

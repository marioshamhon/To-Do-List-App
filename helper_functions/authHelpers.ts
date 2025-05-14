import { Dispatch, SetStateAction } from "react";
import { useRouter } from "expo-router";
import { registerUser, loginUser } from "../services/auth.service";
import { User } from "@/contexts/auth.context";

const router = useRouter();

export async function handleRegister(
  name: string,
  email: string,
  password: string,
  setErrorMessage: Dispatch<SetStateAction<string>>,
  setPassword: Dispatch<SetStateAction<string>>,
  setUser: (user: User) => void
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
    await setUser(newUserFromDB);

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
  setUser: (user: User) => void
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
    await setUser(result.data.user);
    router.push("/Home");
  } else {
    setErrorMessage(result.message);
    setPassword("");
  }
}

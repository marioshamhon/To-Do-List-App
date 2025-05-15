import React, { Dispatch, SetStateAction } from "react";
import {
  fetchUser,
  updateUserName,
  updateUserEmail,
  verifyUserPassword,
  updateUserPassword,
} from "../services/user.service";

import { User } from "../contexts/auth.context";

export async function handleFetchUser(setUser: (user: User) => void) {
  const result = await fetchUser();

  if (!result.success) {
    console.error("Failed to fetch user object from database");
    return;
  }

  const userDocumentmentFromDb = result.data.user;

  setUser(userDocumentmentFromDb);
}

export function handleSaveButtonPressed(
  nameOrEmail: string,
  label: string,
  setUser: (user: User) => void,
  setErrorMessage: Dispatch<SetStateAction<string>>,
  setShowModal: Dispatch<SetStateAction<boolean>>
) {
  if (label === "Name") {
    handleUpdateUserName(nameOrEmail, setUser, setErrorMessage, setShowModal);
  } else if (label === "Email") {
    handleUpdateUserEmail(nameOrEmail, setUser, setErrorMessage, setShowModal);
  }
}

async function handleUpdateUserName(
  name: string,
  setUser: (user: User) => void,
  setErrorMessage: Dispatch<SetStateAction<string>>,
  setShowModal: Dispatch<SetStateAction<boolean>>
) {
  if (name === "") {
    setErrorMessage("Name field blank Please enter a name");
    return;
  }

  const result = await updateUserName(name);

  if (!result.success) {
    setErrorMessage(result.message);
    return;
  }

  const updatedUserObjectFromDb = result.data.updatedUser;

  setShowModal(false);

  setUser(updatedUserObjectFromDb);
}

async function handleUpdateUserEmail(
  email: string,
  setUser: (user: User) => void,
  setErrorMessage: Dispatch<SetStateAction<string>>,
  setShowModal: Dispatch<SetStateAction<boolean>>
) {
  if (email === "") {
    setErrorMessage("Email field blank Please enter a email");
    return;
  }

  const result = await updateUserEmail(email);

  if (!result.success) {
    setErrorMessage(result.message);
    return;
  }

  const updatedUserObjectFromDb = result.data.updatedUser;

  setShowModal(false);

  setUser(updatedUserObjectFromDb);
}

export async function handleVerifyPassword(
  password: string,
  setStep: Dispatch<SetStateAction<string>>,
  setErrorMessage: Dispatch<SetStateAction<string>>,
  setVerifyPassword: Dispatch<SetStateAction<string>>
) {
  setErrorMessage("");

  if (password === "") {
    setErrorMessage("Password field blank. Please enter your curent password");
    return;
  }

  const result = await verifyUserPassword(password);

  if (!result.success) {
    setErrorMessage(result.message);
    setVerifyPassword("");
    return;
  }

  setStep("update");
  setVerifyPassword(""); // Clear TextInput after password successfully verified
}

export async function handleUpdateUserPassword(
  password: string,
  confirmPassword: string,
  setPassword: Dispatch<SetStateAction<string>>,
  setConfirmPassword: Dispatch<SetStateAction<string>>,
  setStep: Dispatch<SetStateAction<string>>,
  setErrorMessage: Dispatch<SetStateAction<string>>
) {
  const minimumPasswordLength = 6;

  setErrorMessage("");

  if (password === "") {
    setErrorMessage("Password field blank");
    setPassword("");
    setConfirmPassword("");
    return;
  }

  if (confirmPassword === "") {
    setErrorMessage(" Confirm password field blank");
    setPassword("");
    setConfirmPassword("");
    return;
  }

  if (password !== confirmPassword) {
    setErrorMessage(
      " Passwords do not match. Please reneter your new password"
    );
    setPassword("");
    setConfirmPassword("");
    return;
  }

  if (password === confirmPassword && password.length < minimumPasswordLength) {
    setErrorMessage(
      `Password too short please provide an password with a minimum of ${minimumPasswordLength} characters`
    );
    setPassword("");
    setConfirmPassword("");
    return;
  }

  const result = await updateUserPassword(password);

  if (!result.success) {
    setErrorMessage(result.message);
    setPassword("");
    setConfirmPassword("");
    return;
  }

  setStep("success");

  setPassword(""); // Clear first TextInput after password successfully changed
  setConfirmPassword(""); // Clear second TextInput after password successfully changed
}

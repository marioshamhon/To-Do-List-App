import React, { Dispatch, SetStateAction } from "react";
import { fetchUser } from "../services/user.service";
import { updateUserName } from "../services/user.service";
import { updateUserEmail } from "../services/user.service";
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

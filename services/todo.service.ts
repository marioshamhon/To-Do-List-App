import { Dispatch, SetStateAction } from "react";
import { getItem } from "../securestore/auth.storage";

import fetchWrapper from "./fetchWrapper";
import { access } from "fs";

const todoApiURl = "http://192.168.1.6:5000/api/todos/";

export async function fetchTodos(
  accessToken: string,
  setAccessToken: Dispatch<SetStateAction<string>>
) {
  try {
    const response = await fetchWrapper(
      todoApiURl,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
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
        message: responseData.error || "fetch todos failed server side",
      };
    }
  } catch (error) {
    console.error("Error in fetchTodo function:", error);
    return { success: false, message: "Unexpected error occurred" };
  }
}

export async function postNewTodo(
  todoText: string,
  isCompleted: boolean,
  accessToken: string,
  setAccessToken: Dispatch<SetStateAction<string>>
) {
  try {
    const response = await fetchWrapper(
      todoApiURl,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ todoText, isCompleted }),
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
        message: responseData.error || "Post new todo failed server side",
      };
    }
  } catch (error) {
    console.error("Error in postNewTodo function:", error);
    return { success: false, message: "Unexpected error occurred" };
  }
}

export async function updateTodoToggleCheckmark(
  todoId: string,
  isCompleted: boolean,
  accessToken: string,
  setAccessToken: Dispatch<SetStateAction<string>>
) {
  try {
    const response = await fetchWrapper(
      `${todoApiURl}${todoId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ isCompleted }),
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
        message: responseData.error || "updateTodoCheckmark failed server side",
      };
    }
  } catch (error) {
    console.error("Error in updateTodoCheckmark function:", error);
    return { success: false, message: "Unexpected error occurred" };
  }
}

export async function updateTodoText(
  todoId: string,
  todoText: string,
  accessToken: string,
  setAccessToken: Dispatch<SetStateAction<string>>
) {
  try {
    const response = await fetchWrapper(
      `${todoApiURl}${todoId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ todoText }),
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
        message: responseData.error || "updateTodoText failed server side",
      };
    }
  } catch (error) {
    console.error("Error in updateTodoText function:", error);
    return { success: false, message: "Unexpected error occurred" };
  }
}

export async function deleteTodo(
  toddoId: string,
  accessToken: string,
  setAccessToken: Dispatch<SetStateAction<string>>
) {
  try {
    const response = await fetchWrapper(
      `${todoApiURl}${toddoId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
      accessToken,
      setAccessToken
    );

    const responseData = await response.json();

    if (response.ok) {
      return { success: true };
    } else {
      return {
        success: false,
        message: responseData.error || "delete todos failed server side",
      };
    }
  } catch (error) {
    console.error("Error in deleteTodo function:", error);
    return { success: false, message: "Unexpected error occurred" };
  }
}

import { getToken } from "../securestore/auth.storage.js";

const todoApuURl = "http://192.168.1.6:5000/api/todo/";

export async function postNewTodo(todoText, isCompleted) {
  const token = await getToken();

  try {
    const response = await fetch(todoApuURl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({ todoText, isCompleted }),
    });

    const responseData = await response.json();

    if (response.ok) {
      return { success: true, data: responseData.data };
    } else {
      return {
        success: false,
        message: responseData.error || "Post new todo failed",
      };
    }
  } catch (error) {
    console.error("Error in postNewTodo function:", error);
    return { success: false, message: "Unexpected error occurred" };
  }
}

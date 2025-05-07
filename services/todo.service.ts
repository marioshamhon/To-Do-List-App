import { getToken } from "../securestore/auth.storage";

const todoApiURl = "http://192.168.1.6:5000/api/todos/";

export async function fetchTodos() {
  try {
    const token = await getToken();

    if (!token) {
      throw new Error(
        "Token not found this is comming from the fetchTodos function"
      );
    }

    const response = await fetch(todoApiURl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

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

export async function postNewTodo(todoText: string, isCompleted: boolean) {
  try {
    const token = await getToken();

    if (!token) {
      throw new Error(
        "Token not found this is comming from the postNewTodo Function"
      );
    }

    const response = await fetch(todoApiURl, {
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
  isCompleted: boolean
) {
  try {
    const token = await getToken();

    if (!token) {
      throw new Error(
        "Token not found this is comming from the updateTodoCheckmark Function"
      );
    }

    const response = await fetch(`${todoApiURl}${todoId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({ isCompleted }),
    });

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

export async function updateTodoText(todoId: string, todoText: string) {
  try {
    const token = await getToken();

    if (!token) {
      throw new Error(
        "Token not found this is comming from the updateTodoText Function"
      );
    }

    const response = await fetch(`${todoApiURl}${todoId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({ todoText }),
    });

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

//DeleteTodo function

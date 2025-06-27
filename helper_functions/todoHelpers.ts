import React, { Dispatch, SetStateAction } from "react";
import {
  fetchTodos,
  postNewTodo,
  updateTodoToggleCheckmark,
  updateTodoText,
  deleteTodo,
} from "../services/todo.service";
import Todo from "../models/todo.model";

export type Todo = {
  _id: string;
  todoText: string;
  isCompleted: boolean;
  isNewTodo: boolean;
};

export function handleAddBlankTodo(
  todosArray: Todo[],
  setTodos: Dispatch<SetStateAction<Todo[]>>,
  setErrorMessage: Dispatch<SetStateAction<string>>
): void {
  const newTodo: Todo = {
    _id: Date.now().toString(),
    todoText: "",
    isCompleted: false,
    isNewTodo: true,
  };

  handleDeleteBlankTodo(
    "add button delete",
    todosArray,
    setTodos,
    setErrorMessage
  );

  setTodos((prev) => [...prev, newTodo]);
}

function handleDeleteBlankTodo(
  todoId: string,
  todosArray: Todo[],
  setTodos: Dispatch<SetStateAction<Todo[]>>,
  setErrorMessage: Dispatch<SetStateAction<string>>
) {
  setErrorMessage("");

  const updatedTodoArray =
    todoId === "add button delete"
      ? todosArray.filter(
          (todo) => !(todo.isNewTodo && todo.todoText.trim() === "")
        )
      : todosArray.filter((todo) => todo._id != todoId);

  setTodos(updatedTodoArray);
}

export function handleChangeTodoText(
  id: string,
  newText: string,
  setTodos: Dispatch<SetStateAction<Todo[]>>
): void {
  setTodos((prev) =>
    prev.map((todo) =>
      todo._id === id ? { ...todo, todoText: newText } : todo
    )
  );
}

export function handleOnBlur(
  item: Todo,
  originalTodoText: React.RefObject<string>,
  setTodos: Dispatch<SetStateAction<Todo[]>>,
  setErrorMessage: Dispatch<SetStateAction<string>>,
  accessToken: string,
  setAccessToken: Dispatch<SetStateAction<string>>,
  todosArray: Todo[],
  isAiSuggestion: boolean
) {
  setErrorMessage("");

  if (item.isNewTodo && item.todoText.trim() != "") {
    handlePostNewTodo(
      item._id,
      item.todoText,
      item.isCompleted,
      setTodos,
      setErrorMessage,
      accessToken,
      setAccessToken,
      isAiSuggestion
    );
  } else if (
    !item.isNewTodo &&
    item.todoText.trim() != originalTodoText.current.trim()
  ) {
    handleUpdateTodoText(
      item,
      setTodos,
      setErrorMessage,
      accessToken,
      setAccessToken,
      originalTodoText.current
    );
  } else if (item.isNewTodo && item.todoText.trim() === "") {
    handleDeleteBlankTodo(item._id, todosArray, setTodos, setErrorMessage);
  }
}

function handleUpdateTodoInList(
  currentTodosArray: Todo[],
  todoFromDb: Todo
): Todo[] {
  const newTodosArray = currentTodosArray.map((todo) =>
    todo._id === todoFromDb._id ? { ...todoFromDb, isNewTodo: false } : todo
  );

  return newTodosArray;
}

export async function handleFetchTodos(
  setTodos: Dispatch<SetStateAction<Todo[]>>,
  setErrorMessage: Dispatch<SetStateAction<string>>,
  accessToken: string,
  setAccessToken: Dispatch<SetStateAction<string>>,
  setIsTodosLoading: Dispatch<SetStateAction<boolean>>,
  setFetchTodosErrorFlag: Dispatch<SetStateAction<boolean>>
): Promise<void> {
  const result = await fetchTodos(accessToken, setAccessToken);

  if (!result.success) {
    setIsTodosLoading(false);
    setErrorMessage(result.message);
    setFetchTodosErrorFlag(true);
    return;
  }

  const todosFromDb: Todo[] = result.data.userTodos;

  const todosFromDbWithFlag = todosFromDb.map((todo) => ({
    ...todo,
    isNewTodo: false,
  }));

  setTodos(todosFromDbWithFlag);
  setIsTodosLoading(false);
}

export async function handlePostNewTodo(
  tempTodoId: string,
  todoText: string,
  isCompleted: boolean,
  setTodos: Dispatch<SetStateAction<Todo[]>>,
  setErrorMessage: Dispatch<SetStateAction<string>>,
  accessToken: string,
  setAccessToken: Dispatch<SetStateAction<string>>,
  isAiSuggestion: boolean
): Promise<void> {
  setErrorMessage("");

  const result = await postNewTodo(
    todoText,
    isCompleted,
    accessToken,
    setAccessToken
  );

  if (!result.success) {
    setTodos((todos) => todos.filter((todo) => todo._id !== tempTodoId));
    setErrorMessage(result.message);
    return;
  }

  const [todoFromDb] = result.data.newTodo;

  if (!isAiSuggestion) {
    setTodos((currentTodosArray) =>
      currentTodosArray.map((todo) =>
        todo._id === tempTodoId ? { ...todoFromDb, isNewTodo: false } : todo
      )
    );
  } else {
    setTodos((currentTodosArray) => [
      ...currentTodosArray,
      { ...todoFromDb, isNewTodo: false },
    ]);
  }
}

export async function handleUpdateToggleCheckMark(
  todo: Todo,
  setTodos: Dispatch<SetStateAction<Todo[]>>,
  setErrorMessage: Dispatch<SetStateAction<string>>,
  accessToken: string,
  setAccessToken: Dispatch<SetStateAction<string>>
) {
  setErrorMessage("");

  if (todo.todoText.trim() === "") {
    setErrorMessage("Todo cannot be blank.");
    return;
  }

  const isCompletedStaus = !todo.isCompleted;

  const result = await updateTodoToggleCheckmark(
    todo._id,
    isCompletedStaus,
    accessToken,
    setAccessToken
  );

  if (!result.success) {
    setErrorMessage(result.message);
    return;
  }

  const todoFromDb = result.data.updatedTodo;

  setTodos((currentTodosArray) =>
    handleUpdateTodoInList(currentTodosArray, todoFromDb)
  );
}

async function handleUpdateTodoText(
  todoItem: Todo,
  setTodos: Dispatch<SetStateAction<Todo[]>>,
  setErrorMessage: Dispatch<SetStateAction<string>>,
  accessToken: string,
  setAccessToken: Dispatch<SetStateAction<string>>,
  originalTodoText: string
): Promise<void> {
  const result = await updateTodoText(
    todoItem._id,
    todoItem.todoText,
    accessToken,
    setAccessToken
  );

  if (!result.success) {
    todoItem.todoText = originalTodoText;

    setErrorMessage(result.message);
    return;
  }

  const todoFromDb = result.data.updatedTodo;

  setTodos((currentTodosArray) =>
    handleUpdateTodoInList(currentTodosArray, todoFromDb)
  );
}

export async function handleDeleteTodo(
  todoToBeDeleted: Todo,
  todosArray: Todo[],
  setTodos: Dispatch<SetStateAction<Todo[]>>,
  setErrorMessage: Dispatch<SetStateAction<string>>,
  accessToken: string,
  setAccessToken: Dispatch<SetStateAction<string>>
): Promise<void> {
  setErrorMessage("");

  if (todoToBeDeleted.isNewTodo && todoToBeDeleted.todoText.trim() === "") {
    handleDeleteBlankTodo(
      todoToBeDeleted._id,
      todosArray,
      setTodos,
      setErrorMessage
    );
    return;
  }

  const result = await deleteTodo(
    todoToBeDeleted._id,
    accessToken,
    setAccessToken
  );

  if (!result.success) {
    setErrorMessage(result.message);
    return;
  }

  const updatedTodoArray = todosArray.filter(
    (todo) => todo._id != todoToBeDeleted._id
  );

  setTodos(updatedTodoArray);
}

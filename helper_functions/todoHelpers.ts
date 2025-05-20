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
  setTodos: Dispatch<SetStateAction<Todo[]>>
): void {
  const newTodo: Todo = {
    _id: Date.now().toString(),
    todoText: "",
    isCompleted: false,
    isNewTodo: true,
  };

  handleDeleteBlankTodo("add button delete", todosArray, setTodos);

  setTodos((prev) => [...prev, newTodo]);
}

function handleDeleteBlankTodo(
  todoId: string,
  todosArray: Todo[],
  setTodos: Dispatch<SetStateAction<Todo[]>>
) {
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
  todosArray: Todo[]
) {
  if (item.isNewTodo && item.todoText.trim() != "") {
    handlePostNewTodo(
      item._id,
      item.todoText,
      item.isCompleted,
      setTodos,
      setErrorMessage,
      accessToken,
      setAccessToken
    );
  } else if (
    !item.isNewTodo &&
    item.todoText.trim() != originalTodoText.current.trim()
  ) {
    handleUpdateTodoText(
      item._id,
      item.todoText,
      setTodos,
      setErrorMessage,
      accessToken,
      setAccessToken
    );
  } else if (item.isNewTodo && item.todoText.trim() === "") {
    handleDeleteBlankTodo(item._id, todosArray, setTodos);
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
  setAccessToken: Dispatch<SetStateAction<string>>
): Promise<void> {
  const result = await fetchTodos(accessToken, setAccessToken);

  if (!result.success) {
    setErrorMessage(result.message);
    return;
  }

  const todosFromDb: Todo[] = result.data.userTodos;

  const todosFromDbWithFlag = todosFromDb.map((todo) => ({
    ...todo,
    isNewTodo: false,
  }));

  setTodos(todosFromDbWithFlag);
}

async function handlePostNewTodo(
  tempTodoId: string,
  todoText: string,
  isCompleted: boolean,
  setTodos: Dispatch<SetStateAction<Todo[]>>,
  setErrorMessage: Dispatch<SetStateAction<string>>,
  accessToken: string,
  setAccessToken: Dispatch<SetStateAction<string>>
): Promise<void> {
  const result = await postNewTodo(
    todoText,
    isCompleted,
    accessToken,
    setAccessToken
  );

  if (!result.success) {
    setErrorMessage(result.message);
    return;
  }

  const [todoFromDb] = result.data.newTodo;

  setTodos((currentTodosArray) => {
    const filteredTodos = currentTodosArray.filter(
      (todo) => todo._id !== tempTodoId
    );

    const newTodosArray = [
      ...filteredTodos,
      { ...todoFromDb, isNewTodo: false },
    ];

    return newTodosArray;
  });
}

export async function handleUpdateToggleCheckMark(
  todoId: string,
  isCompletedCurrentStuatus: boolean,
  setTodos: Dispatch<SetStateAction<Todo[]>>,
  setErrorMessage: Dispatch<SetStateAction<string>>,
  accessToken: string,
  setAccessToken: Dispatch<SetStateAction<string>>
): Promise<void> {
  const isCompletedStaus = !isCompletedCurrentStuatus;

  const result = await updateTodoToggleCheckmark(
    todoId,
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
  todoId: string,
  updatedTodoText: string,
  setTodos: Dispatch<SetStateAction<Todo[]>>,
  setErrorMessage: Dispatch<SetStateAction<string>>,
  accessToken: string,
  setAccessToken: Dispatch<SetStateAction<string>>
): Promise<void> {
  const result = await updateTodoText(
    todoId,
    updatedTodoText,
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

export async function handleDeleteTodo(
  todoToBeDeleted: Todo,
  todosArray: Todo[],
  setTodos: Dispatch<SetStateAction<Todo[]>>,
  setErrorMessage: Dispatch<SetStateAction<string>>,
  accessToken: string,
  setAccessToken: Dispatch<SetStateAction<string>>
): Promise<void> {
  if (todoToBeDeleted.isNewTodo && todoToBeDeleted.todoText.trim() === "") {
    handleDeleteBlankTodo(todoToBeDeleted._id, todosArray, setTodos);
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

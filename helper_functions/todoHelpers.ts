import React, { Dispatch, SetStateAction } from "react";
import {
  fetchTodos,
  postNewTodo,
  updateTodoToggleCheckmark,
  updateTodoText,
  deleteTodo,
} from "@/services/todo.service";
import Todo from "@/models/todo.model";

export type Todo = {
  _id: string;
  todoText: string;
  isCompleted: boolean;
  isNewTodo: boolean;
};

export function handleAddBlankTodo(
  setTodos: Dispatch<SetStateAction<Todo[]>>
): void {
  const newTodo: Todo = {
    _id: Date.now().toString(),
    todoText: "",
    isCompleted: false,
    isNewTodo: true,
  };
  setTodos((prev) => [...prev, newTodo]);
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
  setErrorMessage: Dispatch<SetStateAction<string>>
) {
  if (item.isNewTodo && item.todoText != "") {
    handlePostNewTodo(
      item._id,
      item.todoText,
      item.isCompleted,
      setTodos,
      setErrorMessage
    );
  } else if (item.todoText != originalTodoText.current) {
    handleUpdateTodoText(item._id, item.todoText, setTodos, setErrorMessage);
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
  setErrorMessage: Dispatch<SetStateAction<string>>
): Promise<void> {
  const result = await fetchTodos();

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
  setErrorMessage: Dispatch<SetStateAction<string>>
): Promise<void> {
  const result = await postNewTodo(todoText, isCompleted);

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
  setErrorMessage: Dispatch<SetStateAction<string>>
): Promise<void> {
  const isCompletedStaus = !isCompletedCurrentStuatus;

  const result = await updateTodoToggleCheckmark(todoId, isCompletedStaus);

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
  setErrorMessage: Dispatch<SetStateAction<string>>
): Promise<void> {
  const result = await updateTodoText(todoId, updatedTodoText);

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
  toddoId: string,
  todosArray: Todo[],
  setTodos: Dispatch<SetStateAction<Todo[]>>,
  setErrorMessage: Dispatch<SetStateAction<string>>
): Promise<void> {
  const result = await deleteTodo(toddoId);

  if (!result.success) {
    setErrorMessage(result.message);
    return;
  }

  const updatedTodoArray = todosArray.filter((todo) => todo._id != toddoId);

  setTodos(updatedTodoArray);
}

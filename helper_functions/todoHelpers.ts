import { Dispatch, SetStateAction } from "react";
import {
  fetchTodos,
  postNewTodo,
  updateTodoToggleCheckmark,
  updateTodoText,
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

export async function handlePostNewTodo(
  todoId: string,
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

  setTodos((prevTodos) =>
    prevTodos.map((todo) =>
      todo._id === todoId
        ? {
            ...todoFromDb,
            isNewTodo: false,
          }
        : todo
    )
  );
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

  const updatedTodoFromDb = result.data.updatedMongoDocument;

  setTodos((prevTodos) =>
    prevTodos.map((todo) =>
      todo._id === todoId ? { ...updatedTodoFromDb, isNewTodo: false } : todo
    )
  );
}

export async function handleUpdateTodoText(
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

  const updatedTodoFromDb = result.data.updatedMongoDocument;

  setTodos((prevTodos) =>
    prevTodos.map((todo) =>
      todo._id === todoId ? { ...updatedTodoFromDb, isNewTodo: false } : todo
    )
  );
}

//handleDeleteTodo

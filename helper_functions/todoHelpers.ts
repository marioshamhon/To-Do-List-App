import { Dispatch, SetStateAction } from "react";
import {
  fetchTodos,
  postNewTodo,
  updateTodoCheckmark,
} from "@/services/todo.service";
import Todo from "@/models/todo.model";

export type Todo = {
  _id: string;
  todoText: string;
  isCompleted: boolean;
  isNewTodo: boolean;
};

export function addBlankTodo(setTodos: Dispatch<SetStateAction<Todo[]>>): void {
  const newTodo: Todo = {
    _id: Date.now().toString(),
    todoText: "",
    isCompleted: false,
    isNewTodo: true,
  };
  setTodos((prev) => [...prev, newTodo]);
}

export function changeTodoText(
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

export async function getTodosFromDb(
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

export async function saveTodoToDb(
  tempTodo: Todo,
  setTodos: Dispatch<SetStateAction<Todo[]>>,
  setErrorMessage: Dispatch<SetStateAction<string>>
): Promise<void> {
  const result = await postNewTodo(tempTodo.todoText, tempTodo.isCompleted);

  if (!result.success) {
    setErrorMessage(result.message);
    return;
  }

  const [todoFromDb] = result.data.newTodo;

  setTodos((prevTodos) =>
    prevTodos.map((todo) =>
      todo._id === tempTodo._id
        ? {
            ...todoFromDb,
            isNewTodo: false,
          }
        : todo
    )
  );
}

export async function handleCheckMark(
  todoId: string,
  isCompletedCurrentStuatus: boolean,
  setTodos: Dispatch<SetStateAction<Todo[]>>,
  setErrorMessage: Dispatch<SetStateAction<string>>
): Promise<void> {
  const isCompletedStaus = !isCompletedCurrentStuatus;

  const result = await updateTodoCheckmark(todoId, isCompletedStaus);

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

export function updateTodoFromDb() {
  //make async later
  console.log("placeholder update function");
}

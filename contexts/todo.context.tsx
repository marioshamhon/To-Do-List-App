import React, { Dispatch, SetStateAction } from "react";
import { Todo } from "@/helper_functions/todoHelpers";
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface TodoContextType {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}

interface TodoProviderProps {
  children: ReactNode;
}

const TodoContext = createContext<TodoContextType>({
  todos: [],
  setTodos: (() => {}) as Dispatch<SetStateAction<Todo[]>>,
});

export function TodoProvider({ children }: TodoProviderProps) {
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  return useContext(TodoContext);
}

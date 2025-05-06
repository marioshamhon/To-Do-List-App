import { Router } from "express";

import authenticateUser from "../middlewares/authenticateuser.middleware";

import {
  getTodos,
  createTodo,
  updateTodos,
} from "../controllers/todo.controller";

const todoRouter = Router();

todoRouter.get("/", authenticateUser, getTodos);

todoRouter.post("/", authenticateUser, createTodo);

todoRouter.patch("/:id", updateTodos);

// todoRouter.delete('/:id')

export default todoRouter;

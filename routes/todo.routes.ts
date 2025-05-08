import { Router } from "express";

import authenticateUser from "../middlewares/authenticateuser.middleware";

import {
  getTodos,
  createTodo,
  updateTodos,
  deleteTods,
} from "../controllers/todo.controller";

const todoRouter = Router();

todoRouter.get("/", authenticateUser, getTodos);

todoRouter.post("/", authenticateUser, createTodo);

todoRouter.patch("/:id", authenticateUser, updateTodos);

todoRouter.delete("/:id", authenticateUser, deleteTods);

export default todoRouter;

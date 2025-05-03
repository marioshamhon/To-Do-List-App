import { Router } from 'express';

import authenticateUser from '../middlewares/authenticateuser.middleware.js';

import { getTodos, createTodo } from '../controller/todo.controller.js'

const todoRouter = Router()

todoRouter.get('/', authenticateUser, getTodos);

todoRouter.post('/', authenticateUser, createTodo);

// todoRouter.put('/:id');

// todoRouter.delete('/:id')

export default todoRouter

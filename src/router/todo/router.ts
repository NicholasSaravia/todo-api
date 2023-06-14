import { Router } from 'express';
import { getOneTodo, getTodos } from '.';

export const todoRouter = Router();

todoRouter.get('/todo', getTodos);
todoRouter.get('/todo/:id', getOneTodo);

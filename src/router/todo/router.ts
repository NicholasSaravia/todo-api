import { Router } from 'express';
import { createTodo, deleteTodo, getOneTodo, getTodos, updateTodo } from '.';

export const todoRouter = Router();

todoRouter.get('/todo', getTodos);
todoRouter.get('/todo/:id', getOneTodo);
todoRouter.post('/todo', createTodo);
todoRouter.put('/todo/:id', updateTodo);
todoRouter.delete('/todo/:id', deleteTodo);

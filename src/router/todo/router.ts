import { Router } from 'express';
import { createTodo, deleteTodo, getOneTodo, getTodos, updateTodo } from '.';
import { body } from 'express-validator';

export const todoRouter = Router();

todoRouter.get('/todo', getTodos);
todoRouter.get('/todo/:id', getOneTodo);
todoRouter.post('/todo', [body('value').isString().trim()], createTodo);
todoRouter.put(
    '/todo/:id',
    [body('value').optional().isString().trim()],
    updateTodo
);
todoRouter.delete('/todo/:id', deleteTodo);

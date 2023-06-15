import { NextFunction, Request, Response } from 'express';
import { prisma } from '../../db';

export const getTodos = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const todos = await prisma.todo.findMany({
            where: {
                userId: req.user.id
            }
        });
        res.status(200).json({ data: todos });
    } catch (error) {
        next(error);
    }
};

export const getOneTodo = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const todo = await prisma.todo.findUnique({
            where: {
                id_userId: {
                    id: req.params.id,
                    userId: req.user.id
                }
            }
        });

        if (!todo) {
            res.status(400).json({
                message:
                    'are you sure you are searching for something that is yours'
            });
            return;
        }

        res.status(200).json({ data: todo });
    } catch (error) {
        next(error);
    }
};

export const createTodo = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const todo = await prisma.todo.create({
            data: {
                ...req.body,
                userId: req.user.id
            }
        });

        res.status(201).json({ data: todo });
    } catch (error) {
        next(error);
    }
};

export const updateTodo = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const todo = await prisma.todo.update({
            data: req.body,
            where: {
                id_userId: {
                    id: req.params.id,
                    userId: req.user.id
                }
            }
        });
        res.status(200).json({ data: todo });
    } catch (error) {
        next(error);
    }
};

export const deleteTodo = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const todo = await prisma.todo.delete({
            where: {
                id_userId: {
                    id: req.params.id,
                    userId: req.user.id
                }
            }
        });
        res.status(200).json({ data: todo });
    } catch (error) {
        next(error);
    }
};

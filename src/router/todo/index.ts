import { Request, Response } from 'express';
import { prisma } from '../../db';

export const getTodos = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany({
        where: {
            userId: req.user.id
        }
    });
    res.status(200).json({ data: todos });
};

export const getOneTodo = async (req: Request, res: Response) => {
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

    return res.status(200).json({ data: todo });
};

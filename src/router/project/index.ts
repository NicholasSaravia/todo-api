import { NextFunction, Request, Response } from 'express';
import { prisma } from '../../db';
import { colors } from '../../lib/colors';

export const getProjects = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log('get projects');
    try {
        const projects = await prisma.project.findMany({
            where: {
                userId: req.auth.userId
            }
        });

        res.status(200).json({ data: projects });
    } catch (error) {
        next(error);
    }
};

export const getOneProject = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const project = await prisma.project.findUnique({
            where: {
                id_userId: {
                    id: req.params.id,
                    userId: req.auth.userId
                }
            }
        });

        if (!project) {
            res.status(400).json({
                message:
                    'are you sure you are searching for something that is yours'
            });
            return;
        }

        res.status(200).json({ data: project });
    } catch (error) {
        next(error);
    }
};

export const createProject = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const randomColorIndex = Math.floor(Math.random() * colors.length);
        const bgColor = colors[randomColorIndex];

        const project = await prisma.project.create({
            data: {
                ...req.body,
                userId: req.auth.userId,
                bgColor
            }
        });

        res.status(201).json({ data: project });
    } catch (error) {
        next(error);
    }
};

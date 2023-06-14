import { Request, Response } from 'express';
import { prisma } from '../../db';
import { compare, createJwt, encrypt } from '../../helpers/auth';
import { Prisma } from '@prisma/client';

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await prisma.user.create({
            data: {
                email: req.body.email,
                password: await encrypt(req.body.password)
            }
        });

        const jwt = await createJwt({
            id: user.id,
            email: user.email
        });

        res.status(201).json({ data: jwt });
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === 'P2002') {
                res.status(409).json({ message: 'email already exists' });
                return;
            }
        } else if (e instanceof Error) {
            res.status(500).json({ message: e.message });
            return;
        }

        res.status(500).json({ message: 'oh oh' });
    }
};

export const signIn = async (req: Request, res: Response) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: req.body.email
            }
        });

        if (!user) {
            res.status(404).json({
                message: `user with email ${req.body.email} was not found.`
            });
            return;
        }

        const passwordsMatch = compare(req.body.password, user.password);

        if (!passwordsMatch) {
            res.status(500).json({
                message: 'incorrect password'
            });
            return;
        }

        const token = createJwt({ id: user.id, email: user.email });
        res.status(200).json({
            data: token
        });
    } catch (e) {
        if (e instanceof Error) {
            res.status(500).json({ message: e.message });
            return;
        }

        res.status(500).json({ message: 'oh oh' });
    }
};

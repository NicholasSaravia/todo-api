import { Request, Response } from 'express';
import { prisma } from '../../db';
import { createJwt, encrypt } from '../../helpers/auth';
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
            username: user.email
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

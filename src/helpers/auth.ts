import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';

export const encrypt = async (password: string): Promise<string> => {
    return bcrypt.hash(password, 10);
};

export const compare = async (
    password: string,
    hashedPassword: string
): Promise<boolean> => {
    const passwordsMatch = bcrypt.compare(password, hashedPassword);
    return passwordsMatch;
};

export const createJwt = (user: { id: string; email: string }) => {
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        process.env.JWT_SECRET || '',
        {
            expiresIn: '1d'
        }
    );

    return token;
};

export const protect = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization || '';

    if (!token) {
        res.status(401).json({
            message: 'you forgot to pass the authorization token'
        });
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET || '');
        req.user = user as User;
        next();
    } catch (err) {
        res.status(401).json({ message: 'token is not valid' });
        return;
    }
};

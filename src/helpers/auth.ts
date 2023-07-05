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

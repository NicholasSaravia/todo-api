import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

export const createJwt = async (user: { id: string; username: string }) => {
    return jwt.sign(
        {
            id: user.id,
            username: user.username
        },
        process.env.JWT_SECRET || '',
        {
            expiresIn: '1d'
        }
    );
};

export const protect = (
    req: Request & { user: any },
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization || '';

    if (!token) {
        res.status(401).json({
            message: 'you forgot to pass the authorization token'
        });
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET || '');
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'token is not valid' });
        return;
    }
};

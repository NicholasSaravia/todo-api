import { Router } from 'express';
import { createUser } from '.';
import { body } from 'express-validator';

export const userRouter = Router();

userRouter.post(
    '/user',
    [
        body('email').isEmail(),
        body('password').isString().trim().isLength({
            min: 5
        })
    ],
    createUser
);

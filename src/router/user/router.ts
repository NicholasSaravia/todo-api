import { Router } from 'express';
import { createUser, signIn } from '.';
import { body } from 'express-validator';

export const userRouter = Router();

const validator = [
    body('email').isEmail(),
    body('password').isString().trim().isLength({
        min: 5
    })
];

userRouter.post('/user', validator, createUser);

userRouter.post('/sign-in', validator, signIn);

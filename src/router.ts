import { Router } from 'express';
import { userRouter } from './router/user/router';

const router = Router();
router.use(userRouter);

export default router;

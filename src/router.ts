import { Router } from 'express';
import { todoRouter } from './router/todo/router';
const router = Router();

router.use(todoRouter);

export default router;

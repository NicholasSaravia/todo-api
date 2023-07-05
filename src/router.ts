import { Router } from 'express';
import { todoRouter } from './router/todo/router';
import { projectRouter } from './router/project/router';
const router = Router();

router.use(todoRouter);
router.use(projectRouter);

export default router;

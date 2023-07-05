import { Router } from 'express';
import { createProject, getOneProject, getProjects } from '.';

export const projectRouter = Router();

projectRouter.get('/project/', getProjects);
projectRouter.get('/project/:id', getOneProject);

projectRouter.post('/project/', createProject);

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './router';
import { userRouter } from './router/user/router';
import { protect } from './helpers/auth';

const app = express();

// cors
app.use(cors());

// logger
app.use(morgan('dev'));

/**
 * middleware to allow express to interpret
 * json when in request body
 */
app.use(express.json());

/**
 * this option below is not stirctly needed
 * but a good practice when building api's for
 * our "old-school" buddies
 */
app.use(express.urlencoded({ extended: true }));

// for sign in / sign up
app.use(userRouter);
// for all other routes
app.use('/api', protect, router);

export default app;

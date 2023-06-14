import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

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

app.get('/', (req, res) => {
    return res.status(200).json({ message: 'hello buddy' });
});

export default app;

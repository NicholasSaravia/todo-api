import app from './server';
import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

// load env contents into process
dotenv.config();

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

app.listen(3000, () => {
    console.log('server listening on port 3000');
});

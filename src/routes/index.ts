import express from 'express';
import {apiRoute} from './api';

export const mainRoute = express.Router();

mainRoute.use('/api', apiRoute);

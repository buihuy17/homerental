import express from 'express';
import {authRoute} from './auth';
import {accountRoute} from './account';
import {contactRoute} from "./contact";

export const apiRoute = express.Router();

apiRoute.use('/auth', authRoute);
apiRoute.use('/account', accountRoute);
apiRoute.use('/contact', contactRoute);

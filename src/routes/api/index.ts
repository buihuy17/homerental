import express from 'express';
import {authRoute} from './user';
import {accountRoute} from './account';
import {contactRoute} from "./contact";

export const apiRoute = express.Router();

apiRoute.use('/user', authRoute);
apiRoute.use('/account', accountRoute);
apiRoute.use('/contact', contactRoute);

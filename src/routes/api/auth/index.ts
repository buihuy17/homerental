import express from 'express';
import {verify, signup, login, token} from "../../../app/controllers/auth.controller";
import {checkToken} from '../../../middlewares/token.middleware';
import "express-async-errors";

export const authRoute = express.Router();

authRoute.post('/signup', signup);
authRoute.post('/login', login);
authRoute.post('/token', token);
authRoute.post('/verify', checkToken, verify);



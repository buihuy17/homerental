import express from 'express';
import {verify, signup, login} from "../../../app/controllers/auth.controller";
import {checkToken} from '../../../middlewares/token.middleware';
import "express-async-errors";

export const authRoute = express.Router();

authRoute.post('/signup', signup);
authRoute.post('/login', login);
// router.use(verify);
authRoute.post('/verify', checkToken, verify);



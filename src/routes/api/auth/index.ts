import express from 'express';
import {verify, signup, login} from "../../../app/controllers/user.controller";
import {checkToken} from '../../../middlewares/token.middleware';

export const authRoute = express.Router();

authRoute.post('/signup', signup);
authRoute.post('/login', login);
// router.use(verify);
authRoute.post('/verify', checkToken, verify);



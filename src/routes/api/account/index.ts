import express from "express";
import {
  getAccount,
  getAccounts,
  update,
  deleteAccount,
  getAccountByAdmin
} from "../../../app/controllers/account.controller";
import {checkUser} from "../../../middlewares/user.middleware";
import {checkToken} from "../../../middlewares/token.middleware";
// import {passportMiddleware} from '../../../middlewares/passport.middleware'
// import passport from "passport";
// import jwt from "jsonwebtoken";
// import {Strategy, ExtractJwt} from "passport-jwt";
import {checkAdmin} from "../../../middlewares/admin.middleware";

export const accountRoute = express.Router();

//CRUD
accountRoute.put('/update/:username', checkToken, checkUser, update);
accountRoute.delete('/:username', checkToken, checkUser, deleteAccount);
accountRoute.get('/me', checkToken, checkUser, getAccount);
accountRoute.get('/admin/:username', checkToken, checkAdmin, getAccountByAdmin);

// accountRoute.get('/:username', checkToken, checkUser, getAccount);
accountRoute.get('/admin', checkToken, checkAdmin, getAccounts);



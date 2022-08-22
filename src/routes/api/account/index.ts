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
import "express-async-errors";

export const accountRoute = express.Router();

//Cách xử lí bắt lỗi k dùng thư viện
// const catchAsync = (handler: (req: any, res: any, next: any) => Promise<any>) => async (req: any, res: any, next: any) => {
//   try {
//     await handler(req, res, next);
//   } catch (e) {
//     console.log(e);
//     next(e);
//   }
// }

//CRUD
accountRoute.use(checkToken);
accountRoute.put('/update/:username', checkUser, update);
accountRoute.delete('/:username', checkUser, deleteAccount);
accountRoute.get('/me', checkUser, getAccount);
//Nếu dùng thư viện : catchAsync(getAccount)
accountRoute.get('/admin/:username', checkAdmin, getAccountByAdmin);

accountRoute.get('/:username', checkToken, checkUser, getAccount);
accountRoute.get('/admin', checkAdmin, getAccounts);

//Handle error bằng loop
// interface HandlerConfig {
//   method: string,
//   path: string,
//   middlewares?: any[],
//   controller: (req: any, res: any, next: any) => Promise<any>;
// }
//
// const handler = (route: any, configs: HandlerConfig[]) => {
//   for (const config of configs) {
//     route[config.method](config.path, config.middlewares, catchAsync(config.controller));
//   }
// }
//
// handler(accountRoute, [{
//   method: "get", path: "/me", middlewares: [checkToken], controller: getAccount
// },]);



import passport, {use} from 'passport';
import {Strategy as JwtStrategy, ExtractJwt} from "passport-jwt";
import {Strategy as LocalStrategy} from "passport-local"
import 'dotenv/config';
import {UserModel} from "../app/models/user.model";
import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import {Document} from "mongoose";

interface Account extends Document{
  username: string,
  email: string,
  password: string,
  role: string
}

export interface ExtRequest extends Request{
  account?: Account
}

// let create our strategy for web token
export function passportMiddleware(req: ExtRequest, res: Response, next: NextFunction) {
  passport.authenticate('jwt', {session: false}, function (err, account, stack) {
    if (err || stack) return console.log(err, stack);
    req.account = account;
    // console.log(req);
    // console.log('authenticate');
    next();
  })(req, res, next);
  //successRedirect: '/profile', // chuyển hướng tới trang được bảo vệ
  //failureRedirect: '/signup', // trở lại trang đăng ký nếu có lỗi
  //failureFlash: true // allow flash messages
}

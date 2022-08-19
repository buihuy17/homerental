import passport from 'passport';
import {Strategy, ExtractJwt} from "passport-jwt";
import 'dotenv/config';
import {AccountModel} from "../app/models/user.model";
import {Request, Response, NextFunction} from "express";

export function passportMiddleware(req: Request, res: Response, next: NextFunction) {
  passport.use(new Strategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  }, async (payload, done) => {
    try {
      const account: any = await AccountModel.find({user: req.params.username}, payload.sub);
      if (!account) return res.json({
        message: 'Not find account',
      })
      next();
    } catch (error) {
      next();
    }
  }));
  next();
  passport.authenticate('jwt', {session: false});
}


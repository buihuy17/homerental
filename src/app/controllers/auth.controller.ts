import {createUser} from "../services/auth.service";
import {AuthModel} from "../models/auth.model";
import 'dotenv/config';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import {NextFunction, Request, Response} from "express";


export async function verify(req: Request, res: Response) {
  res.json({message: 'Welcome to website'});
}

//signup
export async function signup(req: Request, res: Response, next: NextFunction) {
  const {username, password, email} = req.body;
  // Check email exists or not
  const emailExist = await AuthModel.findOne({email});
  if (emailExist) return res.status(400).send('Email already exists');
  // Check username exists or not
  const usernameExist = await AuthModel.findOne({username});
  if (usernameExist) return res.status(400).send('Username already exists');

  const userinfo = await createUser(username, email, password);
  return res.status(200).json({
    signup: true,
    data: {
      // token,
      username,
      email,
      role: 'user',
    },
  });
}

//login
export async function login(req: Request, res: Response, next: NextFunction) {
  const {username, password, email} = req.body;

  // Check email
  const account: any = await AuthModel.findOne({username}).select('+password');
  if (!account) return res.status(400).send('Invalid username');
  // check password
  const passwordLogin = await bcrypt.compare(password, account?.password);
  if (!passwordLogin) return res.status(400).send('Invalid password');

  // sign and create token
  const token = jwt.sign({
      _id: account._id,
      iss: 'Bui Huy',
      sub: username,
      iat: new Date().getTime(),
      // exp: new Date().setDate(new Date().getDate() + 3),
      //exp: ma token het han trong vong 3 ngay
    }, process.env.JWT_SECRET as string, {
      expiresIn: '30d',
      algorithm: 'HS256',
    }
  )
//jwt.sign({_id: account._id}, process.env.JWT_SECRET);

// res.header("auth-token", token).send(token);
  delete account["_doc"].password;
  // res.setHeader('auth-token',token);
  res.json({
    data: {
      token,
      data: account,
    },
  });
}
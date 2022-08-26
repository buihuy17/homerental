import {createUser} from "../services/user.service";
import {UserModel} from "../models/user.model";
import 'dotenv/config';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import {NextFunction, Request, Response} from "express";
import {Strategy, ExtractJwt} from "passport-jwt";
import passport from "passport";

const tokenList: any = {};

export async function verify(req: Request, res: Response) {
  res.json({message: 'Welcome to website'});
}

//signup
export async function signup(req: Request, res: Response, next: NextFunction) {
  const {username, password, email} = req.body;
  // Check email or username exists or not
  const checkUserExist = await UserModel.exists({username, email});
  if (checkUserExist) return res.json({
    message: 'Email or username already exists',
  });
  const userinfo = await createUser(username, email, password);
  return res.status(200).json({
    signup: true,
    data: {
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
  const account: any = await UserModel.findOne({username}).select('+password');
  if (!account) return res.status(400).send('Invalid username');
  // check password
  const passwordLogin = await bcrypt.compare(password, account?.password);
  if (!passwordLogin) return res.status(400).send('Invalid password');

  // sign and create token
  const token = jwt.sign({
      _id: account._id,
      sub: username,
      iat: new Date().getTime(),
      // exp: new Date().setDate(new Date().getDate() + 3),
      //exp: ma token het han trong vong 3 ngay
    }, process.env.JWT_SECRET as string, {
      expiresIn: '3d',
      algorithm: 'HS256',
    }
  );

  //refresh token
  const refreshToken = jwt.sign({
    _id: account._id,
    // iss: 'Bui Huy', // nha phat hanh token
    //aud: doi tuong nhan token phat hanh
    //ignoreExpiration: nếu đúng, không xác nhận thời hạn của mã thông báo.
    sub: username,
  }, process.env.JWT_SECRET_REFRESH as string, {
    expiresIn: '30d',
    algorithm: 'HS256',
  })
// res.header("user-token", token).send(token);

  const response = {
    "status": "Logged in",
    "token": token,
    "refreshToken": refreshToken,
  }

  tokenList[refreshToken] = response;
  // console.log(tokenList)

  delete account["_doc"].password;
  res.json({
    response,
    data: account,
  });
}

export async function token(req: Request, res: Response) {
  // if refresh token exists
  const {username, password, email, refreshToken} = req.body;
  // console.log(tokenList)
  if ((refreshToken) && (refreshToken in tokenList)) {
    const account = await UserModel.findOne({username}).select('+password');
    if (!account) return res.status(400).send('Invalid username');
    // check password
    const passwordLogin = await bcrypt.compare(password, account?.password);
    if (!passwordLogin) return res.status(400).send('Invalid password');
    //create token
    const token = jwt.sign({
        sub: username,
      }, process.env.JWT_SECRET as string, {
        expiresIn: '3d',
        algorithm: 'HS256',
      }
    );
    // update the token in the list
    tokenList[refreshToken].token = token;
    res.json({
      token,
    });
  } else {
    res.status(404).send('Invalid request')
  }
}
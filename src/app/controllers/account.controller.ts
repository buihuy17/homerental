import {AccountModel} from "../models/user.model";
import {Request, Response, NextFunction} from "express";
import bcrypt from "bcryptjs";
import passport from 'passport';
import {Strategy, ExtractJwt} from "passport-jwt";
import 'dotenv/config';

export async function getAccounts(req: Request, res: Response) {
  const accounts: object = await AccountModel.find({});
  res.json({
    message: 'get all accounts successfully',
    data: accounts,
  })
}

//Get account by admin
export async function getAccountByAdmin(req: Request, res: Response) {
  const account = await AccountModel.findOne({username: req.params.username});
  if (!account) return res.json({message: 'account not found'});
  res.json({
    message: 'get account user successfully',
    data: account,
  });
}

//get my account
export async function getAccount(req: Request, res: Response) {
  res.json({
    message: 'get my account successfully',
    data: req.user,
  });
}

//Update
export async function update(req: Request, res: Response) {
  let account = await AccountModel.findOne({username: req.params.username}).select(
    '+password'
  );
  if (!account) return res.json({message: 'Error update'});
  const confirmPassword: string = req.body.confirmPassword;
  if (
    confirmPassword &&
    !bcrypt.compareSync(confirmPassword, account.password)
  )
    return res.json({message: 'password not ok'});
  let newPassword: string = account.password;
  if (req.body.newPassword) {
    const salt = await bcrypt.genSalt(10);
    newPassword = bcrypt.hashSync(req.body.newPassword, salt);
  }

  //update
  account = await AccountModel.findOne({username: req.params.username});
  if (!account) return res.json({message: 'Error find account'});
  account = await AccountModel.findOneAndUpdate(
    {username: req.params.username},
    {
      username: req.body.username,
      email: req.body.email,
      password: newPassword,
    },
    {new: true}
  );
  // Object.assign(account, req.body)
  // await account.save();
  res.status(200).json({
    message: 'update OK!',
    data: account,
  });
}

//delete
export async function deleteAccount(req: Request, res: Response, next: NextFunction) {
  let account: any = await AccountModel.findOne({username: req.params.username}).select(
    '+password'
  );
  if (!account) return res.json({
    message: 'Error delete',
  });
  const confirmPassword = req.body.confirmPassword;
  if (
    confirmPassword &&
    !bcrypt.compareSync(confirmPassword, account.password)
  )
    return res.json({message: 'password not ok'});

  account = await AccountModel.deleteOne({username: req.params.username});
  res.status(200).json({
    message: 'delete OK!',
    data: account,
  });
}

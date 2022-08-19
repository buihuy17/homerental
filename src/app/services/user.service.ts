import {AccountModel} from '../models/user.model';
import bcrypt from 'bcryptjs';

export async function createUser(username: string, email: string, password: string) {
  //encode password
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(password, salt);

  const newAccount = new AccountModel({
    username,
    email,
    password: hashPass,
  })
  await newAccount.save();
  return newAccount;
}
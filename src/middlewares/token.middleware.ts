import jwt from "jsonwebtoken";
import {AuthModel} from "../app/models/auth.model";

export async function checkToken(req: any, res: any, next: any) {
  // send a request to the header to find the token and then verify.
  const authHeader = req.header('Authorization');
  if (!(authHeader.startsWith('Bearer'))) return res.status(401).json({message: 'Token error'});
  const token = authHeader && authHeader.split(' ')[1];
  // If you don't upload the token, it will send a notification
  if (!token)
    return res.status(401).json({message: 'Please login to access'});
  try {
    //check token
    const checkToken: any = jwt.verify(token, process.env.JWT_SECRET as string);
    const userId: any = await AuthModel.findOne({_id: checkToken._id});
    if (checkToken._id.toString() === userId._id.toString()) {
      req.user = userId;
      //save token to check
      next();
    } else {
      return res.json({message: 'Error not validating'});
    }
  } catch (err) {
    console.log(err);
    //notification when input token true
    res.status(401).json({message: 'Token illegal'});
  }
}
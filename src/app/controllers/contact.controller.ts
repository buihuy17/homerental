import {createContactReq} from "../services/contact.service";
import {NextFunction, Request, Response} from "express";
import {ContactModel} from "../models/contact.model";
import nodemailer from "nodemailer";
import 'dotenv/config';
import {mailConfig} from '../../config/mail';

//[POST] Create
export async function create(req: Request, res: Response, next: NextFunction) {
  const {fullName, email, phoneNumber, message, contactReq} = req.body;
  const contactReqInfo = await createContactReq(fullName, email, phoneNumber, message, contactReq);

  return res.json({
    create: true,
    data: contactReqInfo,
  });
}

//Read [GET] : allContact and oneContact
export async function getContacts(req: Request, res: Response, next: NextFunction) {
  const contacts = await ContactModel.find();
  res.json({
    data: contacts
  });
}

export async function getContact(req: Request, res: Response, next: NextFunction) {
  const contact = await ContactModel.findOne({_id: req.params.id});
  if (!contact) return res.json({
    message: 'contact not found',
  });
  res.json({
    message: 'get contact successfully',
    data: contact
  });
}

//[DELETE] Force Delete
export async function forceDelete(req: Request, res: Response, next: NextFunction) {
  const contact = await ContactModel.findOneAndDelete({_id: req.params.id});
  res.status(200).json({
    message: 'delete contact request successfully!',
    data: contact,
  });
}

//[POST]
export async function checkContactReq(req: Request, res: Response, next: NextFunction) {
  const contact = await ContactModel.findOne({_id: req.params.id});
  //check contact null
  if (!contact) return res.json({
    message: 'Contact null',
  });
  const userEmail = contact.email;

  // mailConfig.PASSWORD && !mailConfig.USERNAME && !mailConfig.PORT && !mailConfig.HOST  && !mailConfig.FROM_ADDRESS && !mailConfig.HOST && !mailConfig.FROM_NAME)

  const transporter = nodemailer.createTransport({
    secure: true,
    auth: {
      user: mailConfig.USERNAME , /*'kanek4489@gmail.com',*/
      pass: mailConfig.PASSWORD/* 'izgyytqqvejafhyw'*/
    },
    port: mailConfig.PORT, /*465,*/
    host: mailConfig.HOST, /*"smtp.gmail.com"*/
  })
  const mailOptions = {
    from: mailConfig.FROM_ADDRESS, /*'kanek4489@gmail.com',*/
    to: userEmail,
    subject: 'Mail Confirm Home Rental',
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  let checkContactReq = await ContactModel.findOne({_id: req.params.id});
  if (!checkContactReq) return res.json({'message': 'Error check'});
  checkContactReq = await ContactModel.findOneAndUpdate({_id: req.params.id}, {
    contactReq: true,
  });
  res.status(200).json({
    message: 'Check Contact User',
    data: checkContactReq,
  });
}

import {ContactModel} from '../models/contact.model';

export async function createContactReq(fullName: string, email: string, phoneNumber: string, message: string, contactReq: Boolean) {
  const newContactReq= new ContactModel({
    fullName,
    email,
    phoneNumber,
    message,
    contactReq,
  })
  await newContactReq.save();
  return newContactReq;
}
import express from 'express';
import {
  create,
  getContact,
  getContacts,
  checkContactReq,
  forceDelete
} from "../../../app/controllers/contact.controller";
import {checkToken} from '../../../middlewares/token.middleware';
import {checkUser} from "../../../middlewares/user.middleware";
import {checkAdmin} from "../../../middlewares/admin.middleware";
import "express-async-errors";

export const contactRoute = express.Router();

contactRoute.get('/all', checkToken, checkAdmin, getContacts);
contactRoute.post('/check/:id', checkContactReq);
contactRoute.get('/:id', checkToken, checkAdmin, getContact);
contactRoute.post('/create', checkToken, checkUser, create);
contactRoute.delete('/:id/force', checkToken, checkAdmin, forceDelete);

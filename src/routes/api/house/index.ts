import express from 'express';
import {
  getHouses,
  getHouse,
  housesApproved,
  trash,
  getHousesAuthor,
  search,
  update,
  restore,
  create,
  destroy,
  checkApprove,
  forceDelete
} from "../../../app/controllers/house.controller";
import {checkToken} from '../../../middlewares/token.middleware';
import {checkUser} from "../../../middlewares/user.middleware";
import {checkAdmin} from "../../../middlewares/admin.middleware";

export const houseRoute = express.Router();

houseRoute.get('/all', checkToken, checkAdmin, getHouses);
houseRoute.get('/:id/detail', getHouse);
houseRoute.get('/approved', housesApproved);
houseRoute.get('/trash', trash);
// houseRoute.get('/unapproved/:author', checkToken, checkUser, houseController.housesUnapproved);
houseRoute.get('/author/:author', getHousesAuthor);
houseRoute.post('/create', checkToken, checkUser, create);
houseRoute.post('/approve/:id', checkApprove);

houseRoute.put('/update/:id', checkToken, checkUser, update);
// houseRoute.get('/:id/edit', checkToken, checkUser, houseController.edit);
houseRoute.delete('/:id', checkToken, checkUser, destroy);
houseRoute.patch('/:id/trash/restore', checkToken, checkUser, restore);
houseRoute.delete('/:id/force', checkToken, checkUser, forceDelete);

// houseRoute.post('/photos/upload/:id', checkToken, checkAdmin, saveFilesDB, houseController.uploadImage);
houseRoute.post('/search', search);

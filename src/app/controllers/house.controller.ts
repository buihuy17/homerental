import {HouseModel} from "../models/house.model";
import {cloudinary} from "../utils/cloudinary";
import {Request, Response, NextFunction} from "express";

const cloudinaryImageUploadMethod = async (file: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file, (err: any, res: any) => {
      if (err) return reject("upload image error");
      resolve({
        image: res.secure_url,
      });
    });
  });
};

//[POST] Create
export const create = async (req: Request, res: Response, next: NextFunction) => {
  const {
    title,
    images,
    typeRoom,
    address,
    description,
    width,
    priceRoom,
    priceElectric,
    priceWater,
    district,
    province,
    roomStatus,
    author,
  } = req.body;

  try {
    const urls = [];
    for (const image of images) {
      const newPath = await cloudinaryImageUploadMethod(image);
      urls.push(newPath);
    }
    urls.map((item) => {
      console.log(item);
    });

    const house = await HouseModel.create({
      title,
      typeRoom,
      address,
      description,
      width,
      priceRoom,
      priceElectric,
      priceWater,
      district,
      province,
      roomStatus,
      images: urls.map((url: any) => url.image),
      author,
    });

    return res.status(201).json({data: house});
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//[POST]
export async function checkApprove(req: Request, res: Response, next: NextFunction) {
  let checkApprove = await HouseModel.findOne({_id: req.params.id});
  if (!checkApprove) return res.json({'message': 'Error Not Approve'});
  checkApprove = await HouseModel.findOneAndUpdate({_id: req.params.id}, {
    approve: true,
  });
  res.status(200).json({
    message: 'Check Approve House OK',
    data: checkApprove,
  });
}

//[GET] : allHouse approved
export async function housesApproved(req: Request, res: Response, next: NextFunction) {
  const housesApproved = await HouseModel.find({approve: {$ne: false}}).populate({
    path: 'author',
  });
  res.json({
    data: housesApproved
  });
}


//Read [GET] : allHouse and oneHouse
export async function getHouses(req: Request, res: Response, next: NextFunction) {
  const houses = await HouseModel.find({}).populate({
    path: 'author',
  });
  res.json({data: houses});
}

export async function getHouse(req: Request, res: Response, next: NextFunction) {
  const house = await HouseModel.findOne({_id: req.params.id}).populate({
    path: 'author',
  });
  if (!house) return res.json({
    message: 'house not found'
  });
  res.json({
    data: house
  });
}

//[GET] House's author
export async function getHousesAuthor(req: Request, res: Response, next: NextFunction) {
  const house = await HouseModel.find({author: req.params.author});
  if (!house) return res.json({message: "author not found"});
  res.json({
    data: house
  });
}

//update
export async function update(req: Request, res: Response) {

  let houseUpdate: any = await HouseModel.findOne({_id: req.params.id});
  if (!houseUpdate) return res.json({message: 'Error update'});
  houseUpdate = await HouseModel.findOne({_id: req.params.id});
  Object.assign(houseUpdate, req.body);
  await houseUpdate.save();
  res.json({
    message: "update OK!",
    houseUpdate,
  });
}

//[Delete]
export async function destroy(req: Request, res: Response, next: NextFunction) {
  let house = await HouseModel.findOne({_id: req.params.id});
  if (!house) return res.json({
    message: 'Error delete'
  });
  Object.assign(house, {deleted: true});
  house = await house.save();
  res.json({
    message: 'Delete House OK!',
    houseDeleted: house,
  });
}

//[GET] all house deleted
export async function trash(req: Request, res: Response) {
  const houseDeleted = await HouseModel.find({deleted: true});
  res.json({
    message: 'Trash Store!',
    houseDeleted: houseDeleted,
  });
}

//restore
export async function restore(req: Request, res: Response) {
  const houseRestore = await HouseModel.findOneAndUpdate({_id: req.params.id}, {deleted: false}, {new: true});
  res.json({
    message: "Restore House OK!",
    houseRestore: houseRestore,
  });
}

//[DELETE] Force Delete
export async function forceDelete(req: Request, res: Response) {

  const house = await HouseModel.findOneAndDelete({_id: req.params.id});
  res.status(200).json({
    message: "Delete House OK!",
    houseDelete: house,
  });
}

//SEARCH
export async function search(req: Request, res: Response) {
  //Object.assign(houseUpdate, req.body);
  const addressSlug = req.query.addressSlug;
  const titleSlug = req.query.titleSlug;
  const descriptionSlug = req.query.descriptionSlug;
  const priceRoomStart = req.query.priceRoomStart;
  const priceRoomEnd = req.query.priceRoomEnd;

  let houseSearchInfo = await HouseModel.find({
    $or: [
      {addressSlug: {$regex: `${addressSlug}`, $options: 'i'}},
      {titleSlug: {$regex: `${titleSlug}`, $options: 'i'}},
      {descriptionSlug: {$regex: `${descriptionSlug}`, $options: 'i'}},
      {priceRoom: {$lte: priceRoomEnd, $gte: priceRoomStart}},
    ]
  });

  if (houseSearchInfo.length <= 0) return res.json({message: 'Can not find house'});

  return res.json({
    search: 'search successfully',
    data: {
      houseSearchInfo,
    },
  });
}
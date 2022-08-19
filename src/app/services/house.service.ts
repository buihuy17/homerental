import {HouseModel} from "../models/house.model";
import mongoose from "mongoose";

export async function createHouse(title: string, images: string, typeRoom: string, address: string, description: string, width: number, priceRoom: number, priceElectric: number, priceWater: number, roomStatus: string, author: mongoose.Schema.Types.ObjectId) {
  const newHouse = new HouseModel({
    title,
    images,
    typeRoom,
    address,
    description,
    width,
    priceRoom,
    priceElectric,
    priceWater,
    roomStatus,
    author,
  })
  await newHouse.save();
  return newHouse;
}

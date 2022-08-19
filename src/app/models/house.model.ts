import mongoose, { Model} from "mongoose";
import mongooseDelete from 'mongoose-delete';
// @ts-ignore
import slug from 'mongoose-slug-generator';
import slugify from "slugify";
import {Request, Response, NextFunction} from "express";

interface Account extends Document {
  titleSlug: string,
  typeRoom: string,
  district: string,
  province: string,
  address: string,
  addressSlug: string,
  description: string,
  descriptionSlug: string,
  width: number,
  priceRoom: number,
  priceElectric: number,
  priceWater: number,
  roomStatus: string,
  author: mongoose.Schema.Types.ObjectId,
  approve: boolean,
  deleted: boolean,
}

const schema = new mongoose.Schema<Account>({
    title: {
      type: String,
    },
    titleSlug: {
      type: String,
    },
    images: [
      {
        type: String,
      },
    ],
    typeRoom: {
      type: String,
      enum: ['1 Phòng ngủ', '1 Khách + 1 Phòng ngủ', '1 Khách + 2 Phòng ngủ'],
    },
    district: {
      type: String,
    },
    province: {
      type: String,
    },
    address: {
      type: String,
    },
    addressSlug: {
      type: String,
    },
    description: {
      type: String,
    },
    descriptionSlug: {
      type: String,
    },
    width: {
      type: Number,
    },
    priceRoom: {
      type: Number,
    },
    priceElectric: {
      type: Number,
    },
    priceWater: {
      type: Number,
    },
    roomStatus: {
      type: String,
      enum: ["Còn phòng", "Hết phòng"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    approve: {
      type: Boolean,
      default: false,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    //config to createdAt, updatedAt
    timestamps: true,
  });

//add to library
mongoose.plugin(slug);
//add to Schema
schema.plugin<any>(mongooseDelete, {
  deleted: true,
  overrideMethods: ["countDocuments", "findOne"],
});

schema.pre('save', function (next): void {
  const doc = this;

  if (doc.isModified("title"))
    doc.titleSlug = slugify(doc.title, { lower: true });
  if (doc.isModified("address"))
    doc.addressSlug = slugify(doc.address, { lower: true });
  if (doc.isModified("description"))
    doc.descriptionSlug = slugify(doc.description, { lower: true });
  next();
});

export const HouseModel = mongoose.model('house', schema);


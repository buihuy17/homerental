import {BlogModel} from "../models/blog.model";
import {cloudinary} from "../utils/cloudinary";
import {Request, Response, NextFunction} from "express";

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const {title, image, author, descriptionHTML, descriptionText} = req.body;

  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: 'imageBlogs',
    });
    console.log({result});

    const blog = await BlogModel.create({
      title,
      author,
      descriptionHTML,
      descriptionText,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });
    return res.json({
      success: true,
      data: blog
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getAllBlog = async (req: Request, res: Response, next: NextFunction) => {
  const blog = await BlogModel.find({}).populate({
    path: 'author',
  });
  return res.json({success: true, data: [...blog]});
};

export const getBlog = async (req: Request, res: Response, next: NextFunction) => {
  const {id} = req.params;
  const blog = await BlogModel.findOne({_id: id}).populate({
    path: 'author',
  });
  if (!blog)
    return res.status(400).json({
      success: false,
      message: 'No data',
    });
  return res.json({
    success: true,
    data: blog
  });
};

export const editBlog = async (req: Request, res: Response, next: NextFunction) => {
  const {id} = req.params;
  const {title, image, descriptionHTML, descriptionText} = req.body;

  const blog = await BlogModel.where({_id: id}).update({
    title,
    image,
    descriptionHTML,
    descriptionText,
  });
  return res.json({
    success: true,
    message: 'Update successfully'
  });
};

export const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
  const {id} = req.params;
  await BlogModel.deleteOne({_id: id});
  return res.json({
    success: true,
    message: 'Delete successfully'
  });
};


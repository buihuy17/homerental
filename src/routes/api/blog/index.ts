import express from "express";

export const blogRoute = express.Router();
import {getAllBlog, getBlog, create, editBlog, deleteBlog} from '../../../app/controllers/blog.controller'

blogRoute.get("/all", getAllBlog);
blogRoute.get("/:id", getBlog);
blogRoute.post("/create", create);
blogRoute.put("/edit/:id", editBlog);
blogRoute.delete("/:id", deleteBlog);


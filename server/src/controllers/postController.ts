import { NextFunction, Request, Response } from "express";

import Post from "../models/postModel";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import Cloudinary from "../utils/cloudinary";
import { convertBase64 } from "../utils";

const getAllPosts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const posts = await Post.find();

    res.status(200).json({
      status: "success",
      data: posts,
    });
  }
);

const getPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return next(new AppError("Can't find post with that ID.", 404));
    }

    res.status(200).json({
      status: "success",
      data: post,
    });
  }
);

const createPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      return next(new AppError("Post content is required.", 400));
    }

    const image = convertBase64(req.file.buffer, req.file.mimetype);

    const uploadResponse = await Cloudinary.uploader.upload(image, {
      upload_preset: "intelliger",
      folder: "intelliger/posts",
    });

    const post = await Post.create({
      content: {
        public_id: uploadResponse.public_id,
        url: uploadResponse.secure_url,
      },
      ...req.body,
    });

    res.status(200).json({
      status: "success",
      data: post,
    });
  }
);

const updatePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        caption: req.body.caption,
      },
      { new: true, runValidators: true }
    );

    if (!post) {
      return next(new AppError("Can't find post with that ID.", 404));
    }

    res.status(200).json({
      status: "success",
      data: post,
    });
  }
);

const deletePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return next(new AppError("Can't find post with that ID.", 404));
    }

    res.status(204).json({
      status: "success",
      data: post,
    });
  }
);

export default {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};

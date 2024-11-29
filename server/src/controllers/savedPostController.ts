import { NextFunction, Request, Response } from "express";

import SavedPost from "../models/savedPostModel";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";

const getAllSavedPosts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const savedPosts = SavedPost.find();

    res.status(200).json({
      status: "success",
    });
  }
);

const getSavedPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const savedPost = SavedPost.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: savedPost,
    });
  }
);

const createSavedPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const savedPost = await SavedPost.create(req.body);

    res.status(200).json({
      status: "success",
      data: savedPost,
    });
  }
);

const deleteSavedPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const savedPost = await SavedPost.findByIdAndDelete(req.params.id);

    if (!savedPost) {
      return next(new AppError("Can't find savedPost with that ID.", 404));
    }

    res.status(204).json({
      status: "success",
      data: savedPost,
    });
  }
);

export default {
  getAllSavedPosts,
  getSavedPost,
  createSavedPost,
  deleteSavedPost,
};

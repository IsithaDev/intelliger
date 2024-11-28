import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import User from "../models/userModel";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";

const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      dateOfBirth: req.body.dateOfBirth,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    res.status(201).json({
      status: "success",
      message: "User registered successfully!",
    });
  }
);

const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { emailOrUsername, password } = req.body;

    if (!emailOrUsername || !password) {
      return next(new AppError("Please provide your login credentials.", 400));
    }

    const user = await User.findOne({
      $or: [{ username: emailOrUsername }, { email: emailOrUsername }],
    }).select("+password");

    if (!user) {
      return next(new AppError("Invalid username or email address.", 400));
    }

    if (!(await user.correctPassword(password, user.password))) {
      return next(new AppError("Incorrect password.", 400));
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_TOKEN_SECRET, {
      expiresIn: process.env.JWT_TOKEN_EXPIRES,
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge:
        parseInt(process.env.JWT_COOKIE_EXPIRES, 10) * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      status: "success",
      message: "You are logged in successfully.",
    });
  }
);

const logout = (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie("jwt");

  res.status(200).json({
    status: "success",
    message: "User logged out successfully.",
  });
};

const forgotPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);

const resetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);

const updatePassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export default {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  updatePassword,
};

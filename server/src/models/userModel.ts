import { Document, model, Model, Schema } from "mongoose";

interface IUser extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  gender: "male" | "female";
  dateOfBirth: Date;
  username: string;
  role: "admin" | "user";
  email: string;
  password: string;
  passwordConfirm: string;
  isActive: boolean;
}

interface IUserMethods {}

interface IUserModel extends Model<IUser, {}, IUserMethods> {}

const userSchema = new Schema<IUser, IUserMethods, IUserModel>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    username: {
      type: String,
      unique: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator(value) {
          return value;
        },
        message: "Valid email is required",
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator(value) {
          return value;
        },
        message: "",
      },
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: true,
      validate: {
        validator(value) {
          return value;
        },
        message: "",
      },
      select: false,
    },
    isActive: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const User = model<IUser, IUserModel>("User", userSchema);

export default User;

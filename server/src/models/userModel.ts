import { Document, model, Model, Schema } from "mongoose";
import validator from "validator";

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
      maxlength: 12,
    },
    lastName: {
      type: String,
      required: true,
      maxlength: 12,
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
      validate: [validator.isEmail, "Valid email is required"],
    },
    password: {
      type: String,
      required: true,
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
      ],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: true,
      validate: {
        validator(value) {
          return value === this.password;
        },
        message: "Passwords do not match.",
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

import { Document, model, Model, Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

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

interface IUserMethods {
  correctPassword: (
    candidatePassword: string,
    userPassword: string
  ) => Promise<boolean>;
}

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
      unique: true,
      lowercase: true,
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

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.pre<IUserModel>(/^find/, function (next) {
  this.find({ isActive: { $ne: false } });

  next();
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;

  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isNew) {
    return next();
  }

  const baseUsername = `${this.firstName.toLowerCase()}.${this.lastName.toLowerCase()}`;

  let username = baseUsername;
  let count = 0;

  while (await this.collection.findOne({ username })) {
    ++count;
    username = `${baseUsername}.${count}`;
  }

  this.username = username;

  next();
});

userSchema.method(
  "correctPassword",
  async function correctPassword(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
  }
);

const User = model<IUser, IUserModel>("User", userSchema);

export default User;

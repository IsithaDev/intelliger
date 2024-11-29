import { Document, model, Model, ObjectId, Schema } from "mongoose";

interface IPost extends Document {
  _id: string;
  user: ObjectId;
  caption: string;
  content: {
    public_id: string;
    url: string;
  };
  isActive: boolean;
}

interface IPostMethods {}

interface IPostModel extends Model<IPost, {}, IPostMethods> {}

const postSchema = new Schema<IPost, IPostMethods, IPostModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    caption: {
      type: String,
      maxlength: 250,
    },
    content: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
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

postSchema.pre<IPostModel>(/^find/, function (next) {
  this.find({ isActive: { $ne: false } });

  next();
});

postSchema.pre<IPostModel>(/^find/, function (next) {
  this.find().populate({
    path: "user",
    select: "firstName lastName fullName",
  });
});

const Post = model<IPost, IPostModel>("Post", postSchema);

export default Post;

import { Document, model, Model, ObjectId, Schema } from "mongoose";

interface ISavedPost extends Document {
  _id: string;
  user: ObjectId;
  post: ObjectId;
  isActive: boolean;
}

interface ISavedPostMethods {}

interface ISavedPostModel extends Model<ISavedPost, {}, ISavedPostMethods> {}

const savedPostSchema = new Schema<
  ISavedPost,
  ISavedPostMethods,
  ISavedPostModel
>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

savedPostSchema.pre<ISavedPostModel>(/^find/, function (next) {
  this.find({ isActive: { $ne: false } });

  next();
});

const SavedPost = model<ISavedPost, ISavedPostModel>(
  "SavedPost",
  savedPostSchema
);

export default SavedPost;

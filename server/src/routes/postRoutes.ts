import { Router } from "express";

import postController from "../controllers/postController";
import upload from "../utils/multer";

const router = Router();

router
  .route("/")
  .get(postController.getAllPosts)
  .post(upload.single("content"), postController.createPost);

router
  .route("/:id")
  .get(postController.getPost)
  .patch(postController.updatePost)
  .delete(postController.deletePost);

export default router;

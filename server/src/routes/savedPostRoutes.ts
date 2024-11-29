import { Router } from "express";
import savedPostController from "../controllers/savedPostController";

const router = Router();

router
  .route("/")
  .get(savedPostController.getAllSavedPosts)
  .post(savedPostController.createSavedPost);

router
  .route("/:id")
  .get(savedPostController.getSavedPost)
  .delete(savedPostController.deleteSavedPost);

export default router;

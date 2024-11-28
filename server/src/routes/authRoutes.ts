import { Router } from "express";

import authController from "../controllers/authController";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.post("/forgot-password", authController.forgotPassword);
router.patch("/reset-password", authController.resetPassword);

router.patch("/update-password", authController.updatePassword);

export default router;

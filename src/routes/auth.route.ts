import express from "express";

import authController from "../controllers/auth.controller";
import authMiddleware from "../middleware/auth.middleware.ts";

const router = express.Router();

router.post("/login", authController.login);
router.get("/hey", authController.hey);
router.post("/logout", authMiddleware, authController.logout);

router.post("/register", authController.register);
router.post("/set-user-name", authController.setUserName);

router.post("/regenerate-token", authController.regenerateToken);

router.post("/update-personal", authMiddleware, authController.updatePersonal);
router.post("/update-fan", authMiddleware, authController.updateFan);
router.post("/change-password", authMiddleware, authController.changePassword);

export default router;

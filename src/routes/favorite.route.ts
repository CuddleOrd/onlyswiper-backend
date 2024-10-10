import express from "express";

import favoriteController from "../controllers/favorite.controller";
import authMiddleware from "../middleware/auth.middleware.ts";

const router = express.Router();

router.get("/get", authMiddleware, favoriteController.get);
router.post("/like", authMiddleware, favoriteController.like);
router.post("/dislike", authMiddleware, favoriteController.dislike);
router.post("/dislike", authMiddleware, favoriteController.dislike);
router.post("/save-swipe", authMiddleware, favoriteController.saveSwipe);
router.post("/fetch-user-swipes", authMiddleware, favoriteController.fetchSwipesById);

export default router;

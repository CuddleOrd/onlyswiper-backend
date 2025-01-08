import express from "express";

import creatorController from "../controllers/creator.controller";
import authMiddleware from "../middleware/auth.middleware.ts";

const router = express.Router();

router.post("/search", creatorController.search);
router.post("/fetch-user",authMiddleware, creatorController.fetchUser);

router.post(
  "/batch-create-by-scrapping",
  creatorController.batchCreateByScrapping
);

export default router;

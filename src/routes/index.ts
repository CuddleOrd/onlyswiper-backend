import express, { NextFunction, Request, Response } from "express";

import authRoutes from "./auth.route";
import creatorRoutes from "./creator.route";
import favoriteRoutes from "./favorite.route";

import { SITE_TITLE } from "../utils/const.util";

import moment from 'moment';
const router = express.Router();

router.get("/", (_req: Request, res: Response, _next: NextFunction) => {
//       const now = moment(); // Moment object for the current date

//   const boostedFrom = now;

// const boostedTo = now.clone().add(7, 'days');

// console.log(boostedFrom)
// console.log(boostedTo)

    
  res.send(`😀 Welcome to the ${SITE_TITLE} API server!`);
});

router.use("/api/auth", authRoutes);
router.use("/api/creator", creatorRoutes);
router.use("/api/favorite", favoriteRoutes);

export default router;

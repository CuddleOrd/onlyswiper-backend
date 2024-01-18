const express = require("express");

const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const creatorsRoutes = require("./creators.routes");
const favoriteRoutes = require("./favorite.routes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/creator", creatorsRoutes);
router.use("/favorite", favoriteRoutes);

module.exports = router;

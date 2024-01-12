const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const creatorsRoutes = require("./creators.routes");

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/creator", creatorsRoutes);

module.exports = router;

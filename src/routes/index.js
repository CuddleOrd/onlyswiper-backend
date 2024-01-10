const express = require("express");
const router = express.Router();

const userRoutes = require("./user.routes");
const creatorsRoutes = require("./creators.routes");

router.use("/users", userRoutes);
router.use("/creators", creatorsRoutes);
module.exports = router;

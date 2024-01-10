const express = require("express");

const creatorsControllers = require("../controllers/creators");
const likesControllers = require("../controllers/likes");

const router = express.Router();

router.post("/filter", creatorsControllers.filter);
router.post("/likes", likesControllers.likes);

module.exports = router;

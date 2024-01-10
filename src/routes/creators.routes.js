const express = require("express");

const creatorsControllers = require("../controllers/creators");
const favoriteControllers = require("../controllers/favorite");
const { requireAuthentication } = require("../middlewares/authCheck");
const router = express.Router();

router.post("/filter", creatorsControllers.filter);
router.post("/likes", requireAuthentication, favoriteControllers.favorite);

module.exports = router;

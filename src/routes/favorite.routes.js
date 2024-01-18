const express = require("express");

const favoriteController = require("../controllers/favorite.controller");
const { requireAuthentication } = require("../middlewares/authCheck");
const router = express.Router();

router.get("/get", requireAuthentication, favoriteController.get);
router.post("/like", requireAuthentication, favoriteController.like);
router.post("/dislike", requireAuthentication, favoriteController.dislike);

module.exports = router;

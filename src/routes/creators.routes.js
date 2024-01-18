const express = require("express");

const creatorController = require("../controllers/creator.controller");
const { requireAuthentication } = require("../middlewares/authCheck");
const router = express.Router();

router.post("/search", requireAuthentication, creatorController.search);

module.exports = router;

const express = require("express");

const creatorController = require("../controllers/creator.controller");
const { requireAuthentication } = require("../middlewares/authCheck");
const router = express.Router();

router.post("/search", creatorController.search);

module.exports = router;

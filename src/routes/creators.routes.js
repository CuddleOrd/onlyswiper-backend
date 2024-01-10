const express = require("express");

const creatorsControllers = require("../controllers/creators");

const router = express.Router();

router.post("/filter", creatorsControllers.filter);

module.exports = router;

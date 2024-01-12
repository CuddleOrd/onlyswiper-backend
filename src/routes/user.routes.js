const express = require("express");

const validators = require("../validators");
const userController = require("../controllers/user.controller");
const { requireAuthentication } = require("../middlewares/authCheck");

const router = express.Router();

// Test route
router.get("/", function (req, res) {
  res.send("Hello /api/users routing works 🥂!!");
});

/**
 * @method - GET
 * @param {string} path - /api/users/:id
 * @description - Get user by ID
 */
router.get(
  "/:id",
  requireAuthentication,
  validators.fetchUserProfileValidator,
  userController.fetchUserProfile
);

module.exports = router;

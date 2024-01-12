const express = require("express");

const validators = require("../validators");
const authController = require("../controllers/auth.controller");
const { requireAuthentication } = require("../middlewares/authCheck");

const router = express.Router();

// Test route
router.get("/", function (req, res) {
  res.send("Hello /api/auth routing works 🥂!!");
});

/**
 * @method - POST
 * @param {string} path - /api/auth/login
 * @description - User Login
 */
router.post("/login", validators.loginValidator, authController.login);

/**
 * @method - POST
 * @param {string} path - /api/users/signup
 * @description - User Signup
 */
router.post("/signup", validators.signupValidator, authController.signup);

/**
 * @method - POST
 * @param {string} path - /api/users/logout
 * @description - User Logout
 */
router.post("/logout", requireAuthentication, authController.logout);

/**
 * @method - POST
 * @param {string} path - /api/users/master-logout
 * @description - User Logout from all devices
 */
router.post("/master-logout", requireAuthentication, authController.logoutAllDevices);

/**
 * @method - POST
 * @param {string} path - /api/users/reauth
 * @description - Refresh Access Token
 */
router.post("/reauth", authController.refreshAccessToken);

/**
 * @method - POST
 * @param {string} path - /api/users/forgotpwd
 * @description - Send password reset email link
 */
router.post("/forgotpwd", validators.forgotPasswordValidator, authController.forgotPassword);

/**
 * @method - POST
 * @param {string} path - /api/users/resetpwd
 * @description - Reset password
 */
router.patch(
  "/resetpwd/:resetToken",
  validators.resetPasswordValidator,
  authController.resetPassword
);

/**
 * @method - GET
 * @param {string} path - /api/users/me
 * @description - Get authenticated user
 */
router.get("/me", requireAuthentication, authController.fetchAuthUserProfile);

module.exports = router;

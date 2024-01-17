require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const { AppErrorHandler, LostErrorHandler } = require("./config/exceptionHandlers/handler.js");
const routes = require("./routes");
const dbConnection = require("./dbConn/mongoose");
const corsOptions = require("./config/cors.js");
const CustomError = require("./config/errors/CustomError.js");

/**
 * Initialize express application
 */
const app = express();
const PORT = process.env.PORT || 8000;

/**
 * Application middleware and customizations
 */
app.disable("x-powered-by"); // Disable X-Powered-By header in responses
app.use(express.json()); // Parse requests with Content-Type application/json
app.use(cookieParser()); // Parse requests with Cookie header
app.use(cors(corsOptions)); // Enable Cross Origin Resource Sharing
app.options("*", cors(corsOptions));

/**
 * Application routes
 */
// Test route
app.get("/", function (req, res) {
  res.send("Hello Welcome to Onlyfansfinder.ai backend API Server🙃 !!");
});

// Test Crash route
app.get("/boom", function (req, res, next) {
  try {
    throw new CustomError("Oops! matters are chaotic💥", 400);
  } catch (error) {
    next(error);
  }
});

// App modular routes
app.use("/api", routes);

/**
 * Application error handling
 */
// Handle unregistered route for all HTTP Methods
app.all("*", function (req, res, next) {
  // Forward to next closest middleware
  next();
});
app.use(LostErrorHandler); // 404 error handler middleware
app.use(AppErrorHandler); // General app error handler

/**
 * Application boot up
 */
app.on("ready", () => {
  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
  });
});

dbConnection.then(() => {
  console.log("---Database is connected !!---");
  app.emit("ready");
});

/**
 * Seed creators
 */
require("./seedCreators.js");

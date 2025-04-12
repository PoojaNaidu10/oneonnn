"use strict";

// Module dependencies.
const express = require("express"),
  path = require("path"),
  fs = require("fs"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  errorhandler = require("errorhandler"),
  uuid = require("uuid"),
  AWS = require("aws-sdk"),
  config = require("./config/config"),
  cookieParser = require("cookie-parser"),
  session = require("express-session");

const app = express();
const pdfDir = path.join(__dirname, "public", "pdfs");

app.locals.siteName = "Naturefit";

app.use(cors());
app.disable("etag");
app.use(cookieParser());

// Session configuration
app.use(
  session({
    secret: "secret-key", // Fixed typo in "secret-key"
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure only in production
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    },
  })
);

// Test route for cookies
app.get("/", (req, res) => {
  res.send(req.cookies);
});

// Session counter route
app.get("/", function (req, res) {
  if (!req.session.viewCount) {
    req.session.viewCount = 1;
  } else {
    req.session.viewCount += 1;
  }
  return res.send({ viewCount: req.session.viewCount });
});

// Connect to database
require("./config/db");
const apiResponse = require("./utils/apiResponse");

// Serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "product_gallery")));

// Bootstrap models
const modelsPath = path.join(__dirname, "models");
fs.readdirSync(modelsPath).forEach((file) => {
  require(modelsPath + "/" + file);
});

const env = process.env.NODE_ENV || "development";

// Logger & Error Handler
if (env === "development") {
  app.use(morgan("dev"));
  app.use(
    errorhandler({
      dumpExceptions: true,
      showStack: true,
    })
  );
} else if (env === "production") {
  app.use(morgan("combined")); // Fixed missing logging format
  app.use(
    errorhandler({
      dumpExceptions: false,
      showStack: false,
    })
  );
}

// Ensure required directories exist
const requiredDirs = ["./uploads", "./documents"];
requiredDirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
});

// View Engine Setup
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

// Middleware for parsing requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Error handling for invalid JSON payloads
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Invalid JSON" });
  }
  next();
});

// Bootstrap routes
const routesPath = path.join(__dirname, "routes");
fs.readdirSync(routesPath).forEach((file) => {
  const route = require(routesPath + "/" + file);
  if (typeof route !== "function") {
    console.error(`Error: ${file} does not export a valid Express router.`);
  } else {
    app.use("/", route);
  }
});

// Bootstrap API routes
const apiPath = path.join(__dirname, "api");
fs.readdirSync(apiPath).forEach((file) => {
  const apiRoute = require(apiPath + "/" + file);
  if (typeof apiRoute !== "function") {
    console.error(`Error: ${file} in API does not export a valid Express router.`);
  } else {
    app.use("/api", apiRoute);
  }
});

// Serve PDFs
app.use("/pdfs", express.static(pdfDir));

// Trust proxy for IP tracking
app.set("trust proxy", true);

// Set server timezone
process.env.TZ = "Asia/Calcutta";
console.log("Current Server Time:", new Date().toString());

// Start the server
const port = process.env.PORT || 3000;
const host = process.env.HOST || "0.0.0.0";
app.listen(port, host, () => {
  console.log(`Express server listening on ${host}:${port} in ${app.get("env")} mode`);
});

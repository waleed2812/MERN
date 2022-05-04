/* ----------------------------- Loading Logger ----------------------------- */
const winston = require("./config/winston");
winston.info("Winston (Logger) Configuration Loaded.");
winston.info("Loading Environment Variables.");

/* ---------------------- Loading Environment Variables --------------------- */
const glob = require("glob");
const dotenv = require("dotenv");
const path = require("path");
winston.info(".env* files are loading...");
glob.sync(".env*").forEach(function (file) {
  const filePath = path.join(__dirname, file);
  dotenv.config({ path: filePath });
  winston.debug(filePath + " is loaded");
});
/* -------------------------- Global Configuration -------------------------- */
global.config = {};
global.config.NODE_ENV = process.env.NODE_ENV || "development";
winston.info(`Running on environment: ${global.config.NODE_ENV}`);
winston.info(`Loading Config File: ./config/env/${global.config.NODE_ENV}`);
const config = require(`./config/env/${global.config.NODE_ENV}`);
global.config = { ...global.config, ...config };
winston.info(`Configuration Loaded.`);
/* ---------------------------- Global Constants ---------------------------- */
global.constants = require("./config/constants");
winston.info(`Loaded Constants`);
/* ----------------------------- Connect MongoDB ---------------------------- */
winston.info(`Connecting MongoDB`);
require("./config/mongo")(async function (err) {
  if (err) {
    winston.error(
      "Error in Establishing MongoDB Connection or Loading Mongoose Models/Schemas"
    );
    winston.error(err);
    return;
  }
  winston.info("Mongo Connection Established and Loaded All Models");
  /* -------------------- Morgan Logger For IP Information -------------------- */
  const logger = require("morgan");
  logger.token("clientIP", function (req, res) {
    return req.headers["x-forwarded-for"] || "" || req.socket.remoteAddress;
  });
  /* ---------------------------- Setting up Server --------------------------- */
  const express = require("express");
  const http = require("http");
  const app = express();
  app.use(
    logger(
      ":date[iso] :clientIP user=:remote-user :method :url HTTP/:http-version status=:status - response-time=:response-time ms"
    )
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  global.server = http.createServer(app);
  global.server.listen(global.config.PORT);
  app.use(express.static("public"));
  const listeners = require("./config/listeners");
  global.server.on("error", listeners.onError);
  global.server.on("listening", listeners.onListening);
  /* ---------------------------------- CORS ---------------------------------- */
  const cors = require("cors");
  app.use(
    cors({
      origin: [global.constants.baseURL, global.constants.baseURLFrontEnd],
      credentials: true,
    })
  );
  /* ----------------------------------- CSP ---------------------------------- */
  const helmet = require("helmet");
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
          imgSrc: [
            "'self'",
            "data:",
            "blob:",
            "filesystem:",
            "'unsafe-inline'",
            "'unsafe-eval'",
          ],
        },
      },
    })
  );
  /* -------------------------------- Sessions -------------------------------- */
  const session = require('express-session');
  const mongoStore = require("connect-mongo");
  app.use(
    session({
      secret: global.config.session.secret,
      store: mongoStore.create({
        mongoUrl: config.mongodb.host,
        touchAfter: 60 * 60 * 24, // time period in seconds,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        collectionName: "tbl_sessions",
      }),
      resave: true,
      saveUninitialized: true,
      clearExpired: true,
      checkExpirationInterval: 900000,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // time period in milliseconds,
        sameSite: 'strict'
      },
    })
  );

  /* ------------------------------- Passport --------------------------------- */
  const passport = require("./config/passport");
  app.use(passport.initialize());
  app.use(passport.session());
  /* ------------------------------- Web Routes ------------------------------- */
  const routesRegEx = "app/*/*.routes.js";
  winston.info("Web Routes are loading...");
  glob.sync(routesRegEx).forEach(function (file) {
    require("./" + file)(app, "/api");
    winston.debug(file, "is loaded");
  });
  /* --------------------------------- Errors --------------------------------- */
  app.use(function (err, req, res, next) {
    winston.error(err);
    if (err) {
      let errorCode = err.msgCode;
      res.status(err.status || 500);
      return res.json({
        success: false,
        message: err.message
          ? err.message
          : err.msg
          ? err.msg
          : global.errors[errorCode],
        data: err.data ? err.data : {},
      });
    } else {
      res.status(err.status || 500);
      return res.json({
        success: false,
        message: "Something went wrong on server Side",
        data: {},
      });
    }
  });
  /* ----------------- Catch 404 and forward to error handler ----------------- */
  app.all("*", function (req, res, next) {
    err = new Error("404 Not Found");
    res.status(err.status || 404);
    winston.error(err);
    return res.json({
      success: false,
      message: err.message ? err.message : err,
      data: {},
    });
  })
});

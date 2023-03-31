/* ----------------------------- Loading Logger ----------------------------- */
const winston = require("./config/winston");
winston.info("winston (logger) configuration loaded.");
/* ---------------------- Loading Environment Variables --------------------- */
winston.info("loading environment variables.");
const glob = require("glob");
const dotenv = require("dotenv");
const path = require("path");
winston.info(".env* files are loading...");
glob.sync(".env*").forEach(function (file) {
  const filePath = path.join(__dirname, file);
  dotenv.config({ path: filePath });
  winston.debug(file + " is loaded");
});
/* -------------------------- Global Configuration -------------------------- */
global.config = {};
global.config.NODE_ENV = process.env.NODE_ENV || "development";
winston.info(`running on environment: ${global.config.NODE_ENV}`);
winston.info(`loading config file: ./config/env/${global.config.NODE_ENV}.js`);
const config = require(`./config/env/${global.config.NODE_ENV}`);
global.config = { ...global.config, ...config };
winston.info(`configuration loaded.`);
// console.log(global.config)
/* ----------------------------- Connect MongoDB ---------------------------- */
winston.info(`connecting mongodb`);
require("./config/mongo")()
  .then(function () {
    /* -------------------- Morgan Logger For IP Information -------------------- */
    const logger = require("morgan");
    logger.token("clientIP", function (req, res) {
      return req.headers["x-forwarded-for"] || "" || req.socket.remoteAddress;
    });
    logger.token("remote-user", function (req, res) {
      if (req.user) {
        if (req.user._id) {
          return "id: " + req.user._id + "&name:" + req.user.name;
        }
      } else {
        return "Guest";
      }
    });
    /* ---------------------------- Setting up Server --------------------------- */
    const express = require("express");
    const http = require("http");
    const app = express();
    app.use(
      logger(
        ":date[iso] :clientIP user=:remote-user :method :url HTTP/:http-version status=:status - response-time=:response-time ms",
        { stream: { write: (str) => winston.http(str) } }
      )
    );
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static("public"));
    global.server = http.createServer(app);
    global.server.listen(global.config.PORT);
    const listeners = require("./config/listeners");
    global.server.on("error", listeners.onError);
    global.server.on("listening", listeners.onListening);
    /* ---------------------------------- CORS ---------------------------------- */
    const cors = require("cors");
    app.use(cors());
    /* ----------------------------------- CSP ---------------------------------- */
    const client = "client";
    const helmet = require("helmet");
    // const CSP = require(`./${client}/csp.js`)[global.config.NODE_ENV];
    // app.use(
    //   helmet({
    //     contentSecurityPolicy: {
    //       directives: {
    //         defaultSrc: CSP["default-src"],
    //         imgSrc: CSP["img-src"],
    //         mediaSrc: CSP["media-src"],
    //       },
    //     },
    //   })
    // );
    app.use(helmet());
    /* -------------------------------- Sessions -------------------------------- */
    const session = require("express-session");
    const mongoStore = require("connect-mongo");
    app.use(
      session({
        secret: global.config.session.secret,
        store: mongoStore.create({
          mongoUrl: config.mongodb.connString,
          touchAfter: 60 * 60 * 24, // time period in seconds,
          mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
          collectionName: "Sessions",
        }),
        resave: true,
        saveUninitialized: true,
        clearExpired: true,
        checkExpirationInterval: 900000,
        cookie: {
          maxAge: 1000 * 60 * 60 * 24, // time period in milliseconds,
          sameSite: "strict",
        },
      })
    );
    /* ------------------------------- Passport --------------------------------- */
    const passport = require("./config/passport");
    app.use(passport.initialize());
    app.use(passport.session());
    /* ------------------------------- Web Routes ------------------------------- */
    const routesRegEx = "app/*/*routes.js";
    winston.info("web routes are loading...");
    glob.sync(routesRegEx).forEach(function (file) {
      require("./" + file)(app, "/api/v1");
      winston.debug(file, "is loaded");
    });
    /* --------------------------------- Errors --------------------------------- */
    const errorsRegEx = "app/*/*errors.js";
    let errors = require("./config/errors");
    winston.info("web errors are loading...");
    glob.sync(errorsRegEx).forEach(function (file) {
      const err = require("./" + file);
      errors = [...errors, ...err];
      winston.debug(file, "is loaded");
    });
    app.use(function (err, req, res, next) {
      err = err ? err : errors[0];
      winston.error(JSON.stringify(err));
      if (err.msgCode) {
        const error = errors.find((item) => item?.msgCode === err.msgCode);
        // console.log(error);
        err = { ...error, ...err };
      }
      return res.status(err.status || 500).json({
        msgCode: err.msgCode || err.code || errors[0].msgCode,
        success: !!err.success,
        message: err.message || errors[0].message,
        data: err.data,
      });
    });
    /* -------------------------------- React App ------------------------------- */
    if (global.config.NODE_ENV === "production") {
      app.use(express.static(path.join(__dirname, `${client}/build`)));
      app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, `${client}/build`, "index.html"));
      });
    }
    /* ----------------- Catch 404 and forward to error handler ----------------- */
    app.all("*", function (req, res, next) {
      const error = errors.find((item) => item.msgCode === "NOTFOUND");
      winston.error(error);
      return res.status(error.status).json({
        msgCode: error.msgCode,
        success: !!error.success,
        message: error.message,
        data: {},
      });
    });
  })
  .catch(winston.error);

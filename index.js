/* ----------------------------- Loading Logger ----------------------------- */
const winston = require('./config/winston');
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
  winston.info(filePath + " is loaded");
});
/* -------------------------- Global Configuration -------------------------- */
global.config = {};
global.config.NODE_ENV = process.env.NODE_ENV || "development";
winston.info(`Running on environment: ${global.config.NODE_ENV}`);
winston.info(`Loading Config File: ./config/env/${global.config.NODE_ENV}`);
const config = require(`./config/env/${global.config.NODE_ENV}`);
global.config = {...global.config, ...config};
winston.info(`Configuration Loaded.`);
/* ---------------------------- Global Constants ---------------------------- */
global.constants = require('./config/constants');
winston.info(`Loaded Constants`);
/* ----------------------------- Connect MongoDB ---------------------------- */
winston.info(`Connecting MongoDB`);
require('./config/mongo')(async function(err) {
  if(err) {
    winston.error("Error in Establishing MongoDB Connection or Loading Mongoose Models/Schemas");
    winston.error(err);
    return;
  }
  winston.info("Mongo Connection Established and Loaded All Models");


});
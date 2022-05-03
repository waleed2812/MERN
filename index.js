const winston = require('./config/winston');
winston.info("Winston (Logger) Configuration Loaded.");
winston.info("Loading Environment Variables.");

const glob = require("glob");
const dotenv = require("dotenv");
const path = require("path");

winston.info(".env* files are loading...");
glob.sync(".env*").forEach(function (file) {
  const filePath = path.join(__dirname, file);
  dotenv.config({ path: filePath });
  winston.info(filePath + " is loaded");
});
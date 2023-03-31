const winston = require("./winston");
const path = require("path");
const glob = require("glob");
const mongoose = require("mongoose");

module.exports = async function () {
  const { connString } = global.config.mongodb;
  const db = await mongoose.connect(connString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  winston.info("loading models.");
  const modelRegEx = "app/**/*model.js";
  glob.sync(modelRegEx).forEach(function (file) {
    const filePath = path.join(__dirname, "../", file);
    require(filePath);
    winston.debug(file + " is loaded");
  });
  return db;
};

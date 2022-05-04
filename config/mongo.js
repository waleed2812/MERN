module.exports = async function (cb) {
  // Callback takes one parameter "err". If set to null then no error.
  try {
    const winston = require("./winston");
    const path = require("path");
    const glob = require("glob");
    const mongoose = require("mongoose");
    // const autoIncrement = require("mongoose-auto-increment");

    if (!mongoose.connection.readyState) {
      mongoose
        .connect(global.config.mongodb.host, {
          useUnifiedTopology: true,
          useNewUrlParser: true,
        })
        .catch((err) => cb(err));

      // when successfully connected
      mongoose.connection.on("connected", function () {
        winston.info("mongoose connection open to host loading all models/schemas");
        // Enabling mongoose debug mode if required
        mongoose.set("debug", global.config.mongodb.enableMongoDebugging);
        // load all models
        const modelRegEx = "app/**/*.model.js";
        glob.sync(modelRegEx).forEach(function (file) {
          const filePath = path.join(__dirname, "../", file);
          require(filePath);
          winston.debug(filePath + " is loaded");
        });
        return cb(null);
      });
      // if the connection throws an error
      mongoose.connection.on("error", function (err) {
        return cb(err);
      });

      // when the connection is disconnected
      mongoose.connection.on("disconnected", function () {
        return cb(new Error("mongoose connection disconnected"));
      });
    } else {
      winston.info("Mongoose Connected Already.");
      cb(null);
    }
  } catch (err) {
    cb(err);
  }
};

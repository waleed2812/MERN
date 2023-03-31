const winston = require("winston");

const defaultFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.printf(function ({ timestamp, level, label, message, stack }) {
    const namespace = label ? `(${label})` : "";
    const errStack = stack ? `\n${stack}` : "";
    return `[${timestamp}] ${level}:${namespace} ${message} ${errStack}`;
  })
);
const options = (winston.LoggerOptions = {
  format: defaultFormat,
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === "production" ? "http" : "debug",
      format: winston.format.combine(winston.format.colorize(), defaultFormat),
    }),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/info.log", level: "info" }),
    new winston.transports.File({ filename: "logs/http.log", level: "http" }),
    new winston.transports.File({ filename: "logs/debug.log", level: "debug" }),
    new winston.transports.File({ filename: "logs/silly.log", level: "silly" }),
  ],
});

const logger = winston.createLogger(options);
module.exports = logger;

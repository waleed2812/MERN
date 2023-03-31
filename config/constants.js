const { join } = require("path");

/* ---------------------------- Backend Specific ---------------------------- */
exports.EXCLUDE_ON_DB_REQUESTS = "-password -__v -expiry -token";
exports.SALT_WORK_FACTOR = 10;
exports.SENDGRID_OPTIONS = {
  service: "SendGrid",
  auth: {
    user: process.env.SENDGRID_USER,
    pass: process.env.SENDGRID_KEY,
  },
};
exports.IMG_PATH = join("public", "profile-pictures", global.config.NODE_ENV);
/* -------------------------- Shared With Frontend -------------------------- */
exports.PASSWORD_RULES = "password must have at least 8 characters including one special character, one uppercase, one lowercase and one digit.";
exports.NAME_RULES = "name can only include alphabets and spaces.";
exports.USER_TYPES = ["user", "admin"];

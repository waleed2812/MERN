var CONSTANTS = {};

CONSTANTS.EXCLUDE_ON_DB_REQUESTS = "-password";

CONSTANTS.baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:" + global.config.PORT
    : "https://my-mern-test.herokuapp.com";

CONSTANTS.SALT_WORK_FACTOR = 10;

module.exports = CONSTANTS;

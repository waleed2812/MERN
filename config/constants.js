exports.EXCLUDE_ON_DB_REQUESTS = "-password -updatedAt -createdAt -__v";

exports.baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:" + global.config.PORT
    : "https://my-mern-test.herokuapp.com";

exports.baseURLFrontEnd =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://my-mern-test.herokuapp.com";

exports.SALT_WORK_FACTOR = 10;

exports.PASSWORD_RULES = `Password must have at least 8 characters including one special character, one uppercase, one lowercase and one digit.`;

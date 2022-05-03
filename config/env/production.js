const PORT = process.env.PORT || 3001;
const DB_NAME = "mern";
const DB_USER = process.env.DB_USER || "dbUser";
const DB_PASSWORD = process.env.DB_PASSWORD || "dbUserPassword";
const HOST = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.yqhzm.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

module.exports = {
  PORT: PORT,
  mongodb: {
    host: HOST,
    credentials: {
      username: DB_USER,
      password: DB_PASSWORD,
    },
  },
  enableMongoDebugging: true,
  session: {
    secret: "mern-secret",
  },
};

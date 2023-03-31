const PORT = process.env.PORT || 3000;
const MONGODB_NAME = process.env.MONGODB_NAME || "mern";
const MONGODB_USER = process.env.MONGODB_USER || "dbUser";
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD || "dbUserPassword";
const MONGODB_HOST = process.env.MONGODB_HOST || "localhost";
const MONGODB_PORT = process.env.MONGODB_PORT || 27017;
const CONNECTION_STRING = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_NAME}?retryWrites=true&w=majority`;

module.exports = {
  PORT,
  mongodb: {
    host: MONGODB_HOST,
    port: MONGODB_PORT,
    database: MONGODB_NAME,
    connString: CONNECTION_STRING,
    credentials: {
      username: MONGODB_USER,
      password: MONGODB_PASSWORD,
    },
  },
  session: {
    secret: "mern-secret",
  },
};

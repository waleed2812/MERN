export const apiURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3003/api"
    : "https://my-mern-test.herokuapp.com/api";
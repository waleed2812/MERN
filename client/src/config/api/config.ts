export const apiURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001/api"
    : "https://my-mern-test.herokuapp.com/api";
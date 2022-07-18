const mongoose = require("mongoose");
const { EXCLUDE_ON_DB_REQUESTS } = require("../../config/constants");
const tbl_user = mongoose.model("tbl_user");
const tbl_sessions = mongoose.model("tbl_sessions");

async function middleware(req, res, next) {
  // console.log("middleware...");
  let token = req.headers.authorization || "temp";
  // console.log("req.headers", req.headers);
  // console.log("token", token);
  if (token !== "temp") {
    const session = await tbl_sessions
      .findOne({
        auth_token: token,
        expires: { $gte: new Date().toISOString() },
      })
      .select(EXCLUDE_ON_DB_REQUESTS);
    if (session) {
      const user = await tbl_user
        .findOne({ _id: session.user_id })
        .select(EXCLUDE_ON_DB_REQUESTS);
      if (user) {
        req.session = session;
        req.user = user;
        // console.log('req.session', req.session)
        // console.log('req.user', req.user)
      }
    }
  }
  next();
}

async function isAuthenticated(req, res, next) {
  try {
    if (req.user && req.session) {
      const user = tbl_user
        .findOne({ _id: req.user._id })
        .select(EXCLUDE_ON_DB_REQUESTS);
      if (!user) throw new Error("user does not exist anymore.");
      const session = await tbl_sessions
        .findOne({
          auth_token: req.session.auth_token,
          expires: { $gte: new Date().toISOString() },
        })
        .select(EXCLUDE_ON_DB_REQUESTS);
      if (!session) throw new Error("session expired.");
      next();
    } else {
      throw new Error("user is not logged in.");
    }
  } catch (err) {
    next(err);
  }
}

async function isAuthorized(user_type) {
  // console.log("user_type", user_type)
  return function (req, res, next) {
    try {
      // console.log("user_type", user_type)
      // console.log("req.user.user_type", req.user.user_type)
      const errMsg = "user is not authorized to access this api.";
      if (Array.isArray(user_type)) {
        // console.log('user_type', user_type)
        for (let i = 0; i < user_type.length; i++) {
          if (user_type[i] === req.user.user_type) {
            return next();
          }
        }
        throw new Error(errMsg);
      } else if (user_type === req.user.user_type) {
        return next();
      }
      throw new Error(errMsg);
    } catch (err) {
      return next(err);
    }
  };
}

async function logout(req, res, next) {
  try {
    // console.log("logout");
    // console.log("req.session", req.session);
    if (req.session) {
      await tbl_sessions.findOneAndUpdate(
        {
          _id: req.session._id,
        },
        {
          expires: new Date(0).toISOString(),
        }
      );

      return res.json({
        success: true,
        message: "logged out",
        data: {},
      });
    } else {
      throw new Error("user is not logged in.");
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  middleware,
  isAuthenticated,
  isAuthorized,
  logout,
};

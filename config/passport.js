const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Users = mongoose.model("Users");
const { EXCLUDE_ON_DB_REQUESTS } = require("./constants");

// Local strategy handler
async function localStrategyHandler(username, password, done) {
  // console.log(username);
  if (!username || typeof username !== "string")
    return done(null, false, {
      msgCode: "EMAIL_REQUIRED",
    });
  if (!password || typeof password !== "string")
    return done(null, false, {
      msgCode: "PASSWORD_REQUIRED",
    });
  const search = username.trim();
  const filter = {
    $or: [{ email: { $regex: search, $options: "i" } }],
  };
  const user = await Users.findOne(filter);
  // console.log(user);
  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      EXCLUDE_ON_DB_REQUESTS.split("-")
        .join("")
        .split(" ")
        .forEach((key) => (user[key] = undefined));
      return done(null, user);
    } else {
      return done(null, false, {
        msgCode: "INVALID_PASSWORD",
      });
    }
  } else {
    return done(null, false, {
      msgCode: "USER_NOTFOUND",
    });
  }
}
// Local Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    localStrategyHandler
  )
);
// User Serialize User
passport.serializeUser(function (user, done) {
  try {
    if (user) {
      done(null, {
        _id: user._id,
        email: user.email,
        name: user.name,
        type: user.type,
      });
    } else {
      return done(new Error("failed to serialize user"), null);
    }
  } catch (err) {
    return done(err, null);
  }
});
// passport deserialize
passport.deserializeUser(async function (user, done) {
  try {
    if (!!user) {
      const filters = { _id: user._id };
      const account = await Users
        .findOne(filters)
        .select(EXCLUDE_ON_DB_REQUESTS);

      if (!!account) {
        return done(null, account);
      } else {
        return done({ msgCode: "USER_NOTFOUND" }, null);
      }
    } else {
      return done({ msgCode: "USER_NOTFOUND" }, null);
    }
  } catch (err) {
    return done(err, null);
  }
});
// passport middleware
passport.isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return next({ msgCode: "UNAUTHENTICATED" });
};
// passport middleware
passport.isAuthorized = function (type) {
  return function (req, res, next) {
    if (req.isAuthenticated() && req.user.type === type) {
      return next();
    }
    return next({ msgCode: "UNAUTHORIZED" });
  };
};
// Logout
passport.logout = function (req, res, next) {
  req.logout(function (err) {
    req.session.destroy(function (err) {
      return res.json({
        success: true,
        message: "logged out.",
        data: {},
      });
    });
  });
};
// Exports
module.exports = passport;

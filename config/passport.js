const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const tbl_user = mongoose.model("tbl_user");
const { EXCLUDE_ON_DB_REQUESTS } = require("./constants");

// Local Strategy Function
async function LocalStrategyHandler(username, password, done, user_type) {
  const search = username.split(" ").join("").toLowerCase();
  const filter = {
    $or: [{ email: search }, { phone: search }, { username: search }],
    // user_type,
  };
  const user = await tbl_user.findOne(filter);
  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      EXCLUDE_ON_DB_REQUESTS.split("-")
        .join("")
        .split(" ")
        .forEach((key) => (user[key] = undefined));
      return done(null, user);
    } else {
      return done(null, false, { message: "Invalid Password" });
    }
  } else {
    return done(null, false, { message: "User Not Found" });
  }
}
// Local Strategy
passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async function (username, password, done) {
      await LocalStrategyHandler(username, password, done, "user");
    }
  )
);
// User Serialize User
passport.serializeUser(async function (user, done) {
  try {
    if (user) {
      return done(null, user);
    } else {
      return done(new Error("Failed to Serialize User"), null);
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
      const account = await tbl_user.findOne(filters);
      EXCLUDE_ON_DB_REQUESTS.split("-")
        .join("")
        .split(" ")
        .forEach((key) => (user[key] = undefined));
      if (!!account) {
        return done(null, account);
      } else {
        return done(new Error("User Account Does not Exist Anymore."), null);
      }
    } else {
      return done(new Error("Failed to Deserialize User"), null);
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
  return next({ message: "User is not logged in" });
};
passport.isNotAuthenticated = function (req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  return next({ message: "User is already logged in." });
};
// Logout
passport.logout = function (req, res, next) {
  req.logout();
  req.session.destroy(function (err) {
    if (err) {
      return next(err);
    }
    return res.json({
      success: true,
      message: "Logged Out",
      data: {},
    });
  });
};
// passport custom method to check user_type
passport.isAuthorized = function (user_type) {
  return function (req, res, next) {
    if (user_type === req.user.user_type) {
      return next();
    }
    return next({ message: "User is not authorized to access this api." });
  };
};
// passport custom method to check minimum user_type level
passport.isAtLeast = function (user_type) {
  return function (req, res, next) {
    if (req.user.user_type >= user_type) {
      return next();
    }
    return next({ message: "User is not authorized to access this api." });
  };
};
// Exports
module.exports = passport;

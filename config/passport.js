const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const tbl_user = mongoose.model("tbl_user");

// Local Strategy Function
async function LocalStrategyHandler (username, password, done, user_type) {
  const search = username.split(" ").join("").toLowerCase();
  const filter = {
    $or: [{ email: search }, { phone: search }, { username: search }],
    // user_type,
  };
  const user = await tbl_user.findOne(filter);
  if(user) {
    if(bcrypt.compareSync(password, user.password)){
      return done(null, {
        _id: user?._id,
        user_type: user?.user_type,
        first_name: user?.first_name,
        last_name: user?.last_name,
      });
    } else {
      return done(null, false, { message: "Invalid Password" });
    }
  } else {
    return done(null, false, { message: "User Not Found" });
  }
};

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
      return done(null, {
        _id: user._id,
        user_type: user.user_type,
        first_name: user.first_name,
        last_name: user.last_name,
      });
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
      if (!!account) {
        return done(null, {
          _id: account._id,
          user_type: account.user_type,
          first_name: account.first_name,
          last_name: account.last_name,
        });
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

const { validateEmail, validatePassword } = require("../../config/functions");
const { EXCLUDE_ON_DB_REQUESTS } = require("../../config/constants");
const mongoose = require("mongoose");
const tbl_user = mongoose.model("tbl_user");
const passport = require('../../config/passport');

async function index(req, res, next) {
  try {
    return res.json({
      success: true,
      message: "Users records fetched",
      data: {},
    });
  } catch (err) {
    console.error(err);
  }
}

async function register(req, res, next) {
  try {
    let { username, email, first_name, last_name, password } = req.body;
    if (!email) {
      throw new Error("No Email Provided");
    }
    if (!validateEmail(email)) {
      throw new Error(`${email} is invalid email`);
    }
    if (!password) {
      throw new Error("No Password Provided");
    }
    password = validatePassword(password);
    let options = {
      email,
      password,
    };
    if (!!username) options.username = username;
    if (!!first_name) options.first_name = first_name;
    if (!!last_name) options.last_name = last_name;
    const user = await new tbl_user(options).save();
    req.body.username = email;
    passport.authenticate("local", function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(info);
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return next();
      });
    })(req, res, next);
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    passport.authenticate("local", function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(info);
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return next();
      });
    })(req, res, next);
  } catch (err) {
    next(err);
  }
}

async function loginSuccess(req, res, next) {
  try {
    if(req.user) {
      return res.json({
        success: true,
        message: "Login Successful.",
        data: {
          user: req.user
        }
      })
    } else {
      throw new Error("Failed to Login. Unknown Error");
    };
  } catch (err) {
    next(err);
  }
}

async function getProfile(req, res, next) {
  try {
    const user = await tbl_user.findOne({ _id: req.user._id}).select(EXCLUDE_ON_DB_REQUESTS);
    return res.json({
      success: true,
      message: "User Profile Fetched Successfully.",
      data: {
        user,
      }
    })
  } catch (err) {
    next(err);
  }
}

module.exports = {
  index,
  register,
  login,
  loginSuccess,
  getProfile,
};

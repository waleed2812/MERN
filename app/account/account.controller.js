const mongoose = require("mongoose");
const Users = mongoose.model("Users");
const passport = require("../../config/passport");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const {
  EXCLUDE_ON_DB_REQUESTS,
  SALT_WORK_FACTOR,
  SENDGRID_OPTIONS,
} = require("../../config/constants");
const {
  validatePassword,
  validateName,
  validateEmail,
  getRandomInt,
} = require("../../utils");
const winston = require("../../config/winston");

exports.register = async function (req, res, next) {
  try {
    const { email, password, name } = req.body;
    let options = {
      email: validateEmail(email),
      password: validatePassword(password),
      name: validateName(name),
    };
    const user = await new Users(options).save();
    if (!user) next({ msgCode: "CREATE" });
    return res.json({
      success: true,
      message: "registration successful.",
      data: {},
    });
  } catch (err) {
    if (err?.message?.includes("duplicate")) {
      return next({ msgCode: "DUPLICATE_EMAIL" });
    }
    return next(err);
  }
};
exports.login = async function (req, res, next) {
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
    return next(err);
  }
};
exports.loginSuccess = async function (req, res, next) {
  try {
    if (!req.user) return next({ msgCode: "UNAUTHENTICATED" });
    return res.json({
      success: true,
      message: "login successful.",
      data: {
        user: req.user,
      },
    });
  } catch (err) {
    return next(err);
  }
};
exports.getProfile = async function (req, res, next) {
  try {
    const user = await Users.findOne({ _id: req.user._id }).select(
      EXCLUDE_ON_DB_REQUESTS
    );
    return res.json({
      success: true,
      message: "user profile fetched successfully.",
      data: {
        user,
      },
    });
  } catch (err) {
    return next(err);
  }
};
exports.putProfile = async function (req, res, next) {
  try {
    const filters = { _id: req.user._id };
    const user = await Users.findOne(filters);
    if (!user) return next({ msgCode: "USER_NOTFOUND" });
    // console.log(req.body);
    const { email, name, password, newPassword } = req.body;
    let options = {};
    if (email && email !== user.email) {
      options.email = validateEmail(email);
    }
    if (name && name !== user.name) {
      options.name = validateName(name);
    }
    if (password && newPassword) {
      if (!bcrypt.compareSync(password, user.password)) {
        return next({ msgCode: "INVALID_PASSWORD" });
      }
      if (!validatePassword(newPassword))
        return next({
          msgCode: "INVALID_NEW_PASSWORD",
          data: {
            errors: {
              newPassword: PASSWORD_RULES,
            },
          },
        });
      options.password = bcrypt.hashSync(
        newPassword,
        bcrypt.genSaltSync(SALT_WORK_FACTOR)
      );
    }

    if (Object.keys(options).length <= 0) {
      return next({ msgCode: "UPDATE_NOTHING" });
    }
    options.updatedAt = new Date();
    const update = await Users.findOneAndUpdate(filters, options, {
      new: true,
    }).select(EXCLUDE_ON_DB_REQUESTS);
    if (!update) return next({ msgCode: "UPDATE" });
    return res.json({
      success: true,
      message: "user profile updated successfully.",
      data: {
        user: update,
      },
    });
  } catch (err) {
    if (err?.message?.includes("duplicate")) {
      return next({ msgCode: "DUPLICATE_EMAIL" });
    }
    return next(err);
  }
};
exports.delete = async function (req, res, next) {
  try {
    const { _id } = req.user;
    req.logout(function (err) {
      req.session.destroy(async function (err) {
        Users.deleteOne({ _id })
          .then(() => {
            return res.json({
              success: true,
              message: "Account deleted.",
              data: {},
            });
          })
          .catch(() => {
            return next({ msgCode: "DELETE" });
          });
      });
    });
  } catch (err) {
    return next(err);
  }
};
exports.forget = async function (req, res, next) {
  try {
    const { email } = req.body;
    const filters = {
      email,
    };
    const user = await Users.findOne(filters).select(EXCLUDE_ON_DB_REQUESTS);
    if (!user) return next({ msgCode: "USER_NOTFOUND" });
    const otp = getRandomInt(10000, 1000);
    // console.log("otp", otp);
    const options = {
      otp,
      expiry: Date.now() + 1000 * 60 * 60, // 1 hour in milliseconds
    };
    // Sending OTP
    const client = nodemailer.createTransport(SENDGRID_OPTIONS);
    const mailOptions = {
      to: email,
      from: process.env.SENDGRID_FROM,
      subject: "MERN Password Reset.",
      text: "Enter the following OTP to reset your password:\n\nOTP: " + otp,
    };
    client.sendMail(mailOptions).catch((err) => winston.error(err));
    const update = await Users.findOneAndUpdate(filters, options, {
      new: true,
    }).select(EXCLUDE_ON_DB_REQUESTS);
    if (!update) {
      return next({ msgCode: "OTP_UPDATE" });
    }
    return res.json({
      success: true,
      message: "OTP sent on email.",
      data: {
        expiry: new Date(options.expiry),
      },
    });
  } catch (err) {
    return next(err);
  }
};
exports.otp = async function (req, res, next) {
  try {
    const { email } = req.body;
    const otp = Number.parseInt(req.body.otp);
    const filters = {
      email,
    };
    const user = await Users.findOne(filters);
    if (!user) return next({ msgCode: "USER_NOTFOUND" });
    if (user.expiry < Date.now()) return next({ msgCode: "OTP_EXPIRED" });
    if (user.otp !== otp) return next({ msgCode: "OTP_INVALID" });
    return res.json({
      success: true,
      message: "otp is valid.",
      data: {},
    });
  } catch (err) {
    return next(err);
  }
};
exports.updatePassword = async function (req, res, next) {
  try {
    const { email } = req.body;
    const filters = {
      email,
      expiry: { $gte: Date.now() },
    };
    const user = await Users.findOne(filters);
    if (!user) return next({ msgCode: "OTP_EXPIRED" });
    const otp = Number.parseInt(req.body.otp);
    if (user.otp !== otp) return next({ msgCode: "OTP_INVALID" });
    user.password = validatePassword(req.body.password);
    user.otp = undefined;
    user.expiry = undefined;
    await user.save();
    return res.json({
      success: true,
      message: "password has been updated. login with new password",
      data: {},
    });
  } catch (err) {
    return next(err);
  }
};

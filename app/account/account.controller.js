const { validateEmail, validatePassword } = require("../../config/functions");
const {
  EXCLUDE_ON_DB_REQUESTS,
  SALT_WORK_FACTOR,
} = require("../../config/constants");
const mongoose = require("mongoose");
const tbl_user = mongoose.model("tbl_user");
const tbl_sessions = mongoose.model("tbl_sessions");
// const passport = require("../../config/passport");
const bcrypt = require("bcryptjs");

async function createSession(req, user) {
  const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
  const hash = bcrypt.hashSync(
    user?._id + user?.email + global.config.session.secret,
    salt
  );
  let session_options = {
    auth_token: hash,
    user_id: user._id,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    user_ip: req.socket.remoteAddress,
  };
  const {
    fcm_token,
    device_type,
    device_os,
    device_os_version,
    device_name,
    device_model,
    application,
  } = req.body;
  if (fcm_token) session_options.fcm_token = fcm_token;
  if (device_type) session_options.device_type = device_type;
  if (device_os) session_options.device_os = device_os;
  if (device_os_version) session_options.device_os_version = device_os_version;
  if (device_name) session_options.device_name = device_name;
  if (device_model) session_options.device_model = device_model;
  if (application) session_options.application = application;
  return await new tbl_sessions(session_options).save();
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
    if (!user) throw new Error("failed to register.");
    const session = await createSession(req, user);
    if (!session) throw new Error("failed to create a session. try login.");
    return res.json({
      success: true,
      message: "successfully created account.",
      data: {
        user: {
          _id: user._id,
          email: user?.email,
        },
        session: {
          auth_token: session.auth_token,
        },
      },
    });
    // req.body.username = email;
    // passport.authenticate("local", function (err, user, info) {
    //   if (err) {
    //     return next(err);
    //   }
    //   if (!user) {
    //     return next(info);
    //   }
    //   req.logIn(user, function (err) {
    //     if (err) {
    //       return next(err);
    //     }
    //     return next();
    //   });
    // })(req, res, next);
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    if(!username) throw new Error("no username provided.")
    if(!password) throw new Error("no password provided.")

    const search = username?.split(" ")?.join("")?.toLowerCase();
    const filter = {
      $or: [{ email: search }, { phone: search }, { username: search }],
    };
    const user = await tbl_user.findOne(filter);
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        const session = await createSession(req, user);
        if (!session) throw new Error("failed to create a session. try again.");
        return res.json({
          success: true,
          message: "login successfully.",
          data: {
            user: {
              _id: user._id,
              email: user?.email,
            },
            session: {
              auth_token: session.auth_token,
            },
          },
        });
      } else {
        throw new Error("Invalid Password");
      }
    } else {
      throw new Error("User Not Found");
    }
    // passport.authenticate("local", function (err, user, info) {
    //   if (err) {
    //     return next(err);
    //   }
    //   if (!user) {
    //     return next(info);
    //   }
    //   req.logIn(user, function (err) {
    //     if (err) {
    //       return next(err);
    //     }
    //     return next();
    //   });
    // })(req, res, next);
  } catch (err) {
    next(err);
  }
}

async function loginSuccess(req, res, next) {
  try {
    if (req.user) {
      return res.json({
        success: true,
        message: "Login Successful.",
        data: {
          user: req.user,
        },
      });
    } else {
      throw new Error("Failed to Login. Unknown Error");
    }
  } catch (err) {
    next(err);
  }
}

async function getProfile(req, res, next) {
  try {
    const user = await tbl_user
      .findOne({ _id: req.user._id })
      .select(EXCLUDE_ON_DB_REQUESTS);
    return res.json({
      success: true,
      message: "User Profile Fetched Successfully.",
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  register,
  login,
  loginSuccess,
  getProfile,
};

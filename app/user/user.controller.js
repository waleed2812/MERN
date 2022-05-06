const { validateEmail, validatePassword } = require('../../config/functions');;
const { EXCLUDE_ON_DB_REQUESTS } = require('../../config/constants');
const mongoose = require('mongoose');
const tbl_user = mongoose.model('tbl_user');

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
    let { username, email, phone, first_name, last_name, password } = req.body;
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
    if(!!username) options.username = username;
    if(!!phone) options.phone = phone;
    if(!!first_name) options.first_name = first_name;
    if(!!last_name) options.last_name = last_name;

    const user = await new tbl_user(options).save();
    EXCLUDE_ON_DB_REQUESTS.split('-').join('').split(' ').forEach(key => user[key] = undefined)

    return res.json({
      success: true,
      message: "Registration Successful.",
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  index,
  register,
};

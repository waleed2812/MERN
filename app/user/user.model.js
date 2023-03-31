const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { SALT_WORK_FACTOR, USER_TYPES } = require("../../config/constants");
const schema = mongoose.Schema;
let Users = new schema({
  email: {
    type: schema.Types.String,
    unique: true,
    required: true,
  },
  name: { type: schema.Types.String, required: true },
  type: { type: schema.Types.String, default: USER_TYPES[0], enum: USER_TYPES },
  image: { type: schema.Types.String, default: undefined },
  token: { type: schema.Types.String, default: undefined },
  password: { type: schema.Types.String, default: undefined },
  otp: { type: schema.Types.Number, default: undefined },
  expiry: { type: schema.Types.Date, default: new Date() },
  createdAt: { type: schema.Types.Date, default: new Date() },
  updatedAt: { type: schema.Types.Date, default: new Date() },
});

Users.pre("save", function (next) {
  try {
    let user = this;
    if (!user.password) return next();
    // only hash the password if it has been modified or is new
    if (!user.isModified("password")) return next();
    // generate a salt
    user.password = bcrypt.hashSync(
      this.password,
      bcrypt.genSaltSync(SALT_WORK_FACTOR)
    );
    return next();
  } catch (err) {
    return next(err);
  }
});
module.exports = mongoose.model("Users", Users, "Users");

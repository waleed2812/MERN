const mongoose = require("mongoose");
const mongoose_timestamps = require("mongoose-timestamp");
const bcrypt = require("bcryptjs");
const schema = mongoose.Schema;
let tbl_user = new schema({
  email: {
    type: schema.Types.String,
    default: "",
    unique: true,
    required: true,
  },
  username: {
    type: schema.Types.String,
    default: "",
    unique: true,
  },
  first_name: { type: schema.Types.String, default: "" },
  last_name: { type: schema.Types.String, default: "" },
  password: { type: schema.Types.String, default: "" },
  user_type: {
    type: schema.Types.String,
    default: "user",
    enum: ["user", "admin"],
  },
  profile_image: { type: schema.Types.String, default: "" },
});
tbl_user.plugin(mongoose_timestamps);
tbl_user.pre("save", async function (next) {
  try {
    let user = this;
    if (!user.password) next();
    // only hash the password if it has been modified or is new
    if (!user.isModified("password")) return next();
    // generate a salt
    let salt = await bcrypt.genSalt(global.config.SALT_WORK_FACTOR);
    let hash = await bcrypt.hash(this.password, salt);
    // override clear text password with hashed one
    user.password = hash;
    next();
  } catch (err) {
    return next(err);
  }
});

module.exports = mongoose.model("tbl_user", tbl_user, "tbl_user");

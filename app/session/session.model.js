const mongoose = require("mongoose");
const mongoose_timestamps = require("mongoose-timestamp");
const schema = mongoose.Schema;
let tbl_session = new schema({
  user_id: {
    type: schema.Types.String,
    unique: true,
    required: true,
  },
  user_ip: {
    type: schema.Types.String,
    default: "",
    unique: true,
  },
  expires: { type: schema.Types.Date, default: new Date() },
  fcm_token: { type: schema.Types.String, default: "" },
});
tbl_session.plugin(mongoose_timestamps);
module.exports = mongoose.model("tbl_session", tbl_session, "tbl_session");

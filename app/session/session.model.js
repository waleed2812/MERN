const mongoose = require("mongoose");
const mongoose_timestamps = require("mongoose-timestamp");
const schema = mongoose.Schema;
let tbl_sessions = new schema({
  auth_token: {
    type: schema.Types.String,
    unique: true,
    required: true,
  },
  user_id: {
    type: schema.Types.String,
    required: true,
  },
  expires: { type: schema.Types.Date, default: new Date() },
  user_ip: {
    type: schema.Types.String,
    default: undefined,
  },
  fcm_token: { type: schema.Types.String, default: undefined },
  device_type: { type: schema.Types.String, default: undefined },
  device_os: { type: schema.Types.String, default: undefined },
  device_os_version: { type: schema.Types.String, default: undefined },
  device_name: { type: schema.Types.String, default: undefined },
  device_model: { type: schema.Types.String, default: undefined },
  application: { type: schema.Types.String, default: undefined },
});
tbl_sessions.plugin(mongoose_timestamps);
module.exports = mongoose.model("tbl_sessions", tbl_sessions, "tbl_sessions");

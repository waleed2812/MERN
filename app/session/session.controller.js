const mongoose = require('mongoose');

module.exports = async function(req, res, next) {
  try {
    console.log("session middleware");
    var id = req.headers.session_id;
    try {
      id = mongoose.Types.ObjectId(id);
    } catch(err) {
      id = null
    }
    if(id) {
      req.user = {
        _id: "User",
        email: "user@yahoo.com"
      }
    }

    console.log(id);
    next();
  } catch(err) {
    next(err);
  }
}
async function index(req, res, next) {
  try {
    return res.json({
      success: true,
      message: "MERN server is running",
      data: {},
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  index
};

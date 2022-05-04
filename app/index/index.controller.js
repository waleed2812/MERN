async function index(req, res, next) {
  try {
    return res.json({
      success: true,
      message: "MERN Server is Running",
      data: {},
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  index
}
async function index(req, res, next) {
  try {
    console.log(req.user);
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
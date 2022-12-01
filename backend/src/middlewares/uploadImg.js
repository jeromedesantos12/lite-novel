// import
const { setupNovel, setupUser } = require("../utils/multerSetup");

// novel
exports.imgNovel = async (req, res, next) => {
  try {
    await setupNovel(req, res);
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
  next();
};

// user
exports.imgUser = async (req, res, next) => {
  try {
    await setupUser(req, res);
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
  next();
};

// import
const { multerSetup } = require("../utils/multerSetup");

// export
exports.uploadImg = async (req, res, next) => {
  try {
    await multerSetup(req, res);
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
  next();
};

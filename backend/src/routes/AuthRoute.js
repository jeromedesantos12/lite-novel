// export
module.exports = (
  User,
  History,
  router,
  path,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET
) => {
  // import
  const { imgUser } = require("../middlewares/uploadImg");
  const { removeImg } = require("../utils/removeImg");
  const { hashPwd, comparePwd } = require("../utils/hashNcompare");
  const {
    verifyAccessToken,
    generateAccessToken,
    generateRefreshToken,
  } = require("../middlewares/verifyNgenerate");
  const {
    validateRegister,
    validateLogin,
  } = require("../middlewares/validateAuth");
  const {
    registerUser,
    loginUser,
    logoutUser,
  } = require("../controllers/AuthController");

  // route path
  router.post(
    "/register",
    imgUser,
    validateRegister(User, removeImg, path),
    registerUser(User, hashPwd)
  );
  router.post(
    "/login",
    validateLogin,
    loginUser(
      User,
      History,
      comparePwd,
      generateAccessToken,
      generateRefreshToken,
      ACCESS_TOKEN_SECRET,
      REFRESH_TOKEN_SECRET
    )
  );
  router.delete(
    "/logout",
    verifyAccessToken(ACCESS_TOKEN_SECRET),
    logoutUser(History)
  );

  return router;
};

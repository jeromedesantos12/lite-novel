// export
module.exports = (mongoose, express, path, ACCESS_TOKEN_SECRET) => {
  // import
  const router = express.Router();
  const User = require("../models/UserModel")(mongoose);
  const { pagination } = require("../middlewares/pagination");
  const { imgUser } = require("../middlewares/uploadImg");
  const { removeImg } = require("../utils/removeImg");
  const { hashPwd, comparePwd } = require("../utils/hashNcompare");
  const {
    verifyAccessToken,
    generateAccessToken,
  } = require("../middlewares/verifyNgenerate");
  const {
    validateCreate,
    validateRegister,
    validateLogin,
    validateUpdate,
    validateProfile,
  } = require("../middlewares/validateUser");
  const {
    readUsers,
    readUserById,
    searchUser,
    createUser,
    loginUser,
    registerUser,
    updateUser,
    profileUser,
    deleteUser,
  } = require("../controllers/UserController");

  // route path
  router.post(
    "/login",
    validateLogin,
    loginUser(User, comparePwd, generateAccessToken, ACCESS_TOKEN_SECRET)
  );
  router.post(
    "/register",
    imgUser,
    validateRegister(User, removeImg, path),
    registerUser(User, hashPwd)
  );
  router.get(
    "/read",
    verifyAccessToken(ACCESS_TOKEN_SECRET),
    pagination(User),
    readUsers(User)
  );
  router.get(
    "/read/:id",
    verifyAccessToken(ACCESS_TOKEN_SECRET),
    readUserById(User)
  );
  router.get("/search", searchUser(User));
  router.post(
    "/create",
    verifyAccessToken(ACCESS_TOKEN_SECRET),
    imgUser,
    validateCreate(User, removeImg, path),
    createUser(User, hashPwd)
  );
  router.put(
    "/update/:id",
    verifyAccessToken(ACCESS_TOKEN_SECRET),
    validateUpdate,
    updateUser(User)
  );
  router.put(
    "/profile/:id",
    verifyAccessToken(ACCESS_TOKEN_SECRET),
    imgUser,
    validateProfile(User, removeImg, path),
    profileUser(User, hashPwd, removeImg, path)
  );
  router.delete(
    "/delete/:id",
    verifyAccessToken(ACCESS_TOKEN_SECRET),
    deleteUser(User, removeImg, path)
  );

  return router;
};

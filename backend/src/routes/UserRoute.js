// export
module.exports = (User, router, path, ACCESS_TOKEN_SECRET) => {
  // import
  const { pagination } = require("../middlewares/pagination");
  const { imgUser } = require("../middlewares/uploadImg");
  const { removeImg } = require("../utils/removeImg");
  const { hashPwd } = require("../utils/hashNcompare");
  const { verifyAccessToken } = require("../middlewares/verifyNgenerate");
  const {
    validateCreate,
    validateUpdate,
    validateProfile,
  } = require("../middlewares/validateUser");
  const {
    readUsers,
    readUserById,
    searchUser,
    createUser,

    updateUser,
    profileUser,
    deleteUser,
  } = require("../controllers/UserController");

  // route path
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

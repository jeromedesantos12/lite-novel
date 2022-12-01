// export
module.exports = (mongoose, express, path) => {
  // import
  const router = express.Router();
  const User = require("../models/UserModel")(mongoose);
  const { pagination } = require("../middlewares/pagination");
  const { imgUser } = require("../middlewares/uploadImg");
  const { removeImg } = require("../utils/removeImg");
  const { hashPwd, comparePwd } = require("../utils/hashNcompare");
  const {
    validateCreate,
    validateLogin,
    validateRegister,
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
  router.get("/read", pagination(User), readUsers(User));
  router.get("/read/:id", readUserById(User));
  router.get("/search", searchUser(User));
  router.post(
    "/create",
    imgUser,
    validateCreate(User, removeImg, path),
    createUser(User, hashPwd)
  );
  router.post("/login", validateLogin, loginUser(User, comparePwd));
  router.post(
    "/register",
    imgUser,
    validateRegister(User, removeImg, path),
    registerUser(User, hashPwd)
  );
  router.put("/update/:id", validateUpdate, updateUser(User));
  router.put(
    "/profile/:id",
    imgUser,
    validateProfile(User, removeImg, path),
    profileUser(User, hashPwd, removeImg, path)
  );
  router.delete("/delete/:id", deleteUser(User, removeImg, path));

  return router;
};

// export
module.exports = (mongoose, express) => {
  // import
  const router = express.Router();
  const User = require("../models/UserModel")(mongoose);
  const { pagination } = require("../middlewares/pagination");
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
  router.post("/create", validateCreate(User), createUser(User, hashPwd));
  router.post("/login", validateLogin, loginUser(User, comparePwd));
  router.post("/register", validateRegister(User), registerUser(User, hashPwd));
  router.put("/update/:id", validateUpdate, updateUser(User));
  router.put("/profile/:id", validateProfile(User), profileUser(User));
  router.delete("/delete/:id", deleteUser(User));

  return router;
};

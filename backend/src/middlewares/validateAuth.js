// import
const { checkPath } = require("../utils/checkPath");
const {
  checkUser,
  checkName,
  checkUsername,
  checkEmail,
  checkPassword,
  checkPasswordConfirmation,
  findUsername,
  findEmail,
} = require("../utils/checkUser");

// validate login
exports.validateLogin = (req, res, next) => {
  const value = {};
  const { user, password } = req.body;

  checkUser(value, user);
  checkPassword(value, password);

  if (Object.keys(value).length > 0)
    return res.status(400).json({
      message: value,
    });
  next();
};

// validate register
exports.validateRegister =
  (User, removeImg, path) => async (req, res, next) => {
    const value = {};
    const { file } = req;
    const { name, username, email, password, passwordConfirmation } = req.body;

    checkPath(value, file?.path);
    checkName(value, name);
    checkUsername(value, username);
    checkEmail(value, email);
    checkPassword(value, password);
    checkPasswordConfirmation(value, password, passwordConfirmation);

    if (await findUsername(User, username))
      value.findUsername = "Username exist!";
    if (await findEmail(User, email)) value.findEmail = "Email exist!";

    if (Object.keys(value).length > 0) {
      await removeImg(file?.path, path);
      return res.status(400).json({
        message: value,
      });
    }
    next();
  };

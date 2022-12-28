// import
const { checkPath } = require("../utils/checkPath");
const {
  checkName,
  checkUsername,
  checkEmail,
  checkPassword,
  checkPasswordConfirmation,
  checkRole,
  findUsername,
  findEmail,
} = require("../utils/checkUser");

// validate create
exports.validateCreate = (User, removeImg, path) => async (req, res, next) => {
  const value = {};
  const { file } = req;
  const { name, username, email, password, passwordConfirmation, role } =
    req.body;

  checkPath(value, file?.path);
  checkName(value, name);
  checkUsername(value, username);
  checkEmail(value, email);
  checkPassword(value, password);
  checkPasswordConfirmation(value, password, passwordConfirmation);
  checkRole(value, role);

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

// validate update
exports.validateUpdate = (req, res, next) => {
  const value = {};
  const { role } = req.body;

  checkRole(value, role);

  if (Object.keys(value).length > 0)
    return res.status(400).json({
      message: value,
    });
  next();
};

// validate profile
exports.validateProfile = (User, removeImg, path) => async (req, res, next) => {
  const value = {};
  const { file } = req;
  const { id } = req.params;
  const { name, username, email, password, passwordConfirmation } = req.body;

  checkPath(value, file?.path);
  checkName(value, name);
  checkUsername(value, username);
  checkEmail(value, email);
  checkPassword(value, password);
  checkPasswordConfirmation(value, password, passwordConfirmation);

  if (
    (await findUsername(User, username)) &&
    id !== (await findUsername(User, username)._id)
  )
    value.findUsername = "Username exits!";
  if (
    (await findEmail(User, email)) &&
    id !== (await findEmail(User, email)._id)
  )
    value.findEmail = "Email exits!";

  if (Object.keys(value).length > 0) {
    await removeImg(file?.path, path);
    return res.status(400).json({
      message: value,
    });
  }
  next();
};

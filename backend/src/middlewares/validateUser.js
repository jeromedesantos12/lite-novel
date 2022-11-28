// import
const {
  checkUser,
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
exports.validateCreate = (User) => (req, res, next) => {
  const value = {};
  const { name, username, email, password, passwordConfirmation, role } =
    req.body;

  checkName(value, name);
  checkUsername(value, username);
  checkEmail(value, email);
  checkPassword(value, password);
  checkPasswordConfirmation(value, password, passwordConfirmation);
  checkRole(value, role);

  if (findUsername(User, username)) value.findUsername = "Username exist!";
  if (findEmail(User, email)) value.findEmail = "Email exist!";

  if (Object.keys(value) > 0)
    return res.status(400).json({
      message: value,
    });
  next();
};

// validate login
exports.validateLogin = (req, res, next) => {
  const value = {};
  const { user, password } = req.body;

  checkUser(value, user);
  checkPassword(value, password);

  if (Object.keys(value) > 0)
    return res.status(400).json({
      message: value,
    });
  next();
};

// validate register
exports.validateRegister = (User) => (req, res, next) => {
  const value = {};
  const { name, username, email, password, passwordConfirmation } = req.body;

  checkName(value, name);
  checkUsername(value, username);
  checkEmail(value, email);
  checkPassword(value, password);
  checkPasswordConfirmation(value, password, passwordConfirmation);

  if (findUsername(User, username)) value.findUsername = "Username exist!";
  if (findEmail(User, email)) value.findEmail = "Email exist!";

  if (Object.keys(value) > 0)
    return res.status(400).json({
      message: value,
    });
  next();
};

// validate update
exports.validateUpdate = (req, res, next) => {
  const value = {};
  const { role } = req.body;

  checkRole(value, role);

  if (Object.keys(value) > 0)
    return res.status(400).json({
      message: value,
    });
  next();
};

// validate profile
exports.validateProfile = (User) => (req, res, next) => {
  const value = {};
  const { id } = req.params;
  const { name, username, email, password, passwordConfirmation } = req.body;

  checkName(value, name);
  checkUsername(value, username);
  checkEmail(value, email);
  checkPassword(value, password);
  checkPasswordConfirmation(value, password, passwordConfirmation);

  if (findUsername(User, username) && id !== findUsername(User, username)._id)
    value.findUsername = "Username exits!";
  if (findEmail(User, email) && id !== findEmail(User, email)._id)
    value.findEmail = "Email exits!";

  if (Object.keys(value) > 0)
    return res.status(400).json({
      message: value,
    });
  next();
};

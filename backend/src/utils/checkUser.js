// import
const validator = require("validator");

// user
exports.checkUser = (value, user) => {
  if (user === undefined) return (value.user = "User undefined!");
  if (typeof user !== "string") return (value.user = "User must be string!");
  if (validator.isEmpty(user)) return (value.user = "User can't be empty!");
};

// name
exports.checkName = (value, name) => {
  if (name === undefined) return (value.name = "Name undefined!");
  if (typeof name !== "string") return (value.name = "Name must be string!");
  if (validator.isEmpty(name)) return (value.name = "Name can't be empty!");
  if (!validator.isAlpha(name, "en-US", { ignore: "-s" }))
    return (value.name = "Name not valid!");
};

// username
exports.checkUsername = (value, username) => {
  if (username === undefined) return (value.username = "Username undefined!");
  if (typeof username !== "string")
    return (value.username = "Username must be string!");
  if (validator.isEmpty(username))
    return (value.username = "Username can't be empty!");
  if (!validator.isAlphanumeric(username))
    return (value.username = "Username not valid!");
};

// email
exports.checkEmail = (value, email) => {
  if (email === undefined) return (value.email = "Email undefined!");
  if (typeof email !== "string") return (value.email = "Email must be string!");
  if (validator.isEmpty(email)) return (value.email = "Email can't be empty!");
  if (!validator.isEmail(email)) return (value.email = "Email not valid!");
};

// password
exports.checkPassword = (value, password) => {
  if (password === undefined) return (value.password = "Password undefined!");
  if (typeof password !== "string")
    return (value.password = "Password must be string!");
  if (validator.isEmpty(password))
    return (value.password = "Password can't be empty!");
  if (
    !validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  )
    return (value.password =
      "Password requirement, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1");
};

// password confirmation
exports.checkPasswordConfirmation = (value, password, passwordConfirmation) => {
  if (passwordConfirmation === undefined)
    return (value.passwordConfirmation = "Password Confirmation undefined!");
  if (typeof passwordConfirmation !== "string")
    return (value.passwordConfirmation =
      "Password Confirmation must be string!");
  if (validator.isEmpty(passwordConfirmation))
    return (value.passwordConfirmation =
      "Password Confirmation can't be empty!");
  if (passwordConfirmation !== password)
    return (value.passwordConfirmation =
      "Password & Password Confirmation not same!");
};

// role
exports.checkRole = (value, role) => {
  if (role === undefined) return (value.role = "Role undefined!");
  if (typeof role !== "string") return (value.role = "Role must be string!");
  if (role === null) return (value.role = "Role can't be empty!");
  if (!["root", "usr"].includes(role))
    return (value.role = "Role just root & usr!");
};

// find username
exports.findUsername = async (User, username) => {
  return await User.findOne({ username });
};

// find email
exports.findEmail = async (User, email) => await User.findOne({ email });

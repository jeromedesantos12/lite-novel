// import
const bcrypt = require("bcrypt");

// create user
exports.hashPwd = async (password) => await bcrypt.hash(password, 10);

// login user
exports.comparePwd = async (password, model) =>
  await bcrypt.compare(password, model.password);

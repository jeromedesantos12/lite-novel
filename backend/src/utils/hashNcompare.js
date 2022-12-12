// import
const bcrypt = require("bcrypt");

// create user
exports.hashPwd = async (password) => await bcrypt.hash(password, 10);

// login user
exports.comparePwd = async (password, hashPassword) =>
  await bcrypt.compare(password, hashPassword);

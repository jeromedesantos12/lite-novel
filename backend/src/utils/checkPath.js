// import
const validator = require("validator");

// path
exports.checkPath = (value, path) => {
  if (path === undefined) return (value.path = "Path undefined!");
  if (typeof path !== "string") return (value.path = "Path must be string!");
  if (validator.isEmpty(path)) return (value.path = "Path can't be empty!");
};

// import
const validator = require("validator");

// path
exports.checkPath = (value, path) => {
  if (typeof path !== "string") return (value.path = "Path must be string!");
  if (validator.isEmpty(path)) return (value.path = "Path can't be empty!");
};

// title
exports.checkTitle = (value, title) => {
  if (typeof title !== "string") return (value.title = "Title must be string!");
  if (validator.isEmpty(title)) return (value.title = "Title can't be empty!");
  if (!validator.isAlphanumeric(title, "en-US", { ignore: "-s" }))
    return (value.title = "Title not valid!");
};

// gendre
exports.checkGendre = (value, gendre) => {
  if (!Array.isArray(gendre)) return (value.gendre = "Gendre is not array!");
  if (gendre.length === 0) return (value.gendre = "Gendre can't be empty");

  gendre.map((gend) => {
    if (validator.isEmpty(gend))
      return (value.gendre = "Items can't be empty!");
    if (!validator.isAlphanumeric(gend, "en-US", { ignore: "-s" }))
      return (value.gendre = "Items not valid!");
  });
};

// content
exports.checkContent = (value, content) => {
  if (typeof content !== "string")
    return (value.content = "Content must be string!");
  if (validator.isEmpty(content))
    return (value.content = "Content can't be empty!");
};

// author
exports.checkAuthor = (value, author) => {
  if (typeof author !== "object")
    return (value.author = "Author must be object!");
  if (Object.keys(author) === 0)
    return (value.author = "Author can't be empty");

  if (validator.isEmpty(author.uid))
    return (value.author = "Uid can't be empty!");
  if (validator.isEmpty(author.username))
    return (value.author = "Username can't be empty!");
};

// find title
exports.findTitle = async (Novel, title) => await Novel.findOne({ title });

// find content
exports.findContent = async (Novel, content) =>
  await Novel.findOne({ content });

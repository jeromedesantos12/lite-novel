// import
const validator = require("validator");

// path
exports.checkPath = (value, path) => {
  if (path === undefined) return (value.path = "Path undefined!");
  if (typeof path !== "string") return (value.path = "Path must be string!");
  if (validator.isEmpty(path)) return (value.path = "Path can't be empty!");
};

// title
exports.checkTitle = (value, title) => {
  if (title === undefined) return (value.gendre = "Title undefined!");
  if (typeof title !== "string") return (value.title = "Title must be string!");
  if (validator.isEmpty(title)) return (value.title = "Title can't be empty!");
  if (!validator.isAlphanumeric(title, "en-US", { ignore: "-s" }))
    return (value.title = "Title not valid!");
};

// gendre
exports.checkGendre = (value, gendre) => {
  if (gendre === undefined) return (value.gendre = "Gendre undefined!");
  if (!Array.isArray(gendre)) return (value.gendre = "Gendre must be array!");
  if (gendre.length === 0) return (value.gendre = "Gendre can't be empty");

  gendre.map((gend) => {
    if (validator.isEmpty(gend))
      return (value.gendre = "Items can't be empty!");
    if (!validator.isAlpha(gend, "en-US", { ignore: "-s" }))
      return (value.gendre = "Items not valid!");
  });
};

// content
exports.checkContent = (value, content) => {
  if (content === undefined) return (value.content = "Content undefined!");
  if (typeof content !== "string")
    return (value.content = "Content must be string!");
  if (validator.isEmpty(content))
    return (value.content = "Content can't be empty!");
};

// author
exports.checkAuthor = (value, author) => {
  if (author === undefined) return (value.author = "Author undefined!");
  if (typeof author !== "object")
    return (value.author = "Author must be object!");
  if (Object.keys(author) === 0)
    return (value.author = "Author can't be empty");

  if (author.uid === undefined) return (value.author = "Uid undefined!");
  if (validator.isEmpty(author.uid))
    return (value.author = "Uid can't be empty!");

  if (author.username === undefined)
    return (value.author = "Username undefined!");
  if (validator.isEmpty(author.username))
    return (value.author = "Username can't be empty!");
};

// find title
exports.findTitle = async (Novel, title) => await Novel.findOne({ title });

// find content
exports.findContent = async (Novel, content) =>
  await Novel.findOne({ content });

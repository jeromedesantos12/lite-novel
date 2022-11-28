// import
const {
  checkImage,
  checkTitle,
  checkGendre,
  checkContent,
  checkAuthor,
  findTitle,
  findContent,
} = require("../utils/checkNovel");

// validate create
exports.validateCreate = (Novel) => (req, res, next) => {
  const value = {};
  const { path } = req.file;
  const { title, gendre, content } = req.body;

  // sementara
  const author = { uid: "usr001", username: "remitokun" };

  checkImage(value, path);
  checkTitle(value, title);
  checkGendre(value, gendre);
  checkContent(value, content);
  checkAuthor(value, author);

  if (findTitle(Novel, title)) value.findTitle = "Title exist!";
  if (findContent(Novel, content)) value.findContent = "Content exist!";

  if (Object.keys(value) > 0)
    return res.status(400).json({
      message: value,
    });
  next();
};

// validate update
exports.validateProfile = (Novel) => (req, res, next) => {
  const value = {};
  const { id } = req.params;
  const { path } = req.file;
  const { title, gendre, content } = req.body;

  // sementara
  const author = { uid: "usr001", username: "remitokun" };

  checkImage(value, path);
  checkTitle(value, title);
  checkGendre(value, gendre);
  checkContent(value, content);
  checkAuthor(value, author);

  if (findTitle(Novel, title) && id !== findTitle(Novel, title)._id)
    value.findTitle = "Title exist!";
  if (findContent(Novel, content) && id !== findContent(Novel, content)._id)
    value.findContent = "Content exist!";

  if (Object.keys(value) > 0)
    return res.status(400).json({
      message: value,
    });
  next();
};

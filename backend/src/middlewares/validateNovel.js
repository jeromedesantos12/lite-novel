// import
const {
  checkPath,
  checkTitle,
  checkGendre,
  checkContent,
  checkAuthor,
  findTitle,
  findContent,
} = require("../utils/checkNovel");

// validate create
exports.validateCreate = (Novel, removeImg, path) => async (req, res, next) => {
  const value = {};
  const { file } = req;
  const { title, gendre, content } = req.body;

  // sementara
  const author = { uid: "usr001", username: "remitokun" };

  checkPath(value, file?.path);
  checkTitle(value, title);
  checkGendre(value, gendre);
  checkContent(value, content);
  checkAuthor(value, author);

  if (await findTitle(Novel, title)) value.findTitle = "Title exist!";
  if (await findContent(Novel, content)) value.findContent = "Content exist!";

  if (Object.keys(value).length > 0) {
    await removeImg(file?.path, path);
    return res.status(400).json({
      message: value,
    });
  }
  next();
};

// validate update
exports.validateUpdate = (Novel, removeImg, path) => async (req, res, next) => {
  const value = {};
  const { file } = req;
  const { id } = req.params;
  const { title, gendre, content } = req.body;

  // sementara
  const author = { uid: "usr001", username: "remitokun" };

  checkPath(value, file?.path);
  checkTitle(value, title);
  checkGendre(value, gendre);
  checkContent(value, content);
  checkAuthor(value, author);

  if (
    (await findTitle(Novel, title)) &&
    id !== (await findTitle(Novel, title)._id)
  )
    value.findTitle = "Title exist!";
  if (
    (await findContent(Novel, content)) &&
    id !== (await findContent(Novel, content)._id)
  )
    value.findContent = "Content exist!";

  if (Object.keys(value).length > 0) {
    await removeImg(file?.path, path);
    return res.status(400).json({
      message: value,
    });
  }
  next();
};

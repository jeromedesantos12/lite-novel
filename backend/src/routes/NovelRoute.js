// export
module.exports = (mongoose, express, path, ACCESS_TOKEN_SECRET) => {
  // import
  const router = express.Router();
  const Novel = require("../models/NovelModel")(mongoose);
  const { pagination } = require("../middlewares/pagination");
  const { convertToArr } = require("../middlewares/convertToArr");
  const { imgNovel } = require("../middlewares/uploadImg");
  const { removeImg } = require("../utils/removeImg");
  const { verifyAccessToken } = require("../middlewares/verifyNgenerate");
  const {
    validateCreate,
    validateUpdate,
  } = require("../middlewares/validateNovel");
  const {
    readNovels,
    readNovelById,
    searchNovel,
    createNovel,
    updateNovel,
    deleteNovel,
  } = require("../controllers/NovelController");

  // route path
  router.get(
    "/read",
    verifyAccessToken(ACCESS_TOKEN_SECRET),
    pagination(Novel),
    readNovels(Novel)
  );
  router.get(
    "/read/:id",
    verifyAccessToken(ACCESS_TOKEN_SECRET),
    readNovelById(Novel)
  );
  router.get(
    "/search",
    verifyAccessToken(ACCESS_TOKEN_SECRET),
    searchNovel(Novel)
  );
  router.post(
    "/create",
    verifyAccessToken(ACCESS_TOKEN_SECRET),
    imgNovel,
    convertToArr,
    validateCreate(Novel, removeImg, path),
    createNovel(Novel)
  );
  router.put(
    "/update/:id",
    verifyAccessToken(ACCESS_TOKEN_SECRET),
    imgNovel,
    convertToArr,
    validateUpdate(Novel, removeImg, path),
    updateNovel(Novel, removeImg, path)
  );
  router.delete(
    "/delete/:id",
    verifyAccessToken(ACCESS_TOKEN_SECRET),
    deleteNovel(Novel, removeImg, path)
  );

  return router;
};

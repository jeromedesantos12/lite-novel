// export
module.exports = (mongoose, express, path) => {
  // import
  const router = express.Router();
  const Novel = require("../models/NovelModel")(mongoose);
  const { pagination } = require("../middlewares/pagination");
  const { convertToArr } = require("../middlewares/convertToArr");
  const { imgNovel } = require("../middlewares/uploadImg");
  const { removeImg } = require("../utils/removeImg");
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
  router.get("/read", pagination(Novel), readNovels(Novel));
  router.get("/read/:id", readNovelById(Novel));
  router.get("/search", searchNovel(Novel));
  router.post(
    "/create",
    convertToArr,
    imgNovel,
    validateCreate(Novel, removeImg, path),
    createNovel(Novel)
  );
  router.put(
    "/update/:id",
    convertToArr,
    imgNovel,
    validateUpdate(Novel, removeImg, path),
    updateNovel(Novel, removeImg, path)
  );
  router.delete("/delete/:id", deleteNovel(Novel, removeImg, path));

  return router;
};

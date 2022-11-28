// export
module.exports = (mongoose, express, path) => {
  // import
  const router = express.Router();
  const Novel = require("../models/NovelModel")(mongoose);
  const { pagination } = require("../middlewares/pagination");
  const { convertToArr } = require("../middlewares/convertToArr");
  const { uploadImg } = require("../middlewares/uploadImg");
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
  router.post("/create", uploadImg, convertToArr, createNovel(Novel));
  router.put("/update/:id", uploadImg, convertToArr, updateNovel(Novel, path));
  router.delete("/delete/:id", deleteNovel(Novel, path));

  return router;
};

// read method
exports.readNovels = (Novel) => async (req, res) => {
  try {
    const { start, limit, next, page, previous, total } = req.pagination;
    const novels = await Novel.find().skip(start).limit(limit);

    if (novels.length === 0)
      return res.status(404).json({
        message: "Novels empty!",
      });

    res.status(200).json({
      message: "Novels displayed successfully!",
      next,
      page,
      previous,
      total,
      novels,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// read by id method
exports.readNovelById = (Novel) => async (req, res) => {
  try {
    const { id } = req.params;
    const novel = await Novel.findById(id);

    if (novel === null)
      return res.status(404).json({
        message: "Novel not found!",
      });

    res.status(200).json({
      message: "Novel displayed successfully!",
      novel,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// search method
exports.searchNovel = (Novel) => async (req, res) => {
  try {
    const { keyword } = req.query;
    const result = await Novel.find({
      $or: [
        { title: { $regex: `${keyword}`, $options: "i" } },
        { gendre: { $regex: `${keyword}`, $options: "i" } },
        { author: { $regex: `${keyword}`, $options: "i" } },
      ],
    });

    if (result.length === 0)
      return res.status(404).json({
        message: "Novel not found!",
      });

    res.status(200).json({
      message: "Novel found!",
      result,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// create method
exports.createNovel = (Novel) => async (req, res) => {
  try {
    const { path } = req.file;
    const { title, gendre, content, author } = req.body;
    const created_novel = await Novel.collection.insertOne({
      image: path,
      title,
      gendre,
      content,
      author: { uid: "usr001", username: "remitokun" },
    });

    res.status(201).json({
      message: "Novel created!",
      created_novel,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// update method
exports.updateNovel = (Novel, modPath) => async (req, res) => {
  try {
    const { id } = req.params;
    const { path } = req.file;
    const { removeImg } = require("../utils/removeImg");
    const { title, gendre, content, author } = req.body;

    const novel = await Novel.findById(id, { image: "$image" });
    if (novel === null)
      return res.status(404).json({
        message: "Novel not found!",
      });

    await removeImg(novel?.image, modPath);
    const updated_novel = await Novel.updateOne(
      { _id: id },
      {
        $set: {
          image: path,
          title,
          gendre,
          content,
          author: { uid: "usr001", username: "remitokun" },
        },
      }
    );

    res.status(201).json({
      message: "Novel updated!",
      updated_novel,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// delete method
exports.deleteNovel = (Novel, modPath) => async (req, res) => {
  try {
    const { id } = req.params;
    const { removeImg } = require("../utils/removeImg");

    const novel = await Novel.findById(id, { image: "$image" });
    if (novel === null)
      return res.status(404).json({
        message: "Novel not found!",
      });

    await removeImg(novel?.image, modPath);
    const deleted_novel = await Novel.deleteOne({ _id: id });

    res.status(200).json({
      message: "Novel deleted!",
      deleted_novel,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

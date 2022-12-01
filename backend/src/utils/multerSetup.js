// import
const multer = require("multer");

// export
exports.setupNovel = (req, res) =>
  new Promise((resolve, reject) => {
    multer({
      // storage setup
      storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, "images/coverBooks"),
        filename: (req, file, cb) =>
          cb(null, `${Date.now()}_${file.originalname.replace(/\s/g, "")}`),
      }),
      // file filter setup
      fileFilter: (req, file, cb) => {
        if (!["image/png", "image/jpg", "image/jpeg"].includes(file.mimetype)) {
          cb(null, false);
          return cb(new Error("Only .png, .jpg and .jpeg allowed!"));
        }
        cb(null, true);
      },
      limits: { fileSize: 1 * 1024 * 1024 * 1024 },
    })
      // handling error
      .single("image")(req, res, (err) => {
      if (!err) resolve();
      if (err?.code === "LIMIT_FILE_SIZE") err.message = "Max file 1 GB";
      reject(err);
    });
  });

// export
exports.setupUser = (req, res) =>
  new Promise((resolve, reject) => {
    multer({
      // storage setup
      storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, "images/profilePics"),
        filename: (req, file, cb) =>
          cb(null, `${Date.now()}_${file.originalname.replace(/\s/g, "")}`),
      }),
      // file filter setup
      fileFilter: (req, file, cb) => {
        if (!["image/png", "image/jpg", "image/jpeg"].includes(file.mimetype)) {
          cb(null, false);
          return cb(new Error("Only .png, .jpg and .jpeg allowed!"));
        }
        cb(null, true);
      },
      limits: { fileSize: 1 * 1024 * 1024 * 1024 },
    })
      // handling error
      .single("image")(req, res, (err) => {
      if (!err) resolve();
      if (err?.code === "LIMIT_FILE_SIZE") err.message = "Max file 1 GB";
      reject(err);
    });
  });

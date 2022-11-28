// import
const multer = require("multer");

// export
exports.multerSetup = (req, res) =>
  new Promise((resolve, reject) => {
    multer({
      // storage setup
      storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, "images"),
        filename: (req, file, cb) =>
          cb(null, `${Date.now()}_${file.originalname.replace(/\s/g, "%20")}`),
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

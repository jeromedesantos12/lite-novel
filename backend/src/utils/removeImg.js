// import
const fs = require("fs").promises;

// export
exports.removeImg = async (filePath, path) => {
  try {
    await fs.unlink(path.join(__dirname, "../..", filePath));
  } catch (err) {
    return err;
  }
};

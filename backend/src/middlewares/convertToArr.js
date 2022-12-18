// convert req.body.gendre type "string" to "array"
exports.convertToArr = (req, res, next) => {
  req.body.gendre = req.body.gendre?.split(/[,;]/);
  next();
};

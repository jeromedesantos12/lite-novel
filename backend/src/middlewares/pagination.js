// middleware read
exports.pagination = (model) => async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const start = (page - 1) * limit;
    const end = page * limit;
    const total = await model.countDocuments();
    const pagination = { start, limit, total, page };

    if (end < total) pagination.next = page + 1;
    if (start > 0) pagination.previous = page - 1;

    req.pagination = pagination;
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
  next();
};

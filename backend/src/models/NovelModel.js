// export
module.exports = (mongoose) => {
  // db schema
  const Novel = mongoose.Schema(
    {
      image: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      gendre: {
        type: Array,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      author: {
        type: Object,
        require: true,
      },
    },
    { timestamps: true }
  );

  return mongoose.model("Novels", Novel);
};

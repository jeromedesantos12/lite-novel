// export
module.exports = (mongoose) => {
  // db schema
  const History = mongoose.Schema({
    uid: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  });

  return mongoose.model("Histories", History);
};

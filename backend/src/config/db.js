// export
module.exports = (mongoose, DB) => {
  // module setup
  mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return mongoose.connection;
};

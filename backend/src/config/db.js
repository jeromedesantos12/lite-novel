// export
module.exports = (mongoose, DB_URL) => {
  // module setup
  mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return mongoose.connection;
};

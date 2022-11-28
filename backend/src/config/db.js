// export
module.exports = (mongoose, env) => {
  // import
  const { DB } = process.env;

  // module setup
  mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return mongoose.connection;
};

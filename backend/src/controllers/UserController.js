// read method
exports.readUsers = (User) => async (req, res) => {
  try {
    const { start, limit, next, page, previous, total } = req.pagination;
    const users = await User.find(
      {},
      {
        _id: "$_id",
        image: "$image",
        name: "$name",
        username: "$username",
        email: "$email",
        role: "$role",
      }
    )
      .skip(start)
      .limit(limit);

    if (users.length === 0)
      return res.status(404).json({
        message: "Users empty!",
      });

    res.status(200).json({
      message: "Users displayed successfully!",
      next,
      page,
      previous,
      total,
      users,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// read by id method
exports.readUserById = (User) => async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id, {
      _id: "$_id",
      image: "$image",
      name: "$name",
      username: "$username",
      email: "$email",
      role: "$role",
    });

    if (user === null)
      return res.status(404).json({
        message: "User not found!",
      });

    res.status(200).json({
      message: "User displayed successfully!",
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// search method
exports.searchUser = (User) => async (req, res) => {
  try {
    const { keyword } = req.query;
    const result = await User.find(
      {
        $or: [
          { usename: { $regex: `${keyword}`, $options: "i" } },
          { email: { $regex: `${keyword}`, $options: "i" } },
          { role: { $regex: `${keyword}`, $options: "i" } },
        ],
      },
      {
        _id: "$_id",
        image: "$image",
        name: "$name",
        username: "$username",
        email: "$email",
        role: "$role",
      }
    );

    if (result.length === 0)
      return res.status(404).json({
        message: "User not found!",
      });

    res.status(200).json({
      message: "User found!",
      result,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// create method
exports.createUser = (User, hashPwd) => async (req, res) => {
  try {
    const { file } = req;
    const { name, username, email, password, role } = req.body;
    const hashedPwd = await hashPwd(password);
    const created_user = await User.collection.insertOne({
      image: file?.path,
      name,
      email,
      username,
      password: hashedPwd,
      role,
    });

    res.status(201).json({
      message: "User created!",
      created_user,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// login method
exports.loginUser = (User, comparePwd) => async (req, res) => {};

// register method
exports.registerUser = (User, hashPwd) => async (req, res) => {
  try {
    const { file } = req;
    const { name, username, email, password } = req.body;
    const hashedPwd = await hashPwd(password);
    const registered_user = await User.collection.insertOne({
      image: file?.path,
      name,
      email,
      username,
      password: hashedPwd,
      role: "usr",
    });

    res.status(201).json({
      message: "User registered!",
      registered_user,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// update method
exports.updateUser = (User) => async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const user = await User.findById(id, { role: "$role" });

    if (user === null)
      return res.status(404).json({
        message: "User not found!",
      });

    const updated_user = await User.updateOne({ _id: id }, { role });

    res.status(200).json({
      message: "User updated!",
      updated_user,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// setting method
exports.profileUser = (User, hashPwd, removeImg, path) => async (req, res) => {
  try {
    const { file } = req;
    const { id } = req.params;
    const { name, username, email, password } = req.body;
    const user = await User.findById(id, { image: "$image" });

    if (user === null)
      return res.status(404).json({
        message: "User not found!",
      });

    await removeImg(user?.image, path);
    const profiled_user = await User.updateOne(
      { _id: id },
      {
        image: file?.path,
        name,
        email,
        username,
        password: await hashPwd(password),
      }
    );

    res.status(200).json({
      message: "User profiled!",
      profiled_user,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// delete method
exports.deleteUser = (User, removeImg, path) => async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id, { image: "$image" });

    if (user === null)
      return res.status(404).json({
        message: "User not found!",
      });

    await removeImg(user?.image, path);
    const deleted_user = await User.deleteOne({ _id: id });

    res.status(200).json({
      message: "User deleted!",
      deleted_user,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

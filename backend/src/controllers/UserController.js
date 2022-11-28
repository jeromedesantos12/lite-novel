// read method
exports.readUsers = (User) => async (req, res) => {
  try {
    const { start, limit, next, page, previous, total } = req.pagination;
    const users = await User.find(
      {},
      {
        _id: "$_id",
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
    const { name, username, email, password, role } = req.body;
    const hashedPwd = await hashPwd(password);
    const created_user = await User.collection.insertOne({
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
    const { name, username, email, password } = req.body;
    const hashedPwd = await hashPwd(password);
    const registered_user = await User.collection.insertOne({
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
    const updated_user = await User.UpdateOne({ _id: id }, { role });

    if (updated_user.matchedtotal === 0)
      return res.status(404).json({
        message: "User not found!",
      });
    if (updated_user.modifiedtotal === 0)
      return res.status(400).json({
        message: "User still same!",
      });

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
exports.profileUser = (User) => async (req, res) => {
  try {
    const { id } = req.params;
    const { name, username, email, password } = req.body;
    const hashedPwd = await hashPwd(password);
    const profiled_user = await User.UpdateOne(
      { _id: id },
      { name, email, username, password: hashedPwd }
    );

    if (profiled_user.matchedtotal === 0)
      return res.status(404).json({
        message: "User not found!",
      });
    if (profiled_user.modifiedtotal === 0)
      return res.status(400).json({
        message: "User still same!",
      });

    res.status(200).json({
      message: "User updated!",
      profiled_user,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// delete method
exports.deleteUser = (User) => async (req, res) => {
  try {
    const { id } = req.params;
    const deleted_user = await User.deleteOne({ _id: id });

    if (deleted_user.deletedCount === 0)
      return res.status(404).json({
        message: "User not found!",
      });

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

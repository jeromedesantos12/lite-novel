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

// login method
exports.loginUser =
  (
    User,
    History,
    comparePwd,
    generateAccessToken,
    generateRefreshToken,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET
  ) =>
  async (req, res) => {
    try {
      const { user, password } = req.body;

      const userLog = await User.findOne({
        $or: [{ username: user }, { email: user }],
      });

      if (userLog.length === 0)
        return res.status(404).json({
          message: "User not found!",
        });

      const comparedPwd = await comparePwd(password, userLog?.password);

      if (!comparedPwd)
        return res.status(404).json({
          message: "Wrong password!",
        });

      const accessToken = generateAccessToken(
        userLog._id,
        userLog.role,
        ACCESS_TOKEN_SECRET
      );
      const refreshToken = generateRefreshToken(
        userLog._id,
        userLog.role,
        REFRESH_TOKEN_SECRET
      );

      const created_log = await History.collection.insertOne({
        uid: String(userLog._id),
        token: refreshToken,
      });

      // req.session = null;
      res
        .cookie("accessToken", accessToken, {
          httpOnly: true,
          maxAge: 60 * 1000,
        })
        .status(200)
        .json({
          message: "Login suceess!",
          created_log,
        });
    } catch {
      res.status(500).json({
        message: err.message,
      });
    }
  };

exports.logoutUser = (History) => async (req, res) => {
  try {
    const { user } = req;

    // req.session = null
    const deleted_log = await History.deleteOne({ uid: user?.id });

    res.clearCookie("accessToken").status(200).json({
      message: "Logout suceess!",
      deleted_log,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

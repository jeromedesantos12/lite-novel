// import
const jwt = require("jsonwebtoken");

// verify access token on after login
exports.verifyAccessToken = (key) => (req, res, next) => {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      return res.status(401).json({
        message: "User not authorize!",
      });
    }
    const user = jwt.verify(accessToken, key);
    req.user = user;
  } catch (err) {
    if (
      [
        "invalid token",
        "invalid signature",
        "jwt malformed",
        "jwt signature is required",
      ].includes(err.message)
    ) {
      return res.status(403).json({
        message: "User invalid!",
      });
    }
    if (err.message === "jwt expired") {
      return res.status(403).json({
        message: "Login expired!",
      });
    }
    return res.status(500).json({
      message: err.message,
    });
  }
  next();
};

// generate access token on login
exports.generateAccessToken = (id, role, key) =>
  jwt.sign({ id, role }, key, { expiresIn: "5s" });

// generate refresh token on login
exports.generateRefreshToken = (id, role, key) =>
  jwt.sign({ id, role }, key, { expiresIn: "1h" });

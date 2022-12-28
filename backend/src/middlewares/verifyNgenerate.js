// import
const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");

// verify jwt on blocked route
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

// generate jwt on login
exports.generateAccessToken = (id, role, key) =>
  jwt.sign({ id, role }, key, {
    expiresIn: "1h",
  });

exports.generateRefreshToken = (id, role, key) =>
  jwt.sign({ id, role }, key, {
    expiresIn: "1d",
  });

exports.decodeToken = (token) => jwtDecode(token);

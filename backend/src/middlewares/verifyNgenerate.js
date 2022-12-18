// import
const jwt = require("jsonwebtoken");

// verify jwt on blocked route
exports.verifyAccessToken = (ACCESS_TOKEN_SECRET) => (req, res, next) => {
  try {
    const accessToken = req.cookies.token;
    if (!accessToken) {
      return res.status(401).json({
        message: "User not authorize!",
      });
    }
    const user = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
    req.user = user;
  } catch (err) {
    console.log(err);
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
exports.generateAccessToken = (id, role, ACCESS_TOKEN_SECRET) => {
  return jwt.sign({ id, role }, ACCESS_TOKEN_SECRET, {
    expiresIn: "1m",
  });
};

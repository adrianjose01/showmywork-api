const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      throw new Error("Not Authenticated.");
    }
    const token = authHeader;
    let decoudedToken = jwt.verify(token, "secretsecret");
    if (!decoudedToken) {
      throw new Error("Not Authenticated.");
    }
    req.userId = decoudedToken.userId;
    next();
  } catch (err) {
    console.log(err);
    res.status(403).json({ message: err.message });
  }
};

const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).send("Unauthorized");
  }
  jwt.verify(token, "my_secret_key", (err, user) => {
    if (err) {
      return res.status(403).send("Invalid user", err);
    }
    req.user = user;
    next();
  });
};

module.exports = authenticate;
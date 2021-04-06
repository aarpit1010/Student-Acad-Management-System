const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const admintoken = req.header("admin-auth-token");
  if (!admintoken) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(admintoken, process.env.TOKEN_SECRET);
    // console.log("check here");
    req.password = verified;
    next();
  } catch (err) {
    res.status(403).send("Invalid Token");
  }
};
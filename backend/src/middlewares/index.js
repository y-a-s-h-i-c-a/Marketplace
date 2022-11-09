const { sign, verify } = require("jsonwebtoken");
const User = require("../models/user.model");

const createTokens = (user) => {
  const accessToken = sign(
    { email: user.email, _id: user._id },
    process.env.SECRET_KEY,
  );

  return accessToken;
};

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization)
    return res.status(400).json({ error: "User not Authenticated!" });

  const accessToken = authorization.replace("Bearer ", "");
  verify(accessToken, process.env.SECRET_KEY, (err, payload) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    req.authenticated = true;
    const { _id } = payload;
    User.findById(_id).then((userData) => {
      req.user = userData;
      next();
    });
  });
};
module.exports = { createTokens, validateToken };

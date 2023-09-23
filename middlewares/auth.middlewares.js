const { decode } = require("jsonwebtoken");

const authorizeUser = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader)
      return res.status(401).json({ msg: "please add authorization header" });

    const decodeJWT = decode(authorizationHeader);
    const userId = decodeJWT.sub;

    req.userId = userId;
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = { authorizeUser };

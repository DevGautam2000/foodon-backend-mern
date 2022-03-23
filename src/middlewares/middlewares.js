const jwt = require("jsonwebtoken");

exports.middlewares = {
  requireSignin: (req, _, next) => {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      const _user = jwt.verify(token, process.env.FOODON_SECRET);
      req.user = _user;
    }
    next();
  },

  userMiddleware: (req, res, next) => {
    if (req.user.role !== "user") {
      return res.status(400).json({ message: "User access denied" });
    }
    next();
  },
};

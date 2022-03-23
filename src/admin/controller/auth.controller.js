const User = require("../../models/user.model");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user)
        return res.status(200).json({
          message: "User already exists.",
        });

      const { firstName, lastName, email, password } = req.body;
      const _user = new User({
        firstName,
        lastName,
        email,
        password,
        role: "admin",
      });

      _user
        .save()
        .then((_) =>
          res.status(200).json({ message: "Admin created successfully." })
        )
        .catch((_) =>
          res.status(400).json({ message: "Something went wrong." })
        );
    })
    .catch((_) =>
      res.status(400).json({
        messsage: "User not found.",
      })
    );
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.authenticate(req.body.password) && user.role === "admin") {
        //return a token to start and manage a session
        const token = jwt.sign({ _id: user.id }, process.env.FOODON_SECRET, {
          expiresIn: "1h",
        });

        const { _id, firstName, lastName, role, email, fullname } = user;

        res.status(200).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            role,
            email,
            fullname,
          },
        });
      } else {
        res.status(400).json({ message: "Invalid password." });
      }
    })
    .catch((_) => res.status(400).json({ message: "User not found." }));
};

exports.requireSignin = (req, _, next) => {
  const token = req.headers.authorization.split(" ")[1];

  const _user = jwt.verify(token, process.env.FOODON_SECRET);
  req.user = _user;
  next();
};

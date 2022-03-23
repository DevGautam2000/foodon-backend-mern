const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const generateJwtToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.FOODON_SECRET, {
    expiresIn: "1d",
  });
};

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user)
        return res.status(400).json({
          message: "User already exists.",
        });

      const { firstName, lastName, email, password } = req.body;
      const _user = new User({
        firstName,
        lastName,
        email,
        password,
      });

      _user
        .save()
        .then((user) => {
          const token = generateJwtToken(user._id, user.role);
          const { _id, firstName, lastName, email, role, fullName } = user;
          return res.status(200).json({
            token,
            message: "User created successfully.",
            user: { _id, firstName, lastName, email, role, fullName },
          });
        })
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
      if (user.authenticate(req.body.password) && user.role === "user") {
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
        res.status(400).json({ message: "Invalid password or username." });
      }
    })
    .catch((_) => res.status(400).json({ message: "User not found." }));
};

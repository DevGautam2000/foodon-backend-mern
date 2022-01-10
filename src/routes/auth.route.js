const express = require("express");
const {
  signup,
  signin,
  requireSignin,
} = require("../controllers/auth.controller");
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);

// protected routes
router.post("/profile", requireSignin, (req, res) => {
  res.status(200).json({ message: "User profile." });
});

module.exports = router;

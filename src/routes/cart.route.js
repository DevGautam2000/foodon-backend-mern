const express = require("express");
const {
  addItemToCart,
  getCartItems,
  removeCartItems,
} = require("../controllers/cart.controller.js");

const router = express.Router();
const {
  middlewares: { requireSignin },
} = require("../middlewares/middlewares");

router.post("/add", requireSignin, addItemToCart);

router.post("/get", requireSignin, getCartItems);
//new update
router.post("/remove", requireSignin, removeCartItems);

module.exports = router;

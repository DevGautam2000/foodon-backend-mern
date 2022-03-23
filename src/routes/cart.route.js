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

router.post("/user/cart/addtocart", requireSignin, addItemToCart);

router.post("/user/getCartItems", requireSignin, getCartItems);
//new update
router.post("/user/cart/removeItem", requireSignin, removeCartItems);

module.exports = router;

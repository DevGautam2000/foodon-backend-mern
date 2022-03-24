const express = require("express");
const {
  addItemToOrders,
  getOrders,
  removeOrder,
} = require("../controllers/order.controller.js");

const router = express.Router();
const {
  middlewares: { requireSignin },
} = require("../middlewares/middlewares");

router.post("/add", requireSignin, addItemToOrders);

router.post("/get", requireSignin, getOrders);
//new update
router.post("/remove", requireSignin, removeOrder);

module.exports = router;

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orderedItems: [
      {
        orderId: { type: String, required: true, ref: "Order" },
        product: {
          type: Array,
          ref: "Product",
          required: true,
        },
        timeStamp: { type: String, required: true, ref: "TimeStamp" },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("orders", orderSchema);

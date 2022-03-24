const express = require("express");
require("dotenv").config();
require("./src/database/index.db");
const authRouter = require("./src/routes/auth.route");
const adminRouter = require("./src/admin/route/auth.route");
const productsRouter = require("./src/routes/products.route");
const cartRouter = require("./src/routes/cart.route");
const orderRouter = require("./src/routes/order.route");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8080;

app.get("/", (_, res) => {
  res.status(200).send("server running at port: " + port);
});

app.post("/data", (req, res) => {
  const { name } = req.body;

  res.status(200).json({
    message: "posted successfully",
    name,
  });
});

app.use("/api", authRouter);
app.use("/api", adminRouter);
app.use("/api", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.listen(port, () => {
  console.log("server running at port: " + port);
});

//

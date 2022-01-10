const express = require("express");
require("dotenv").config();
require("./database/index.db");
const authRouter = require("./routes/auth.route");
const adminRouter = require("./admin/route/auth.route");

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/", (req, res, next) => {
  res.status(200).send("server running at port: " + port);
});

app.post("/data", (req, res, next) => {
  const { name } = req.body;

  res.status(200).json({
    message: "posted successfully",
    name,
  });
});

app.use("/api", authRouter);
app.use("/api", adminRouter);

app.listen(port, () => {
  console.log("server running at port: " + port);
});

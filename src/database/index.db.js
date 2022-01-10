const mongoose = require("mongoose");
const { MONGODB, DATABASE } = process.env;
const mongoURL = `${MONGODB}${DATABASE}`;

mongoose.connect(mongoURL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("db connection success");
});
db.on("error", () => {
  console.log("db connection failure");
});

module.exports = db;

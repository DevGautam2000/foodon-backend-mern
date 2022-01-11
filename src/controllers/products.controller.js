const { db, products } = require("../database/index.db");

exports.getProducts = (req, res) => {
  products
    .find()
    .toArray()
    .then((data) => {
      res.status(200).json({ products: data });
    });
};

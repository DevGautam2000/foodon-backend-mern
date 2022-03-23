const { products } = require("../database/index.db");

exports.getProducts = (_, res) => {
  products
    .find()
    .toArray()
    .then((data) => {
      res.status(200).json({ products: data });
    });
};

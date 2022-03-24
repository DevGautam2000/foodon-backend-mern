const Order = require("../models/order.model.js");

function runUpdate(condition, updateData) {
  return new Promise((resolve, reject) => {
    Order.findOneAndUpdate(condition, updateData, { upsert: true })
      .then((_) => resolve())
      .catch((err) => reject(err));
  });
}

exports.addItemToOrders = (req, res) => {
  Order.findOne({ user: req.user._id }).exec((error, order) => {
    if (error) return res.status(400).json({ error });
    if (order) {
      //if cart already exists then update cart by quantity
      let promiseArray = [];

      req.body.orderedItems.forEach((orderedItem) => {
        const product = orderedItem.product;
        const item = order.orderedItems.find((c) => c.product == product);
        let condition, update;
        if (item) {
          condition = { user: req.user._id, "orderedItems.product": product };
          update = {
            $set: {
              "orderedItems.$": orderedItem,
            },
          };
        } else {
          condition = { user: req.user._id };
          update = {
            $push: {
              orderedItems: orderedItem,
            },
          };
        }
        promiseArray.push(runUpdate(condition, update));
        //Cart.findOneAndUpdate(condition, update, { new: true }).exec();
        // .exec((error, _cart) => {
        //     if(error) return res.status(400).json({ error });
        //     if(_cart){
        //         //return res.status(201).json({ cart: _cart });
        //         updateCount++;
        //     }
        // })
      });
      Promise.all(promiseArray)
        .then((response) => res.status(201).json({ response }))
        .catch((error) => res.status(400).json({ error }));
    } else {
      //if cart not exist then create a new cart
      const order = new Order({
        user: req.user._id,
        orderedItems: req.body.orderedItems,
      });
      order.save((error, order) => {
        if (error) return res.status(400).json({ error });
        if (order) {
          return res.status(201).json({ order });
        }
      });
    }
  });
};

// exports.addToCart = (req, res) => {
//     const { cartItems } = req.body;
//     if(cartItems){
//        if(Object.keys(cartItems).length > 0){
//            Cart.findOneAndUpdate({
//                "user": req.user._id
//            }, {
//                "cartItems": cartItems
//            }, {
//                 upsert: true, new: true, setDefaultsOnInsert: true
//            }, (error, cartItems) => {
//                if(error) return res.status(400).json({ error });
//                if(cartItems) res.status(201).json({ message: 'Added Successfully' });
//            })
//        }
//        //res.status(201).json({ cartItems });
//     }else{
//         //res.status(201).json({ req });
//     }
// }

exports.getOrders = (req, res) => {
  const userId = req.user?._id;
  if (userId) {
    Order.findOne({ user: userId })
      // .populate("cartItems.product", "_id name price")
      .exec((error, order) => {
        if (order) {
          res.status(200).json({ orderedItems: order.orderedItems });
        } else return res.status(200).json({ orderedItems: {} });
      });
  } else return res.status(200).json({ orderedItems: {} });
};

// new update remove order items
exports.removeOrder = (req, res) => {
  const orderId = req.body.payload;
  if (orderId) {
    Order.updateOne(
      { user: req.user._id },
      { $pull: { orderedItems: { orderId: orderId } } }
    ).exec((error, result) => {
      if (error)
        return res
          .status(400)
          .json({ message: "invalid operation for database" });
      if (result) {
        res.status(202).json({ result });
      }
    });

    // ----------------

    // let newCart;
    // Cart.findOne({ user: req.user._id })
    //   .then(({ cartItems }) => {
    //     newCart = cartItems.filter(
    //       (item) => item.product._id !== product
    //     );
    //     console.log(newCart);
    //     res.status(202).json({ msg: "kuhcbhi" });
    //   })
    //   .catch((err) => res.status(400).json({ err: "error aaya hai bc" }));
    // if(newCart){
    //   Cart.
    // }
  }
};

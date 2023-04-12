var express = require("express");
var router = express.Router();
const Cart = require("../model/cart");
const Trip = require("../model/trip");
require("../model/connection");

router.get("/allNonBooked", function (req, res) {
  Cart.find({ isBooked: false }).then((data) =>
    res.json({ result: true, carts: data })
  );
});

router.post("/new", function (req, res) {
  const { arrival, departure, time, price } = req.body;
  const newCart = new Cart({
    departure: departure,
    arrival: arrival,
    time: time,
    price: price,
    isBooked: false,
  });
  newCart.save().then((data) => {
    res.json({ result: true, id: newCart._id });
  });
});

// router.put("/book/:id", function (req, res) {
// //   Cart.findByIdAndUpdate(req.params.id, { isBooked: true }).then((data) =>
//     res.json({ result: true, isBooked: data.isBooked })
//   );
// });

router.post("/book", async function (req, res) {
  console.log("=============== router.post(/book");
  for (let id of req.body.ids) {
    console.log("   update id : ", id);
    const result = await Cart.findByIdAndUpdate(id, { isBooked: true });
    console.log("Result of delete : ", result);

    res.json({ result: true });
  }
});

router.delete("/delete/:id", (req, res) => {
  console.log("About to DELETE Cart " + req.params.id);
  Cart.deleteOne({ _id: req.params.id })
    .then((deletedCart) => {
      console.log("AFTER DELETE ONE ", deletedCart);
      if (deletedCart.deletedCount === 0) {
        res.json({ result: false, error: "Cart not found" });
        return;
      }
      res.json({ result: true, cart: deletedCart });
    })
    .catch((error) => console.error(error));
});

module.exports = router;

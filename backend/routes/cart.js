var express = require("express");
var router = express.Router();
const Cart = require("../model/cart");
const Trip = require("../model/trip");
require("../model/connection");

router.post("/new", function (req, res) {
  const { arrival, departure, date, price } = req.body;
  const newCart = new Cart({
    departure: departure,
    arrival: arrival,
    date: date,
    price: price,
    isBooked: false,
  });
  newCart.save().then((data) => {
    res.json({ result: true, id: newCart._id });
  });
});

router.put('/book/:id', function (req, res) {
    Cart.findByIdAndUpdate(req.params.id, {isBooked: true})
    .then(data => res.json({result: true, isBooked: data.isBooked}))
})

module.exports = router;

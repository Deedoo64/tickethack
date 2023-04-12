const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  departure: String,
  arrival: String,
  time: String,
  price: Number,
  isBooked: Boolean,
});

const Cart = mongoose.model("carts", cartSchema);

module.exports = Cart;

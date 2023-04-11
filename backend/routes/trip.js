var express = require("express");
var router = express.Router();
const Trip = require("../model/trip");
require("../model/connection");

// recherche trip par departure, arrival et date
router.post("/", function (req, res) {
  const { arrival, departure, date } = req.body;

  if (
    arrival === undefined ||
    arrival === "" ||
    departure === "undefined" ||
    departure === "" ||
    date === "undefined" ||
    date === ""
  ) {
    res.json({ result: false, error: "Missing parameters." });
    return;
  }

  const startDate = new Date(req.body.date);
  const endDate = new Date(startDate.getTime() + 86400000);

  Trip.find({
    departure: { $regex: new RegExp(req.body.departure, "i") },
    arrival: { $regex: new RegExp(req.body.arrival, "i") },
    date: { $gte: startDate, $lt: endDate },
  }).then((data) => res.json({ result: true, trips: data }));
});

module.exports = router;

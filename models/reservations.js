const mongoose = require("mongoose");
// const User = require("./user");

const reservationsSchema = new mongoose.Schema({
  bookedDates: {
    type: [Date],
  },
});

const Reservations = mongoose.model("Reservations", reservationsSchema);

module.exports = Reservations;

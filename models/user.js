const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  surname: {
    type: String,
    required: true,
    unique: true,
  },
  reservationDate: {
    type: Date,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

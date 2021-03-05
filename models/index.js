const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/reservations", {
  keepAlive: true,
});

module.exports.User = require("./user");

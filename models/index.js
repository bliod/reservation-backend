const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/reseration", {
  keepAlive: true,
});

module.exports.User = require("./user");
module.exports.Reservations = require("./reservations");

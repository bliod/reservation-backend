const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/error");
const reservationRoutes = require('./routes/reservations')
const PORT = 8081;

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors());
app.use('/rest/v1', reservationRoutes)

app.use(function (req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, function () {
  console.log(`Server is starting on port ${PORT}`);
});

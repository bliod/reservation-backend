const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./models");
const errorHandler = require("./handlers/error");
const PORT = 8081;

app.use(bodyParser.json());
app.use(cors());

app.get("/rest/v1/reservation", async (req, res) => {
  try {
    let user = await db.User.create({
      name: "Karolis",
      surname: "Bliodnieks",
      reservationDate: new Date(),
    });
  } catch (error) {
    console.log(error);
  }

  res.send("valio!");
});

app.use(function (req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, function () {
  console.log(`Server is starting on port ${PORT}`);
});

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./models");
const errorHandler = require("./handlers/error");
const PORT = 8081;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

// parse application/json
app.use(bodyParser.json());
app.use(cors());

app.get("/", async (req, res) => {
  try {
    // let user = await db.User.create({
    //   name: "Karolis",
    //   surname: "Bliodnieks",
    //   reservations: new Date(),
    // });
    // let usera = await db.User.create({
    //   name: "Karolis1",
    //   surname: "Bliodnieks2",
    //   reservations: new Date(),
    // });
    let useraq = await db.User.create({
      name: "Karolis2",
      surname: "Bliodnieks1",
      reservations: new Date(),
    });
    // let reservation = await db.Reservation.create({
    //   bookedDates: "date",
    // });
  } catch (error) {
    console.log(error);
  }
});

app.get("/rest/v1/reservation", async (req, res) => {
  res.json("valio!");
});

app.post("/rest/v1/reservation/create", async (req, res) => {
  console.log(req.body);
  const data = req.body;
  let user = await db.User.create({
    name: data.name,
    surname: data.surname,
    reservations: data.date,
  });
  res.json("valio!");
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

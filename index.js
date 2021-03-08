const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./models");
const errorHandler = require("./handlers/error");
const User = require("./models/user");
const PORT = 8081;

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors());

//define function to get dates week number
Date.prototype.getWeek = function () {
  var onejan = new Date(this.getFullYear(), 0, 1);
  var today = new Date(this.getFullYear(), this.getMonth(), this.getDate());
  var dayOfYear = (today - onejan + 86400000) / 86400000;
  return Math.ceil(dayOfYear / 7);
};

app.get("/rest/v1/reservation", async (req, res) => {
  try {
    const allReservations = await User.find().distinct("reservations");
    res.status(200);
    res.json(allReservations);
  } catch (error) {
    next(error);
  }
});

app.post("/rest/v1/reservation/create", async (req, res, next) => {
  const data = req.body;
  try {
    const isUserExist = await User.find({
      name: data.name,
      surname: data.surname,
    });

    if (isUserExist.length > 0) {
      const reservations = isUserExist[0].reservations;
      const weeks = reservations.map((el) => el.getWeek());
      let reqWeek = new Date(data.date).getWeek();
      let isSameWeek = weeks.some((el) => el === reqWeek);
      if (isSameWeek) {
        throw new Error(
          "Sorry, you already have reservation this week. Please select other week"
        );
      }
      let user = await db.User.updateOne(
        {
          name: data.name,
          surname: data.surname,
        },
        { $push: { reservations: data.date } }
      );
    } else {
      let user = await db.User.create({
        name: data.name,
        surname: data.surname,
        reservations: data.date,
      });
    }
    res.status(201);
    res.json("Reservation comfirmed!");
  } catch (error) {
    console.log(error);
    next(error);
  }
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

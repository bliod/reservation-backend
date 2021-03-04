const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./models");
const errorHandler = require("./handlers/error");
const User = require("./models/user");
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
  const arr = await User.find().distinct("reservations");

  console.log(arr);

  res.json(arr);
});

app.post("/rest/v1/reservation/create", async (req, res, next) => {
  console.log(req.body);
  const data = req.body;
  try {
    const isUserExist = await User.find({
      name: data.name,
      surname: data.surname,
    });
    console.log(isUserExist, "user");
    if (isUserExist.length > 0) {
      if (isUserExist[0].reservations.length < 2) {
        let user = await db.User.updateOne(
          {
            name: data.name,
            surname: data.surname,
          },
          { $push: { reservations: data.date } }
        );
      } else {
        throw new Error("you can only have 2");
      }
    } else {
      let user = await db.User.create({
        name: data.name,
        surname: data.surname,
        reservations: data.date,
      });
    }
  } catch (error) {
    console.log(error);
  }

  res.status(201);
  res.json("valio!");
});

app.get("/error", (req, res) => {
  chicken.thro();
});

// app.use(function (req, res, next) {
//   let err = new Error("Not Found");
//   err.status = 404;
//   next(err);
// });

// app.use(errorHandler);

app.listen(PORT, function () {
  console.log(`Server is starting on port ${PORT}`);
});

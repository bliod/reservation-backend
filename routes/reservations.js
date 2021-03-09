const express = require("express");
const router = express.Router();
const db = require("../models");
const User = require("../models/user");
const checkIsSameWeek = require('../utils/reservation')

router.get("/reservation", async (req, res) => {
    try {
        const allReservations = await User.find().distinct("reservations");
        res.status(200);
        res.json(allReservations);
    } catch (error) {
        next(error);
    }
});

router.post("/reservation/create", async (req, res, next) => {
    const data = req.body;
    try {
        const isUserExist = await User.find({
            name: data.name,
            surname: data.surname,
        });

        if (isUserExist.length > 0) {
            const isSameWeek = checkIsSameWeek(isUserExist, data.date);
            if (isSameWeek) {
                throw new Error(
                    "Sorry, you already have reservation this week. Please select other week"
                );
            }
            await db.User.updateOne(
                {
                    name: data.name,
                    surname: data.surname,
                },
                { $push: { reservations: data.date } }
            );
        } else {
            await db.User.create({
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

module.exports = router;
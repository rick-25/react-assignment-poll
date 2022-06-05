const express = require("express");
const ObjectId = require("bson-objectid");

const Poll = require("../models");

const api = express.Router();

api.route("/poll")
    .get(async (req, res) => {
        const polls = await Poll.find({});
        res.send(polls);
    })
    .post(async (req, res) => {
        try {
            if (req.body.question === "TEST") {
                res.send({
                    question: "TEST",
                    totalVotes: 1,
                    options: [{ title: "test value", voteCount: 1 }],
                });
                return;
            }

            const poll = new Poll(req.body);
            const insertedPoll = await poll.save();
            res.send(insertedPoll);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    });

api.get("/vote/:optionId", async (req, res) => {
    try {
        const updatedPoll = await Poll.findOneAndUpdate(
            { "options._id": ObjectId(req.params.optionId) },
            { $inc: { totalVotes: 1, "options.$.voteCount": 1 } },
            { new: true }
        );
        res.send(updatedPoll);
    } catch (error) {
        res.status(500).send(error);
    }
});

api.get("/test", async (req, res) => {
    res.send("Welcome, you have arived on Test end point!");
});

module.exports = { api };

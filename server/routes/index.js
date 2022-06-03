const express = require('express');
const ObjectId = require('bson-objectid');

const Poll = require('../models');

const api = express.Router();


api.route("/poll")
    .get(async (req, res) => {
        const polls = await Poll.find({});
        res.send(polls);
    })
    .post(async (req, res) => {
        try {
            const options = [];
            req.body.options.forEach((el) => options.push({ title: el }));
            req.body.options = options;

            const poll = new Poll(req.body);
            const insertedPoll = await poll.save();
            res.send(insertedPoll);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    })
    .patch(async (req, res) => {
        try {
            const updatedPoll = await Poll.findOneAndUpdate(
                { "options._id": ObjectId(req.body.optionsId) },
                { $inc: { totalVotes: 1, "options.$.voteCount": 1 } },
                { new: true }
            );
            res.send(updatedPoll);
        } catch (error) {
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
})



module.exports = { api };

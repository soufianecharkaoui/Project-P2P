const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const cors = require('./cors');

const Room = require('../models/room');

const chatRouter = express.Router();

chatRouter.use(bodyParser.json());

chatRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => {
        res.sendStatus(200);
    })
    .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
        Room.findOne({room: req.body.room})
            .populate('messages.user')
            .then((room) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(room);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Room.findOne({room: req.body.room})
            .then((room) => {
                if (room) {
                    room.save()
                        .then((room) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(room);
                        }, (err) => next(err));
                } else {
                    Room.create({"room": req.body.room, "messages": [req.body.message]})
                        .then((room) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(room);
                        }, (err) => next(err));
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = chatRouter;
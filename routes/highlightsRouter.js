<<<<<<< HEAD
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Highlights = require('../models/highlights');
var Verify = require('./verify');

var highlightsRouter = express.Router();
highlightsRouter.use(bodyParser.json());

highlightsRouter.route('/')
.get(function (req, res, next) {
    Highlights.find(req.query, function (err, feature) {
        if (err) next(err);
        res.json(feature[0]);
    });
})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Highlights.create(req.body, function (err, feature) {
        if (err) next(err);
        console.log('feature created!');
        var id = feature._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the feature with id: ' + id);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Highlights.remove({}, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});



=======
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Highlights = require('../models/highlights');
var Verify = require('./verify');

var highlightsRouter = express.Router();
highlightsRouter.use(bodyParser.json());

highlightsRouter.route('/')
.get(function (req, res, next) {
    Highlights.find(req.query, function (err, feature) {
        if (err) next(err);
        res.json(feature[0]);
    });
})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Highlights.create(req.body, function (err, feature) {
        if (err) next(err);
        console.log('feature created!');
        var id = feature._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the feature with id: ' + id);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Highlights.remove({}, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});



>>>>>>> aed2a748081fb537e44191336086bcba4e945cbb
module.exports = highlightsRouter;
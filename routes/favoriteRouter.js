<<<<<<< HEAD
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Favorites = require('../models/favorites');
var Verify = require('./verify');

var favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());





favoriteRouter.route('/')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
	
	Favorites.find({postedBy: req.decoded._id})
        .populate('postedBy')
		.populate('projects')
        .exec(function (err, favorite) {
        if (err) next(err);
		
        res.json(favorite[0]);
    });
	
})

.post(Verify.verifyOrdinaryUser, function (req, res, next) {
	
	Favorites.find({postedBy: req.decoded._id}, function (err, fav) {
        if (err) next(err);
		if (fav.length == 0) {
			
			var favObj = {
				postedBy: req.decoded._id,
				projects:[req.body._id]
			};
			Favorites.create(favObj, function (err, favorite) {
				if (err) next(err);
				console.log('Favorite created!');
				var id = favorite._id;

				res.writeHead(200, {
					'Content-Type': 'text/plain'
				});
				res.end('Added the favorite with id: ' + id);
			});
			
		}
		else {
			var projectArray = fav[0].projects;
			projectArray.push(req.body._id);
			
			Favorites.findByIdAndUpdate(fav[0]._id, {
				$set: {projects :  projectArray}
			}, {
				new: true
			}, function (err, updatedFav) {
				if (err) next(err);
				res.json(updatedFav);
			});
		}
    });
	
    
})

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    Favorites.remove({postedBy: req.decoded._id}, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});

favoriteRouter.route('/:projectObjectId')

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    Favorites.find({postedBy: req.decoded._id}, function (err, fav) {
        if (err) next(err);
		if (fav.length > 0) {
			
			var projectArray = fav[0].projects;
			projectArray.remove(req.params.projectObjectId);
			
			Favorites.findByIdAndUpdate(fav[0]._id, {
				$set: {projects :  projectArray}
			}, {
				new: true
			}, function (err, updatedFav) {
				if (err) next(err);
				res.json(updatedFav);
			});
			
		}
		
    });
});

=======
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Favorites = require('../models/favorites');
var Verify = require('./verify');

var favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());





favoriteRouter.route('/')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
	
	Favorites.find({postedBy: req.decoded._id})
        .populate('postedBy')
		.populate('projects')
        .exec(function (err, favorite) {
        if (err) next(err);
		
        res.json(favorite[0]);
    });
	
})

.post(Verify.verifyOrdinaryUser, function (req, res, next) {
	
	Favorites.find({postedBy: req.decoded._id}, function (err, fav) {
        if (err) next(err);
		if (fav.length == 0) {
			
			var favObj = {
				postedBy: req.decoded._id,
				projects:[req.body._id]
			};
			Favorites.create(favObj, function (err, favorite) {
				if (err) next(err);
				console.log('Favorite created!');
				var id = favorite._id;

				res.writeHead(200, {
					'Content-Type': 'text/plain'
				});
				res.end('Added the favorite with id: ' + id);
			});
			
		}
		else {
			var projectArray = fav[0].projects;
			projectArray.push(req.body._id);
			
			Favorites.findByIdAndUpdate(fav[0]._id, {
				$set: {projects :  projectArray}
			}, {
				new: true
			}, function (err, updatedFav) {
				if (err) next(err);
				res.json(updatedFav);
			});
		}
    });
	
    
})

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    Favorites.remove({postedBy: req.decoded._id}, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});

favoriteRouter.route('/:projectObjectId')

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    Favorites.find({postedBy: req.decoded._id}, function (err, fav) {
        if (err) next(err);
		if (fav.length > 0) {
			
			var projectArray = fav[0].projects;
			projectArray.remove(req.params.projectObjectId);
			
			Favorites.findByIdAndUpdate(fav[0]._id, {
				$set: {projects :  projectArray}
			}, {
				new: true
			}, function (err, updatedFav) {
				if (err) next(err);
				res.json(updatedFav);
			});
			
		}
		
    });
});

>>>>>>> aed2a748081fb537e44191336086bcba4e945cbb
module.exports = favoriteRouter;
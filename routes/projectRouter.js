var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Projects = require('../models/projects');
var Verify = require('./verify');

var projectRouter = express.Router();
projectRouter.use(bodyParser.json());

projectRouter.route('/')
.get(function (req, res, next) {
    Projects.find(req.query)
        .populate('comments.postedBy')
        .exec(function (err, project) {
        if (err) next(err);
        res.json(project);
    });
})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
	
    Projects.create(req.body, function (err, project) {
        if (err) next(err);
        console.log('Project created!');
        var id = project._id;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.end('Added the project with id: ' + id);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Projects.remove({}, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});

projectRouter.route('/:projectId')
.get(function (req, res, next) {
    Projects.findById(req.params.projectId)
        .populate('comments.postedBy')
        .exec(function (err, project) {
        if (err) next(err);
        res.json(project);
    });
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Projects.findByIdAndUpdate(req.params.projectId, {
        $set: req.body
    }, {
        new: true
    }, function (err, project) {
        if (err) next(err);
        res.json(project);
		});
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
        Projects.findByIdAndRemove(req.params.projectId, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});








projectRouter.route('/:projectId/activities')
.get(function (req, res, next) {
    Projects.findById(req.params.projectId)
        .exec(function (err, project) {
        if (err) next(err);
        res.json(project.activities);
    });
})

.post(Verify.verifyOrdinaryUser, function (req, res, next) {
    Projects.findById(req.params.projectId, function (err, project) {
        if (err) next(err);
        project.activities.push(req.body);
        project.save(function (err, project) {
            if (err) next(err);
            console.log('Updated Activities!');
            res.json(project);
        });
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Projects.findById(req.params.projectId, function (err, project) {
        if (err) next(err);
        for (var i = (project.activities.length - 1); i >= 0; i--) {
            project.activities.id(project.activities[i]._id).remove();
        }
        project.save(function (err, result) {
            if (err) next(err);
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Deleted all activities!');
        });
    });
});

projectRouter.route('/:projectId/activities/:activityId')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Projects.findById(req.params.projectId)
        .exec(function (err, project) {
        if (err) next(err);
        res.json(project.activities.id(req.params.activityId));
    });
})

.put(Verify.verifyOrdinaryUser, function (req, res, next) {
    // We delete the existing commment and insert the updated
    // comment as a new comment
    Projects.findById(req.params.projectId, function (err, project) {
        if (err) next(err);
        project.activities.id(req.params.activityId).remove();
        project.activities.push(req.body);
        project.save(function (err, project) {
            if (err) next(err);
            console.log('Updated activities!');
            res.json(project);
        });
    });
})

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    Projects.findById(req.params.projectId, function (err, project) {
        project.activities.id(req.params.activityId).remove();
        project.save(function (err, resp) {
            if (err) next(err);
            res.json(resp);
        });
    });
});










projectRouter.route('/:projectId/tools')
.get(function (req, res, next) {
    Projects.findById(req.params.projectId)
        .exec(function (err, project) {
        if (err) next(err);
        res.json(project.tools);
    });
})

.post(Verify.verifyOrdinaryUser, function (req, res, next) {
    Projects.findById(req.params.projectId, function (err, project) {
        if (err) next(err);
        project.tools.push(req.body);
        project.save(function (err, project) {
            if (err) next(err);
            console.log('Updated tools!');
            res.json(project);
        });
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Projects.findById(req.params.projectId, function (err, project) {
        if (err) next(err);
        for (var i = (project.tools.length - 1); i >= 0; i--) {
            project.tools.id(project.tools[i]._id).remove();
        }
        project.save(function (err, result) {
            if (err) next(err);
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Deleted all tools!');
        });
    });
});

projectRouter.route('/:projectId/tools/:toolId')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Projects.findById(req.params.projectId)
        .exec(function (err, project) {
        if (err) next(err);
        res.json(project.tools.id(req.params.toolId));
    });
})

.put(Verify.verifyOrdinaryUser, function (req, res, next) {
    // We delete the existing commment and insert the updated
    // comment as a new comment
    Projects.findById(req.params.projectId, function (err, project) {
        if (err) next(err);
        project.tools.id(req.params.toolId).remove();
        project.tools.push(req.body);
        project.save(function (err, project) {
            if (err) next(err);
            console.log('Updated tools!');
            res.json(project);
        });
    });
})

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    Projects.findById(req.params.projectId, function (err, project) {
        project.tools.id(req.params.toolId).remove();
        project.save(function (err, resp) {
            if (err) next(err);
            res.json(resp);
        });
    });
});
























projectRouter.route('/:projectId/comments')
.get(function (req, res, next) {
    Projects.findById(req.params.projectId)
        .populate('comments.postedBy')
        .exec(function (err, project) {
        if (err) next(err);
        res.json(project.comments);
    });
})

.post(Verify.verifyOrdinaryUser, function (req, res, next) {
    Projects.findById(req.params.projectId, function (err, project) {
	
        if (err) next(err);
        req.body.postedBy = req.decoded._id;
        project.comments.push(req.body);
		
        project.save(function (err, project) {
            if (err) {
			console.log("error");
				next(err);
			}
            console.log('Updated Comments!');
            res.json(project);
        });
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Projects.findById(req.params.projectId, function (err, project) {
        if (err) next(err);
        for (var i = (project.comments.length - 1); i >= 0; i--) {
            project.comments.id(project.comments[i]._id).remove();
        }
        project.save(function (err, result) {
            if (err) next(err);
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Deleted all comments!');
        });
    });
});

projectRouter.route('/:projectId/comments/:commentId')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Projects.findById(req.params.projectId)
        .populate('comments.postedBy')
        .exec(function (err, project) {
        if (err) next(err);
        res.json(project.comments.id(req.params.commentId));
    });
})

.put(Verify.verifyOrdinaryUser, function (req, res, next) {
    // We delete the existing commment and insert the updated
    // comment as a new comment
    Projects.findById(req.params.projectId, function (err, project) {
        if (err) next(err);
        project.comments.id(req.params.commentId).remove();
                req.body.postedBy = req.decoded._id;
        project.comments.push(req.body);
        project.save(function (err, project) {
            if (err) next(err);
            console.log('Updated Comments!');
            res.json(project);
        });
    });
})

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    Projects.findById(req.params.projectId, function (err, project) {
        if (project.comments.id(req.params.commentId).postedBy
           != req.decoded._id) {
            var err = new Error('You are not authorized to perform this operation!');
            err.status = 403;
            return next(err);
        }
        project.comments.id(req.params.commentId).remove();
        project.save(function (err, resp) {
            if (err) next(err);
            res.json(resp);
        });
    });
});

module.exports = projectRouter;
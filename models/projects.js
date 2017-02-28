// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var activitySchema = new Schema({
    activity:  {
        type: String,
        required: true
    }
}, {
    timestamps: false
}
);


var toolSchema = new Schema({
    tool:  {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    }
}, {
    timestamps: false
}
);



var commentSchema = new Schema({
    rating:  {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment:  {
        type: String,
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

// create a schema
var projectSchema = new Schema({
	index: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
	image: {
        type: String,
        required: true,
        unique: true
    },
	category: {
        type: String,
        required: true
    },
	label: {
        type: String,
        required: false,
		default: ""
    },
    descriptions: [String],
	activities:[activitySchema],
	tools:[toolSchema],
    comments:[commentSchema]
}, {
    timestamps: false
}, {
	strict: false
});

// the schema is useless so far
// we need to create a model using it
var Projects = mongoose.model('Project', projectSchema);

// make this available to our Node applications
module.exports = Projects;
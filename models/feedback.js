// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var telephoneSchema = new Schema({
    areaCode:  {
        type: String,
        required: false
    },
    number: {
        type: String,
        required: false
    }
}, {
    timestamps: false
});


// create a schema
var feedbackSchema = new Schema({
    mychannel: {
        type: String,
        required: false,
    },
	firstName: {
        type: String,
        required: true
    },
	lastName: {
        type: String,
        required: true,
		default: ""
    },
	agree: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        required: true
    },
	tel: {
        type: telephoneSchema,
        required: false
    },
	comments: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Feedbacks = mongoose.model('Feedback', feedbackSchema);

// make this available to our Node applications
module.exports = Feedbacks;
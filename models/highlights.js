// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var featureSchema = new Schema({
    title:  {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
	descriptions: [String],
}, {
    timestamps: false
});

// create a schema
var highlightsSchema = new Schema({
    profession: featureSchema,
	education: featureSchema,
    courses: featureSchema
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Highlights = mongoose.model('Highlight', highlightsSchema);

// make this available to our Node applications
module.exports = Highlights;
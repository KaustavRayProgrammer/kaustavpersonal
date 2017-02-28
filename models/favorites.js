// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var favoriteSchema = new Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
	projects: [{
		type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
	}]
}, {
    timestamps: true
});

// we need to create a model using it
var Favorites = mongoose.model('Favorite', favoriteSchema);

// make this available to our Node applications
module.exports = Favorites ;
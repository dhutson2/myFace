const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
	title: String,
	url: String,
	description: String,
	comments: String,
	// user: {
	// 	type: Schema.Types.ObjectID,
	// 	ref: 'User'
	// }
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema = new Schema({
	title: String,
	url: String,
	description: String,
	comments: String,
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
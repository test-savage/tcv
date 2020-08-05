const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EpisodeSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	season: {
		type: Number,
		required: true,
	},
	quote: {
		type: String,
		required: true,
	},
	rating: {
		type: Number,
		required: true,
	},
	dateOfEntry: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = Item = mongoose.model("episode", EpisodeSchema);

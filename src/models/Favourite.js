const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var FavouriteSchema = new Schema(
	{
		slug: { type: String },
		title: { type: String },
		image: { type: String },
		username: { type: String },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('favourite', FavouriteSchema);

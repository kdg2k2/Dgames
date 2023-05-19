const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);
const Schema = mongoose.Schema;

const GameSchema = new Schema(
	{
		title: { type: String },
		decription: { type: String },
		category: { type: String },
		image: { type: String },
		developerInfor: { type: String },
		version: { type: String },
		os: { type: String },
		language: { type: String },
		downloadLink: { type: String },
		slug: { type: String, slug: 'title', unique: true },
	}, 
	{
		timestamps: true,
	}
);

const mongoose_delete = require('mongoose-delete');
GameSchema.plugin(mongoose_delete, {
	overrideMethods: 'all',
	deletedAt: true,
});

module.exports = mongoose.model('Game', GameSchema);

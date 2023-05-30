const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);
const Schema = mongoose.Schema;

const GameSchema = new Schema(
	{
		title: { type: String },
		description: { type: String },
		category: [{ type: String }],
		image: { type: String },
		developerInfo: [{ type: String }],
		version: { type: String },
		os: [{ type: String }],
		language: [{ type: String }],
		downloadLink: [{ type: String }],
		slug: { type: String, slug: 'title', unique: true },
		screenshots: [{ type: String }], 
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

GameSchema.statics.getPaginatedData = async function (page, limit) {
	const skip = (page - 1) * limit;
	const totalCount = await this.countDocuments();
	const totalPages = Math.ceil(totalCount / limit);
	const data = await this.find().skip(skip).limit(limit);
	return {
		data,
		totalPages,
		currentPage: page,
	};
};

module.exports = mongoose.model('Game', GameSchema);

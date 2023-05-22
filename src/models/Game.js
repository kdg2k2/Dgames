const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);
const Schema = mongoose.Schema;

const GameSchema = new Schema(
	{
		title: { type: String },
		description: { type: String },
		category: { type: String },
		image: { type: String },
		developerInfo: { type: String },
		version: { type: String },
		os: { type: String },
		language: { type: String },
		downloadLink: { type: String },
		slug: { type: String, slug: 'title', unique: true },
		screenshots: [{ type: String }], // Sửa thành mảng các đường dẫn ảnh
	},
	{
		timestamps: true,
	}
);
GameSchema.index({title: 'text', category: 'text', developerInfo: 'text', language: 'text', os: 'text'});

const mongoose_delete = require('mongoose-delete');
GameSchema.plugin(mongoose_delete, {
	overrideMethods: 'all',
	deletedAt: true,
});

module.exports = mongoose.model('Game', GameSchema);

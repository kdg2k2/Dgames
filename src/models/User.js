const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var UserSchema = new Schema({
	username: { type: String },
	password: { type: String },
	email: { type: String },
	isAdmin: { type: Boolean, default: false },
	favourite: [{ type: String }],
},
{
	timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);

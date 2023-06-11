const mongoose = require('mongoose');
require('dotenv').config();

async function connect() {
	try {
		await mongoose.connect(process.env.MONGODB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('Connected');
	} catch (error) {
		console.log('False to connect to database');
	}
}

module.exports = { connect };

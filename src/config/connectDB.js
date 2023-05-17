const mongoose = require('mongoose');

async function connect() {
	try {
		await mongoose.connect('mongodb://127.0.0.1/Dgames', {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('Connected');
	} catch (error) {
		console.log('False to connect to database');
	}
}

module.exports = { connect };

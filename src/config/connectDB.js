const mongoose = require('mongoose');
//mongodb://127.0.0.1/Dgames
//mongodb+srv://kdg2k2:bachDuong2k2@cluster0.4r083er.mongodb.net/Dgames
async function connect() {
	try {
		await mongoose.connect('mongodb+srv://kdg2k2:bachDuong2k2@cluster0.4r083er.mongodb.net/Dgames', {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('Connected');
	} catch (error) {
		console.log('False to connect to database');
	}
}

module.exports = { connect };

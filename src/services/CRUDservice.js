import Game from '../models/Game';

let updateGame = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let game = await Game.findOne({
				where: { _id: data.id },
			});
			if (game) {
				game.title = data.title;
				game.decription = data.decription;
				game.category = data.category;
				game.image = data.image;
				game.developerInfor = data.developerInfor;
				game.version = data.version;
				game.os = data.os;
				game.language = data.language;
				game.downloadLink = data.downloadLink;

				await game.save();
				resolve();
			} else {
				resolve();
			}
		} catch (error) {
			reject(error);
		}
	});
};

module.exports = {
	updateGame,
};

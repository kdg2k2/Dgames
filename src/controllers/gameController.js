import Game from '../models/Game';

//----------------------
//POST dữ liệu tại trang create đc nhập lên server
let postNewGame = (req, res, next) => {
	const game = new Game(req.body);
	game.category = req.body.category
		.split('\n')
		.map((category) => category.trim());

	game.developerInfo = req.body.developerInfo
		.split('\n')
		.map((developerInfo) => developerInfo.trim());

	game.os = req.body.os
		.split('\n')
		.map((os) => os.trim());

	game.downloadLink = req.body.downloadLink
		.split('\n')
		.map((downloadLink) => downloadLink.trim());

	game.language = req.body.language
		.split('\n')
		.map((language) => language.trim());

	game.screenshots = req.body.screenshots
		.split('\n')
		.map((screenshot) => screenshot.trim());

	game.save()
		.then(() => res.redirect('/game'))
		.catch(next);
	// res.send(game);
}; //----------------------

//----------------------
//render trang chỉnh sửa game
let editGame = (req, res, next) => {
	Game.findOne({ _id: req.params.id })
		.then((data) => {
			res.render('pages/game/editGame.ejs', { data });
		})
		.catch(next);
};
let putUpdatedGame = (req, res, next) => {
	const category = req.body.category
		.split('\n')
		.map((category) => category.trim());
	req.body.category = category;

	const developerInfo = req.body.developerInfo
		.split('\n')
		.map((developerInfo) => developerInfo.trim());
	req.body.developerInfo = developerInfo;

	const os = req.body.os
		.split('\n')
		.map((os) => os.trim());
	req.body.os = os;

	const downloadLink = req.body.downloadLink
		.split('\n')
		.map((downloadLink) => downloadLink.trim());
	req.body.downloadLink = downloadLink;

	const language = req.body.language
		.split('\n')
		.map((language) => language.trim());
	req.body.language = language;

	const screenshots = req.body.screenshots
		.split('\n')
		.map((screenshot) => screenshot.trim());
	req.body.screenshots = screenshots;

	Game.updateOne({ _id: req.params.id }, req.body)
		.then(()=> res.redirect('/game'))
		.catch(next)
};

let moveToTrash = (req, res, next) => {
	Game.delete({ _id: req.params.id })
	.then(() => res.redirect('back'))
	.catch(next);
}

let forceDelete = (req, res, next) => {
	Game.deleteOne({ _id: req.params.id })
		.then(() => res.redirect('back'))
		.catch(next);
};

let restoreGame = (req, res, next) => {
	Game.restore({ _id: req.params.id })
		.then(() => res.redirect('back'))
		.catch(next);
};

let handleFormAction = (req, res, next) => {
	switch (req.body.action) {
		case 'delete':
			Game.delete({ _id: { $in: req.body.gameIds } })
				.then(() => res.redirect('/game'))
				.catch(next);
			break;
		case 'restore':
			Game.restore({ _id: { $in: req.body.gameIds } })
				.then(() => res.redirect('back'))
				.catch(next);
			break;
		case 'force-delete':
			Game.deleteOne({ _id: { $in: req.body.gameIds } })
				.then(() => res.redirect('back'))
				.catch(next);
			break;

		default:
			res.json({ message: 'Unknown action' });
			break;
	}
};

module.exports = {
	postNewGame,
	editGame,
	putUpdatedGame,
	moveToTrash,
	forceDelete,
	restoreGame,
	handleFormAction,
};

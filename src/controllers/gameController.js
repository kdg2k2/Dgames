import Game from '../models/Game';

//----------------------
//show ra nội dung khi click vào
let showGame = (req, res, next) => {
	Game.findOne({ slug: req.params.slug })
		.then((data) => {
			res.render('pages/game/showGame.ejs', { data });
		})
		.catch(next);
}; //----------------------

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
		.then(() => res.redirect('/game/manager'))
		.catch(next);
	// res.send(game);
}; //----------------------

//----------------------
//render trang chỉnh sửa game
let editGame = (req, res, next) => {
	Game.findOne({ _id: req.query.id })
		.then((data) => {
			res.render('pages/game/editGame.ejs', { data });
		})
		.catch(next);
};
let putUpdatedGame = async (req, res, next) => {
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

	await Game.updateOne({ _id: req.body._id }, req.body);
	res.redirect('/game/manager');
};

let deleteGame = (req, res, next) => {
	Game.delete({ _id: req.query.id })
		.then(() => res.redirect('/game/manager'))
		.catch(next);
};
let forceDelete = (req, res, next) => {
	Game.deleteOne({ _id: req.query.id })
		.then(() => res.redirect('back'))
		.catch(next);
};

let restoreGame = (req, res, next) => {
	Game.restore({ _id: req.query.id })
		.then(() => res.redirect('back'))
		.catch(next);
};

let handleFormAction = (req, res, next) => {
	switch (req.query.action) {
		case 'delete':
			Game.delete({ _id: { $in: req.query.gameIds } })
				.then(() => res.redirect('/game/manager'))
				.catch(next);
			break;
		case 'restore':
			Game.restore({ _id: { $in: req.query.gameIds } })
				.then(() => res.redirect('back'))
				.catch(next);
			break;
		case 'force-delete':
			Game.deleteOne({ _id: { $in: req.query.gameIds } })
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
	showGame,
	editGame,
	putUpdatedGame,
	deleteGame,
	forceDelete,
	restoreGame,
	handleFormAction,
};

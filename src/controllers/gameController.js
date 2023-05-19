import Game from '../models/Game';

//----------------------
//render trang quản lý game
let gameManager = (req, res, next) => {
	Promise.all([Game.find({}), Game.countDocumentsDeleted()]).then(
		([data, deletedcount]) => {
			res.render('pages/gameManager.ejs', { data, deletedcount });
		}
	);
};
let gameManager_trash = (req, res, next) => {
	Game.findDeleted({})
		.then((data) => res.render('pages/trash-Game.ejs', { data }))
		.catch(next);
};
//----------------------

//----------------------
//show ra nội dung khi click vào
let showGame = (req, res, next) => {
	Game.findOne({ slug: req.params.slug })
		.then((data) => {
			res.render('pages/showGame.ejs', { data });
		})
		.catch(next);
}; //----------------------

//----------------------
//render trang tạo Game
let createGame = (req, res) => {
	return res.render('pages/createGames.ejs');
};
//đẩy dữ liệu đc nhập lên server
let postNewGame = (req, res, next) => {
	const game = new Game(req.body);
	game.save()
		.then(() => res.redirect('/'))
		.catch(next);
}; //----------------------

//----------------------
//render trang chỉnh sửa game
let editGame = (req, res, next) => {
	Game.findOne({ _id: req.query.id })
		.then((data) => {
			res.render('pages/editGame.ejs', { data });
		})
		.catch(next);
};
let putUpdatedGame = async (req, res, next) => {
	Game.updateOne({ _id: req.body._id }, req.body)
		.then(() => res.redirect('/game/manager'))
		.catch(next);
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

module.exports = {
	createGame,
	postNewGame,
	gameManager,
	gameManager_trash,
	showGame,
	editGame,
	putUpdatedGame,
	deleteGame,
	forceDelete,
	restoreGame,
};

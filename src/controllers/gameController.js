import Game from '../models/Game';
import CRUD from '../services/CRUDservice'

//----------------------
//render trang quản lý game
let gameManager = (req, res, next) => {
	Game.find({}).then((data) => res.render('pages/gameManager.ejs', { data }));
}; //----------------------

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
	let data = req.body
	await CRUD.updateGame(data)
	return res.redirect('/game/manager')
};

module.exports = {
	createGame,
	postNewGame,
	gameManager,
	showGame,
	editGame,
	putUpdatedGame,
};

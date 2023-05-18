import Game from '../models/Game';
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
	Game.findOne(req.params.id)
		.then((data) => {
			res.render('pages/editGame.ejs', { data });
		})
		.catch(next);
};
let putUpdatedGame = (req, res, next) => {
	Game.findOne(req.params.id)
		.then((data) => {
			data.title = req.body.title;
			data.decription = req.body.decription;
			data.category = req.body.category;
			data.image = req.body.image;
			data.developerInfor = req.body.developerInfor;
			data.version = req.body.version;
			data.os = req.body.os;
			data.language = req.body.language;
			data.downloadLink = req.body.downloadLink;

			data.save();
			return res.redirect('/game/manager');
		})
		.catch(next);
};

module.exports = {
	createGame,
	postNewGame,
	gameManager,
	showGame,
	editGame,
	putUpdatedGame,
};

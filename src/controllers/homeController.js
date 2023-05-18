import db from '../models/Game';

let getHomepage = (req, res, next) => {
	db.find({})
		// .then((data)=>res.json(data))
		.then((data) => {
			res.render('pages/homePage.ejs', { data });
		})
		.catch(next);
};

let createGame = (req, res) => {
	return res.render('pages/createGames.ejs');
};

let postNewGame = (req, res, next) => {
	const game = new db(req.body);
	game.save()
		.then(() => res.redirect('/'))
		.catch(next);
};

let gameManager = (req, res, next) => {
	db.find({}).then((data) => res.render('pages/gameManager.ejs', { data }));
};

let showGame = (req, res, next) => {
	db.findOne({ slug: req.params.slug })
		.then((data) => {
			res.render('pages/showGame.ejs', { data });
		})
		.catch(next);
};

module.exports = {
	getHomepage,
	createGame,
	postNewGame,
	gameManager,
	showGame,
};

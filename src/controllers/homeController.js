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

module.exports = {
	getHomepage,
	createGame,
	postNewGame,
};

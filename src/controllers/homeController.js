import Game from '../models/Game';

let getHomepage = (req, res, next) => {
	Game.find({})
		.then((data) => {
			res.render('pages/home/homePage.ejs', { data });
		})
		.catch(next);
};

module.exports = {
	getHomepage,
};

import Game from '../models/Game';

let getHomepage = (req, res, next) => {
	Game.find({})
		.then((data) => {
			res.render('pages/home/homePage.ejs', { data });
		})
		.catch(next);
};

let search = (req, res, next) => {
	const searchTerm = req.query.search;
	const regex = new RegExp(searchTerm, 'i'); // 'i' để tìm kiếm không phân biệt chữ hoa chữ thường
	
	Game.find({
	  $or: [
		{ title: { $regex: regex } },
		{ category: { $regex: regex } },
		{ developerInfo: { $regex: regex } },
		{ os: { $regex: regex } },
		{ language: { $regex: regex } }
	  ]
	})
	  .then((data) => res.render('pages/home/searching.ejs', { data }))
	  .catch(next);
  };
  

module.exports = {
	getHomepage,
	search,
};

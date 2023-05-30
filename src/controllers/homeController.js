import Game from '../models/Game';

const ITEMS_PER_PAGE = 12;

let getHomepage = (req, res, next) => {
  const page = parseInt(req.query.page) || 1;

  Game.countDocuments({})
    .then((totalCount) => {
      const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

      Game.find({})
        .sort({ createdAt: -1 })
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE)
        .then((data) => {
          res.render('pages/home/homePage.ejs', { data, currentPage: page, totalPages, ITEMS_PER_PAGE });
        })
        .catch(next);
    })
    .catch(next);
};


let search = (req, res, next) => {
	const searchTerm = req.query.search;
	if(searchTerm){
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
	  .then((data) => res.render('pages/home/searching.ejs', { data , searchTerm}))
	  .catch(next);
	}
	else{
		res.send('Null search')
	}
  };

module.exports = {
	getHomepage,
	search,
};

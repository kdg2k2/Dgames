import jwt from '../middlewares/jwtMiddleware';
import Favourite from '../models/Favourite';

let getFavourite = (req, res, next) => {
	let token = req.cookies.token; // Lấy JWT từ cookie (Cần cài đặt middleware cookie-parser)
	if (!token) {
		res.status(404).redirect('/login');
		return;
	}
	jwt.verifyToken(token)
		.then(() => {
			Favourite.find({ username: req.session.username })
				.then((data) => {
					res.render('pages/me/favourite.ejs', { data });
				})
				.catch(next);
		})
		.catch(next);
};

let postFavourite = (req, res, next) => {
	let favourite = {
		slug: req.body.slug,
		title: req.body.title,
		image: req.body.image,
		username: req.session.username,
	};

	let fav = new Favourite(favourite);
	fav.save()
		.then(() => res.redirect('back'))
		.catch(next);
};

let removeFavourite = (req, res, next) => {
	Favourite.findOne({ username: req.session.username, slug: req.body.slug })
		.then((data) => {
			Favourite.deleteOne({ _id: data._id })
				.then(() => res.redirect('back'))
				.catch(next);
		})
		.catch(next);
};

let changePassword = (req, res, next) =>{
	let token = req.cookies.token;
	if (!token) {
		res.status(404).redirect('/login');
		return;
	}
	jwt.verifyToken(token)
		.then(() => {
			res.render('pages/me/changePassword.ejs');
		})
		.catch(next);
}

module.exports = {
	postFavourite,
	getFavourite,
	removeFavourite,
	changePassword,
};

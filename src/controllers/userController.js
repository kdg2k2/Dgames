import User from '../models/User';
import Game from '../models/Game';
import md5 from 'md5';

let loginForm = (req, res, next) => {
	res.render('pages/login.ejs');
};
let loginSuccess = (req, res, next) => {
	User.findOne({ username: req.body.username, password: md5(req.body.password) })
		.then((user) => {
			if (!user) {
				res.send('User not found');
			} else {
				Game.find({}).then((data) => {
					res.render('pages/adminPage.ejs', { data });
				});
			}
		})
		.catch(next);
};
let logged = (req, res, next) => {
	Game.find({})
		.then((data) => {
			res.render('pages/adminPage.ejs', { data });
		})
		.catch(next);
};

let registerForm = (req, res, next) => {
	res.render('pages/register.ejs');
};
let postNewUser = (req, res, next) => {
	const user = new User(req.body);
	user.email = md5(req.body.email);
	user.password = md5(req.body.password);
	user.save()
		.then(() => {
			res.redirect('/login');
		})
		.catch(next);
};

let logout = (req, res) => {
	res.redirect('/');
};

module.exports = {
	loginForm,
	loginSuccess,
	logged,
	registerForm,
	postNewUser,
	logout,
};

import User from '../models/User';
import Game from '../models/Game';
import md5 from 'md5';

let loginForm = (req, res, next) => {
	res.render('pages/login/login.ejs');
};
let loginSuccess = (req, res, next) => {
	User.findOne({ username: req.body.username })
		.then((username) => {
			if (!username) {
				res.send('User not found');
			} else {
				User.findOne({ password: md5(req.body.password) })
					.then((password) => {
						if (!password) {
							res.send('Wrong password');
						} else {
							Game.find({}).then((data) => {
								res.render('pages/admin/adminHomePage.ejs', {
									data,
								});
							});
						}
					})
					.catch(next);
			}
		})
		.catch(next);
};
let logged = (req, res, next) => {
	Game.find({})
		.then((data) => {
			res.render('pages/admin/adminHomePage.ejs', { data });
		})
		.catch(next);
};

let registerForm = (req, res, next) => {
	res.render('pages/register/register.ejs');
};
let postNewUser = (req, res, next) => {
	User.findOne({ username: req.body.username })
		.then((username) => {
			if (username) {
				res.send('User already exists');
			} else {
				User.findOne({ email: md5(req.body.email) })
					.then((email) => {
						if (email) {
							res.send('Email already exists');
						} else {
							const user = new User(req.body);
							user.email = md5(req.body.email);
							user.password = md5(req.body.password);
							user.save()
								.then(() => {
									res.redirect('/login');
								})
								.catch(next);
						}
					})
					.catch(next);
			}
		})
		.catch(next);
};

let logout = (req, res) => {
	res.redirect('/');
};

let forgetPassword = (req, res) => {
	res.render('pages/forgetPassword/forgetPassword.ejs')
}

let changePassword = (req, res, next) => {
	User.findOne({ username: req.body.username })
		.then((username) => {
			if (!username) {
				res.send('User not found');
			} else {
				User.findOne({ email: md5(req.body.email) })
				.then((email) => {
					if (!email) {
						res.send('Email not found');
					} else {
						req.body.password = md5(req.body.password);
						req.body.email = md5(req.body.email);
						User.updateOne({username: req.body.username}, req.body)
							.then(()=>res.redirect('back'))
							.catch(next);
					}
				})
				.catch(next);
			}
		})
		.catch(next);
}

module.exports = {
	loginForm,
	loginSuccess,
	logged,
	registerForm,
	postNewUser,
	logout,
	forgetPassword,
	changePassword,
};

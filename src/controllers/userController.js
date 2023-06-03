import User from '../models/User';
import Game from '../models/Game';
import jwt from '../middlewares/jwtMiddleware';
import md5 from 'md5';

let loginForm = (req, res, next) => {
	res.render('pages/login/login.ejs');
};

let loginSuccess = (req, res, next) => {
	User.findOne({ username: req.body.username })
		.then((user) => {
			if (!user) {
				res.status(401).send('User not found');
			} else {
				let hashedPassword = md5(req.body.password);

				if (hashedPassword !== user.password) {
					res.status(402).send('Wrong password');
				} else {
					let token = jwt.generateToken(user);

					res.cookie('token', token);//lưu token vào cookie trình duyệt
					req.session.loggedIn = true;
					res.status(200).redirect('/user');
				}
			}
		})
		.catch(next);
};

let ITEMS_PER_PAGE = 12;

let logged = (req, res, next) => {
	let token = req.cookies.token; // Lấy JWT từ cookie (Cần cài đặt middleware cookie-parser)
	if (!token) {
		res.status(404).redirect('/login');
		return;
	}
	jwt.verifyToken(token)
		.then(() => {
			let page = parseInt(req.query.page) || 1;

			Game.countDocuments({})
				.then((totalCount) => {
					let totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

					Game.find({})
						.sort({ createdAt: -1 })
						.skip((page - 1) * ITEMS_PER_PAGE)
						.limit(ITEMS_PER_PAGE)
						.then((data) => {
							res.status(200).render('pages/home/homePage.ejs', {
								data,
								currentPage: page,
								totalPages,
								ITEMS_PER_PAGE,
							});
						})
						.catch(next);
				})
				.catch(next);
		})
		.catch((err) => {
			res.status(403).redirect('/login');
		});
};

let logout = (req, res) => {
	// Xác định người dùng đã đăng xuất
	req.session.loggedIn = false;
	res.clearCookie('token'); // Xóa cookie chứa JWT (Cần cài đặt middleware cookie-parser)
	res.redirect('/');
};

let registerForm = (req, res, next) => {
	res.render('pages/register/register.ejs');
};

let postNewUser = (req, res, next) => {
	User.findOne({ username: req.body.username })
		.then((username) => {
			if (username) {
				res.status(401).send('User already exists');
			} else {
				User.findOne({ email: md5(req.body.email) })
					.then((email) => {
						if (email) {
							res.status(402).send('Email already exists');
						} else {
							let user = new User(req.body);
							user.email = md5(req.body.email);
							user.password = md5(req.body.password);
							user.save()
								.then(() => {
									res.status(200).redirect('/login');
								})
								.catch(next);
						}
					})
					.catch(next);
			}
		})
		.catch(next);
};

let forgetPassword = (req, res) => {
	res.render('pages/forgetPassword/forgetPassword.ejs');
};

let changePassword = (req, res, next) => {
	User.findOne({ username: req.body.username })
		.then((username) => {
			if (!username) {
				res.status(401).send('User not found');
			} else {
				User.findOne({ email: md5(req.body.email) })
					.then((email) => {
						if (!email) {
							res.status(401).send('Email not found');
						} else {
							req.body.password = md5(req.body.password);
							req.body.email = md5(req.body.email);
							User.updateOne(
								{ username: req.body.username },
								req.body
							)
								.then(() => res.status(200).redirect('back'))
								.catch(next);
						}
					})
					.catch(next);
			}
		})
		.catch(next);
};

//----------------------
//render trang quản lý bài viết
let gameManager = (req, res, next) => {
	let token = req.cookies.token; // Lấy JWT từ cookie

	if (!token) {
		res.redirect('/login');
		return;
	}

	jwt.verifyToken(token)
	.then(()=>{
		Promise.all([Game.find({}), Game.countDocumentsDeleted()])
				.then(([data, deletedcount]) => {
					res.render('pages/admin/postedManager.ejs', {
						data,
						deletedcount,
					});
				})
				.catch(next);
	})
	.catch((err)=>{
		res.redirect('/login');
	})
};

//render trang quản lý bài viết đã xóa
let gameManager_trash = (req, res, next) => {
	let token = req.cookies.token; // Lấy JWT từ cookie

	if (!token) {
		res.redirect('/login');
		return;
	}

	jwt.verifyToken(token)
		.then(()=>{
			Game.findDeleted({})
				.then((data) =>
					res.render('pages/admin/deletedManager.ejs', { data })
				)
				.catch(next);
		})
		.catch((err)=>{
			res.redirect('/login');
		})
	
};



module.exports = {
	loginForm,
	loginSuccess,
	logged,
	registerForm,
	postNewUser,
	logout,
	forgetPassword,
	changePassword,
	gameManager,
	gameManager_trash,
};

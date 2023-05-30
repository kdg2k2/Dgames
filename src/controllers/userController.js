import User from '../models/User';
import Game from '../models/Game';
import jwt from 'jsonwebtoken';
import md5 from 'md5';

let loginForm = (req, res, next) => {
	res.render('pages/login/login.ejs');
};

let loginSuccess = (req, res, next) => {
	User.findOne({ username: req.body.username })
		.then((user) => {
			if (!user) {
				res.send('User not found');
			} else {
				const hashedPassword = md5(req.body.password);

				if (hashedPassword !== user.password) {
					res.send('Wrong password');
				} else {
					// Tạo JWT với thông tin người dùng
					const payload = {
						id: user._id,
						username: user.username,
					};

					jwt.sign(
						payload,
						'DGAMES',
						{ expiresIn: '1h' },
						(err, token) => {
							if (err) {
								throw err;
							} else {
								// Gửi JWT về cho người dùng
								res.cookie('token', token); // Lưu JWT trong cookie (Cần cài đặt middleware cookie-parser)
								// Xác định người dùng đã đăng nhập thành công
								req.session.loggedIn = true;
								res.redirect('/user');
							}
						}
					);
				}
			}
		})
		.catch(next);
};

const ITEMS_PER_PAGE = 12;

let logged = (req, res, next) => {
	const token = req.cookies.token; // Lấy JWT từ cookie (Cần cài đặt middleware cookie-parser)
	if (!token) {
		res.redirect('/login');
		return;
	}
	jwt.verify(token, 'DGAMES', (err, decoded) => {
		if (err) {
			res.redirect('/login');
		} else {
			// JWT hợp lệ, tiếp tục xử lý yêu cầu
			const page = parseInt(req.query.page) || 1;

			Game.countDocuments({})
				.then((totalCount) => {
					const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

					Game.find({})
						.sort({ createdAt: -1 })
						.skip((page - 1) * ITEMS_PER_PAGE)
						.limit(ITEMS_PER_PAGE)
						.then((data) => {
							res.render('pages/home/homePage.ejs', {
								data,
								currentPage: page,
								totalPages,
								ITEMS_PER_PAGE,
							});
						})
						.catch(next);
				})
				.catch(next);
		}
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

let forgetPassword = (req, res) => {
	res.render('pages/forgetPassword/forgetPassword.ejs');
};

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
							User.updateOne(
								{ username: req.body.username },
								req.body
							)
								.then(() => res.redirect('back'))
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
	const token = req.cookies.token; // Lấy JWT từ cookie

	if (!token) {
		res.redirect('/login');
		return;
	}

	jwt.verify(token, 'DGAMES', (err, decoded) => {
		if (err) {
			res.redirect('/login');
		} else {
			Promise.all([Game.find({}), Game.countDocumentsDeleted()])
				.then(([data, deletedcount]) => {
					res.render('pages/admin/postedManager.ejs', {
						data,
						deletedcount,
					});
				})
				.catch(next);
		}
	});
};

//render trang quản lý bài viết đã xóa
let gameManager_trash = (req, res, next) => {
	const token = req.cookies.token; // Lấy JWT từ cookie

	if (!token) {
		res.redirect('/login');
		return;
	}

	jwt.verify(token, 'DGAMES', (err, decoded) => {
		if (err) {
			res.redirect('/login');
		} else {
			Game.findDeleted({})
				.then((data) =>
					res.render('pages/admin/deletedManager.ejs', { data })
				)
				.catch(next);
		}
	});
};

//render trang tạo Game
let createGame = (req, res) => {
	const token = req.cookies.token; // Lấy JWT từ cookie

	if (!token) {
		res.redirect('/login');
		return;
	}

	jwt.verify(token, 'DGAMES', (err, decoded) => {
		if (err) {
			res.redirect('/login');
		} else {
			return res.render('pages/game/createGames.ejs');
		}
	});
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
	createGame,
};

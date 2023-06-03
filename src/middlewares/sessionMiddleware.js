let session = require('express-session');

// Cấu hình session
let sessionMiddleware = session({
	secret: 'DGAMES',
	resave: false,
	saveUninitialized: true,
});

module.exports = sessionMiddleware;

import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initWebroutes from './route/web';
require('dotenv').config();
let db = require('./config/connectDB');
let methodOverride = require('method-override');
let compression = require('compression');
let cookieParser = require('cookie-parser');
let session = require('./middlewares/sessionMiddleware');

let app = express();

//config app
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));//override cho chuẩn restful api
app.use(cookieParser());//cookie lưu jwt

// Cấu hình session
app.use(session)
// Middleware để xác định trạng thái xác thực của người dùng
app.use((req, res, next) => {
  res.locals.loggedIn = req.session.loggedIn || false;
  next();
});

//view
viewEngine(app);
//route
initWebroutes(app);

//connect to database
db.connect();

//port === undifined => port = 6969
let port = process.env.PORT || 6969;

app.listen(port, () => console.log('Server listening on port ' + port));

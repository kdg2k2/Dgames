import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initWebroutes from './route/web';
require('dotenv').config();
import db from './config/connectDB';
import methodOverride from 'method-override';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import session from './middlewares/sessionMiddleware';

const app = express();

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
  // Kiểm tra xem người dùng là admin hay user
  res.locals.isAdmin = req.session.isAdmin || false;
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

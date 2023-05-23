import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initWebroutes from './route/web';
require('dotenv').config();
const db = require('./config/connectDB');
const methodOverride = require('method-override');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const session = require('express-session');


let app = express();

//config app
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cookieParser());

// Cấu hình session
app.use(session({
    secret: 'DGAMES',
    resave: false,
    saveUninitialized: true
  }));
  
  // Middleware để xác định trạng thái xác thực của người dùng
  app.use((req, res, next) => {
    res.locals.loggedIn = req.session.loggedIn || false;
    next();
  });


viewEngine(app);
initWebroutes(app);

//connect to database
db.connect();

let port = process.env.PORT || 6969;
//port === undifined => port = 6969

app.listen(port, () => console.log('Server listening on port ' + port));

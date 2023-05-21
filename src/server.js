import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initWebroutes from './route/web';
require('dotenv').config();
const db = require('./config/connectDB');
const compression = require('compression');

let app = express();

//config app
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebroutes(app);

//connect to database
db.connect();

let port = process.env.PORT || 6969;
//port === undifined => port = 6969

app.listen(port, () => console.log('Server listening on port ' + port));

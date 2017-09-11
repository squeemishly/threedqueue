var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
const environment = process.env.NODE_ENV || "development"
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)
var passport = require('passport');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
require('./config/passport')(passport);

// var configDB = require('./config/database.js'); // PROBABLY JUST FOR MONGOOSE, DELETE IF UNUSED

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

app.set('view engine', 'ejs');

app.use(session({ secret: 'thisshouldprobablybesavedinanenvfile' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./app/routes.js')(app, passport);

app.listen(port);
console.log('The magic happens on port ' + port);
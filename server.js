var express = require('express');
var session = require('express-session');
var passport = require('passport');
var cookieParser = require('cookie-parser');
// IMport mongoose
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
// Install, load, and configure body parser module
var bodyParser = require('body-parser');


var app = express();
var secret = "Local Deployment";
if (process.env.WEB_CONCURRENCY) {
    secret = process.env.SESSION_SECRET;
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: secret,
    saveUninitialized: true,
    resave: true
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


// Configure a public directory to host static content
app.use(express.static(__dirname + '/public'));
var database = require('./database/database')(mongoose);
var security = require('./security/security')(database, passport);
// require("./test/app.js")(app);
require("./assignment/app")(app, database, security);
require("./project/app")(app, database, security);

var port = process.env.PORT || 5000;

app.listen(port);

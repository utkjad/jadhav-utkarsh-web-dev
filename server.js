
var express = require('express');
var app = express();

// Install, load, and configure body parser module
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

require("./test/app.js")(app);
require("./assignment/app")(app);

var port = process.env.PORT || 5000;

app.listen(port);

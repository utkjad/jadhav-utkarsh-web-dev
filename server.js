// Utkarsh Jadhav
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

require ("./test/app.js")(app);

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'));

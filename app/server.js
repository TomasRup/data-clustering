'use strict';

// external dependencies
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

// internal dependencies
var Routes = require('./server/configuration/routes');

// config
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

// initialize endpoints
var routes = new Routes(app);
routes.init();

// start up
app.listen(2222);
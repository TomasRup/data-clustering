'use strict';

var NavigationController = (function() {

	var Util = require('util');

	var Controller = require('../controller');

	function NavigationController() {
		NavigationController.super_.call(this);
	}

	Util.inherits(NavigationController, Controller);

	NavigationController.prototype.homePage = function(req, res) {
		res.sendFile('index.html');
	}

	return NavigationController;
}());

module.exports = NavigationController;
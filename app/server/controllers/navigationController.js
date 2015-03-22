'use strict';

var NavigationController = (function() {

	function NavigationController() {}

	NavigationController.prototype.homePage = function(req, res) {
		res.sendFile('/public/index.html');
	}

	return NavigationController;
}());

module.exports = NavigationController;
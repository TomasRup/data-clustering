'use strict';

var Service = (function() {

	var Utils = require('../utils/utils');

	function Service() {
		this.utils = new Utils();
	}

	return Service;
}());

module.exports = Service;
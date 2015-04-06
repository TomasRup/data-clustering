'use strict';

var Utils = (function() {

	function Utils() {
	}	

	Utils.prototype.getRandom = function(low, high) {
		return Math.floor(Math.random() * (high - low + 1) + low);
	}

	return Utils;
}());

module.exports = Utils;
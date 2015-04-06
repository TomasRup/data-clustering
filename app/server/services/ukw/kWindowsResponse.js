'use strict';

var KWindowsResponse = (function() {

	var Util = require('util');
	var Response = require('../response');

	function KWindowsResponse() {
		KWindowsResponse.super_.call(this);
		this.kWindows = [];
		this.dataPoints = [];
	}

	Util.inherits(KWindowsResponse, Response);

	KWindowsResponse.prototype.withKWindows = function(kWindows) {
		this.kWindows = kWindows;
		return this;
	}

	KWindowsResponse.prototype.withDataPoints = function(dataPoints) {
		this.dataPoints = dataPoints;
		return this;
	}

	return KWindowsResponse;
}());

module.exports = KWindowsResponse;
'use strict';

var KMeansResponse = (function() {

	var Util = require('util');
	var Response = require('../response');

	function KMeansResponse() {
		KMeansResponse.super_.call(this);
		this.centroidsWithPoints = [];
	}

	Util.inherits(KMeansResponse, Response);

	KMeansResponse.prototype.withCentroidsWithPoints = function(centroidsWithPoints) {
		this.centroidsWithPoints = centroidsWithPoints;
		return this;
	}

	return KMeansResponse;
}());

module.exports = KMeansResponse;
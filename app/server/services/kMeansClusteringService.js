'use strict';

var KMeansClusteringService = (function() {

	var Utils = require('../utils/utils');
	var _ = require('underscore');

	function KMeansClusteringService(data) {
		this.data = data;
		this.utils = new Utils();
	}	

	KMeansClusteringService.prototype = {
		getClustersUsingKMeansAlgorithm: function(k, next) {
			next({a: 'test'});
		}
	};

	return KMeansClusteringService
;
}());

module.exports = KMeansClusteringService;
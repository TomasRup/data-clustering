'use strict';

var ClusteringController = (function() {

	var UKWClusteringService = require('../services/ukwClusteringService');
	var Data = require('../dao/data');

	function ClusteringController() {
		this.ukwClusteringService = new UKWClusteringService(Data);
	}

	ClusteringController.prototype.getClustersByUkw = function(req, res) {
		var a = req.query.a;
		var oE = req.query.oE;
		var oM = req.query.oM;
		var oC = req.query.oC;
		var oV = req.query.oV;
		var oS = req.query.oS;
		var k = req.query.k;

		this.ukwClusteringService.getClustersUsingUKWAlgorithm(a, oE, oM, oC, oV, oS, k, function(jsonResponse) {
			res.json(jsonResponse);
		});
	}

	return ClusteringController;
}());

module.exports = ClusteringController;
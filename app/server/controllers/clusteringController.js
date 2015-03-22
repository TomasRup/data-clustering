'use strict';

var ClusteringController = (function() {

	var ClusteringService = require('../services/clusteringService');
	var Data = require('../dao/data');

	function ClusteringController() {
		this.clusteringService = new ClusteringService(Data);
	}

	ClusteringController.prototype.getClusters = function(req, res) {
		var a = req.query.a;
		var oE = req.query.oE;
		var oM = req.query.oM;
		var oC = req.query.oC;
		var oV = req.query.oV;
		var oS = req.query.oS;
		var k = req.query.k;

		this.clusteringService.getClustersUsingUKWAlgorithm(a, oE, oM, oC, oV, oS, k, function(jsonResponse) {
			res.json(jsonResponse);
		});
	}

	return ClusteringController;
}());

module.exports = ClusteringController;
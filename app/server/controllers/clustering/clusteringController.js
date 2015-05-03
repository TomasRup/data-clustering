'use strict';

var ClusteringController = (function() {

	var Util = require('util');

	var Controller = require('../controller');
	var DataFactory = require('../../dao/dataFactory');
	var UKWClusteringService = require('../../services/ukw/ukwClusteringService');
	var KMeansClusteringService = require('../../services/kmeans/kMeansClusteringService');

	function ClusteringController() {
		ClusteringController.super_.call(this);
		this.dataFactory = new DataFactory();
		this.ukwClusteringService = undefined;
		this.kMeansClusteringService = undefined;
	}

	Util.inherits(ClusteringController, Controller);

	ClusteringController.prototype.getDataTypes = function(req, res) {
		res.json(this.dataFactory.getAllTypes());
	}

	ClusteringController.prototype.getClustersByUkw = function(req, res) {
		var a = req.query.a;
		var oE = req.query.oE;
		var oM = req.query.oM;
		var oC = req.query.oC;
		var oV = req.query.oV;
		var oS = req.query.oS;
		var k = req.query.k;

		var dataName = req.query.dataName;
		this.ukwClusteringService = new UKWClusteringService(this.dataFactory.get(dataName));

		this.ukwClusteringService.getClustersUsingUKWAlgorithm(a, oE, oM, oC, oV, oS, k, function(jsonResponse) {
			res.json(jsonResponse);
		});
	}

	ClusteringController.prototype.getClustersByKMeans = function(req, res) {
		var k = req.query.k;
		var maxIterations = req.query.maxIterations;

		var dataName = req.query.dataName;
		this.kMeansClusteringService = new KMeansClusteringService(this.dataFactory.get(dataName));

		this.kMeansClusteringService.getClustersUsingKMeansAlgorithm(k, maxIterations, function(jsonResponse) {
			res.json(jsonResponse);
		});
	}

	return ClusteringController;
}());

module.exports = ClusteringController;
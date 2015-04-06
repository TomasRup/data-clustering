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

	ClusteringController.prototype.processResponse = function(timeStarted, res, jsonResponse) {
		var timeCompleted = new Date();
		var timeSpent = timeCompleted.getTime() - timeStarted.getTime();
		jsonResponse.timeSpent = timeSpent;
		res.json(jsonResponse);
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

		var that = this;
		var timeStarted = new Date();

		this.ukwClusteringService.getClustersUsingUKWAlgorithm(a, oE, oM, oC, oV, oS, k, function(jsonResponse) {
			that.processResponse(timeStarted, res, jsonResponse);
		});
	}

	ClusteringController.prototype.getClustersByKMeans = function(req, res) {
		var k = req.query.k;
		var maxIterations = req.query.maxIterations;

		var dataName = req.query.dataName;
		this.kMeansClusteringService = new KMeansClusteringService(this.dataFactory.get(dataName));

		var that = this;
		var timeStarted = new Date();

		this.kMeansClusteringService.getClustersUsingKMeansAlgorithm(k, maxIterations, function(jsonResponse) {
			that.processResponse(timeStarted, res, jsonResponse);
		});
	}

	return ClusteringController;
}());

module.exports = ClusteringController;
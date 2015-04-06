'use strict';

var KMeansClusteringService = (function() {

	var Util = require('util');
	var _ = require('underscore');

	var KMeansCentroid = require('./kMeansCentroid');
	var KMeansResponse = require('./kMeansResponse');
	var Service = require('../service');

	function KMeansClusteringService(data) {
		KMeansClusteringService.super_.call(this);
		if (!data) throw new Error('Data is not defined!');
		this.data = data;
	}	

	Util.inherits(KMeansClusteringService, Service);

	KMeansClusteringService.prototype.initRandomCentroids = function(k) {
		var randomCentroids = [];
		var chosenIds = [];

		do {
			var randomPointId = this.utils.getRandom(0, this.data.items.length - 1);
			if (_.contains(chosenIds, randomPointId)) continue;

			var newCentroid = new KMeansCentroid();
			newCentroid.initialize(this.data.items[randomPointId]);
			randomCentroids.push(newCentroid);
			chosenIds.push(randomPointId);

		} while (randomCentroids.length < k);

		return randomCentroids;
	}

	KMeansClusteringService.prototype.shouldStopIterations = function(centroids, cachedCentroids, currentIteration, maxIterations) {
		if (currentIteration >= maxIterations) return true;
		if (centroids.length != cachedCentroids.length) return false;

		for (var i = 0 ; i < centroids.length ; i++) { 
			if (!centroids[i].equals(cachedCentroids[i])) {
				return false;
			}
		}
		
		return true;
	}

	KMeansClusteringService.prototype.assignCentroidsToEachDataItem = function(centroids) {
		this.data.items.forEach(function(dataItem) {
			var distancesToCentroids = [];

			centroids.forEach(function(centroid) {
				distancesToCentroids.push(centroid.distanceTo(dataItem));
			}, this);

			var closestCentroidLength = _.min(distancesToCentroids);
			var closestCentroidLengthId = _.indexOf(distancesToCentroids, closestCentroidLength);
			dataItem.centroid = centroids[closestCentroidLengthId];

		}, this);
	}

	KMeansClusteringService.prototype.recalculateCentroidsAndReturn = function(centroids) {
		var newCentroidsList = [];

		centroids.forEach(function(centroid) {
			var centroidMatcher = _.matcher({ centroid: centroid });
			var dataItemsOfCentroid = _.filter(this.data.items, centroidMatcher);

			var sumX = 0;
			var sumY = 0;
			
			dataItemsOfCentroid.forEach(function(dataItemOfCentroid) {
				sumX = sumX + dataItemOfCentroid.x;
				sumY = sumY + dataItemOfCentroid.y;
			}, this);
			
			var newCentroid = new KMeansCentroid();
			newCentroid.initialize({
				x: (sumX / dataItemsOfCentroid.length),
				y: (sumY / dataItemsOfCentroid.length)
			});
			newCentroidsList.push(newCentroid);
		}, this);

		return newCentroidsList;
	}

	KMeansClusteringService.prototype.convertDataItemsIntoOptimizedArray = function() {
		var array = [];			
		var centroids = _.uniq(_.map(this.data.items, function(item) { return item.centroid; }));

		centroids.forEach(function(centroid) {
			var centroidMatcher = _.matcher({ centroid: centroid });
			var dataItemsOfCentroid = _.filter(this.data.items, centroidMatcher);
			array.push({
				centroid: centroid,
				dataItems: dataItemsOfCentroid
			});
		}, this);

		return array;
	}

	KMeansClusteringService.prototype.getClustersUsingKMeansAlgorithm = function(k, maxIterations, next) {
		this.data.items.forEach(function(dataItem) {
			dataItem.centroid = {};
		});

		var centroids = this.initRandomCentroids(k);
		var cachedCentroids = [];
		var currentIteration = 0;
		
		while (!this.shouldStopIterations(centroids, cachedCentroids, currentIteration, maxIterations)) {
			cachedCentroids = _.clone(centroids);
			currentIteration++;

			this.assignCentroidsToEachDataItem(centroids);
			centroids = this.recalculateCentroidsAndReturn(centroids);
		}

		var response = new KMeansResponse();
		response
			.withMinX(this.data.metadata.minX)
			.withMaxX(this.data.metadata.maxX)
			.withMinY(this.data.metadata.minY)
			.withMaxY(this.data.metadata.maxY)
			.withXName(this.data.metadata.xName)
			.withYName(this.data.metadata.yName)
			.withTitle(this.data.metadata.title)
			.withCentroidsWithPoints(this.convertDataItemsIntoOptimizedArray());
		next(response);	
	}

	return KMeansClusteringService;
}());

module.exports = KMeansClusteringService;
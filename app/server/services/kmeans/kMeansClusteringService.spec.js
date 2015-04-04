'use strict';

var assert = require('assert');
var _ = require('underscore');

var KMeansClusteringService = require('./kMeansClusteringService');
var KMeansCentroid = require('./kMeansCentroid');
var Utils = require('../../utils/utils');
var DataFactory = require('../../dao/dataFactory');

describe('k-Means clustering service works fine', function() {
	
	var k = 2;

	var utils = undefined;
	var clusteringService = undefined;
	var data = undefined;

	before(function() {
		utils = new Utils();
		data = new DataFactory().get('test');
		clusteringService = new KMeansClusteringService(data);
	});

	describe('initRandomCentroids', function() {
		var centroids = undefined;

		before(function() {
			centroids = clusteringService.initRandomCentroids(k);
		});

		it('should not have 0 centroids', function() {
			assert.notEqual(centroids.length, 0);
		});

		it('should have centroids which are from items list', function() {
			var centroidsFromItems = 0;
			centroids.forEach(function(centroid) {
				clusteringService.data.items.forEach(function(item) {
					if (centroid.centerPoint.x === item.x 
							&& centroid.centerPoint.y === item.y) {
						centroidsFromItems++;
					}
				}, this)
			}, this);
			assert.equal(centroids.length, centroidsFromItems);
		});
	});

	describe('shouldStopIterations', function() {
		it('should return true if limit is reached', function() {
			var currentIteration = 10;
			var maxIterations = 10;
			var centroids = [{x: 1, y: 1}, {x: 2, y: 2}];
			assert.equal(true, clusteringService.shouldStopIterations(centroids, centroids, currentIteration, maxIterations));
		});
		
		it('should return true if centroids are equal', function() {
			var c1 = new KMeansCentroid();
			c1.initialize({x: 1, y: 1});

			var c2 = new KMeansCentroid();
			c2.initialize({x: 98, y: 98});

			var centroids = [];
			centroids.push(c1);
			centroids.push(c2);

			var cachedCentroids = [];
			cachedCentroids.push(c1);
			cachedCentroids.push(c2);

			assert.equal(true, clusteringService.shouldStopIterations(centroids, cachedCentroids, 1, 2));
		});
		
		it('should return false if centroids are not equal', function() {
			var c1 = new KMeansCentroid();
			c1.initialize({x: 1, y: 1});

			var c2 = new KMeansCentroid();
			c2.initialize({x: 2, y: 2});

			var c3 = new KMeansCentroid();
			c3.initialize({x: 98, y: 98});

			var c4 = new KMeansCentroid();
			c4.initialize({x: 99, y: 99});

			var centroids = [];
			centroids.push(c1);
			centroids.push(c3);

			var cachedCentroids = [];
			cachedCentroids.push(c2);
			cachedCentroids.push(c4);

			assert.equal(false, clusteringService.shouldStopIterations(centroids, cachedCentroids, 1, 2));
		});
	});

	describe('assignCentroidsToEachDataItem', function() {
		it('should assign closest centroids', function() {
			var c1 = new KMeansCentroid();
			c1.initialize({x: 2, y: 2});

			var c2 = new KMeansCentroid();
			c2.initialize({x: 98, y: 98});

			var centroids = [];
			centroids.push(c1);
			centroids.push(c2);

			clusteringService.assignCentroidsToEachDataItem(centroids);

			clusteringService.data.items.forEach(function(dataItem) {
				if (dataItem.x === 1 || dataItem.x === 2 || dataItem.x === 3) {
					assert.equal(true, c1.equals(dataItem.centroid));
				} else {
					assert.equal(true, c2.equals(dataItem.centroid));
				}
			});			
		});
	});

	describe('recalculateCentroidsAndReturn', function() {
		it('should correctly recalculate centroids', function() {
			var c1 = new KMeansCentroid();
			c1.initialize({x: 1, y: 1});

			var c2 = new KMeansCentroid();
			c2.initialize({x: 99, y: 99});

			var centroids = [];
			centroids.push(c1);
			centroids.push(c2);

			clusteringService.assignCentroidsToEachDataItem(centroids);
			var newCentroids = clusteringService.recalculateCentroidsAndReturn(centroids);
			
			assert.equal(2, newCentroids[0].centerPoint.x);
			assert.equal(2, newCentroids[0].centerPoint.y);
			assert.equal(98, newCentroids[1].centerPoint.x);
			assert.equal(98, newCentroids[1].centerPoint.y);
		});
	});

	describe('convertDataItemsIntoOptimizedArray', function() {
		it('should form an array that has as many items as there are centroids', function() {
			var c1 = new KMeansCentroid();
			c1.initialize({x: 1, y: 1});

			var c2 = new KMeansCentroid();
			c2.initialize({x: 99, y: 99});

			var centroids = [];
			centroids.push(c1);
			centroids.push(c2);

			clusteringService.assignCentroidsToEachDataItem(centroids);
			var formedArray = clusteringService.convertDataItemsIntoOptimizedArray();

			assert.equal(centroids.length, formedArray.length);
			formedArray.forEach(function(formedItem) { assert.equal(3, formedItem.dataItems.length); });
		});
	});

});
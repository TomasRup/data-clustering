'use strict';

var assert = require('assert');

var ClusteringService = require('./clusteringService');
var Utils = require('../utils/utils');

describe('Clustering service works fine', function() {

	var pointsToGenerate = 100;

	var utils = undefined;
	var clusteringService = undefined;

	before(function() {
		utils = new Utils();
	});

	beforeEach(function() {
		var min = 0;
		var max = 100;
		var items = [];

		for (var i = 0 ; i<pointsToGenerate ; i++) {
			var coordinate = {
				x: utils.getRandom(min, max),
				y: utils.getRandom(min, max)
			};

			items.push(coordinate);
		}

		clusteringService = new ClusteringService({
			items: items,
			metadata: {
				minX: min, maxX: max,
				minY: min, maxY: max,
				xName: 'Test X', yName: 'Test Y'
			}
		});
	});

	describe('determineInitialWindows', function() {
		
		var k = pointsToGenerate - 1;
		var a = 5;
		var W = undefined;

		beforeEach(function() {
			W = clusteringService.determineInitialWindows(k, a);
		});

		it('should have ' + k + ' windows', function() {
			assert.equal(W.length, k);
		});

		it('should have all windows of length ' + a, function() {
			W.forEach(function(w) {
				assert.equal(w.lineSize, a);
			});
		});

	});

	describe('findMeanOfPoints', function() {
		
		it('should calculate the right mean', function() {
			var meanObject = clusteringService.findMeanOfPoints(clusteringService.data.items);
			
			var totalX = 0;
			var totalY = 0;

			clusteringService.data.items.forEach(function(item) {
				totalX = totalX + item.x;
				totalY = totalY + item.y;
			}); 

			assert.equal(meanObject.x, totalX / clusteringService.data.items.length);
			assert.equal(meanObject.y, totalY / clusteringService.data.items.length);		
		});

	});

	describe('movement', function() {
		// TODO: implement
	});

	describe('enlargement', function() {
		// TODO: implement
	});

	describe('merging', function() {
		// TODO: implement
	});

	describe('getClustersUsingUKWAlgorithm', function() {
		// TODO: implement
	});

});
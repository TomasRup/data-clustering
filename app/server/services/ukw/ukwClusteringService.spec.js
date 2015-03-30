'use strict';

var assert = require('assert');
var _ = require('underscore');

var UKWClusteringService = require('./ukwClusteringService');
var Utils = require('../../utils/utils');
var KWindow = require('./kWindow');

describe('Unsupervised k-Windows clustering service works fine', function() {

	var min = 0;
	var max = 100;
	var items = [
		{x: 1, y: 1},
		{x: 2, y: 2},
		{x: 3, y: 3},
		{x: 97, y: 97},
		{x: 98, y: 98},
		{x: 99, y: 99}
	];

	var utils = undefined;
	var clusteringService = undefined;

	before(function() {
		utils = new Utils();

		clusteringService = new UKWClusteringService({
			items: items,
			metadata: {
				minX: min, maxX: max,
				minY: min, maxY: max,
				xName: 'Test X', yName: 'Test Y'
			}
		});
	});

	describe('determineInitialWindows', function() {
		
		var k = items.length - 1;
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
		
		it('should not move and have only one point', function() {
			var someW = clusteringService.determineInitialWindows(1, 1)[0];
			var centerOfW = _.clone(someW.getCenter());
			clusteringService.movement(0.0001, someW);
			assert.equal(centerOfW.x, someW.getCenter().x);
			assert.equal(centerOfW.y, someW.getCenter().y);
			assert.equal(1, someW.hasItemsInside(clusteringService.data.items).length);
		});

		it('should move right by 0.5 take one more point', function() {
			var someW = new KWindow();
			someW.initialize(2, 1, 1);

			var centerOfW = _.clone(someW.getCenter());
			clusteringService.movement(0.001, someW);
			assert.equal(centerOfW.x + 0.5, someW.getCenter().x);
			assert.equal(centerOfW.y + 0.5, someW.getCenter().y);
			assert.equal(2, someW.hasItemsInside(clusteringService.data.items).length);
		});

		it('should move left by 1 take two more points', function() {
			var someW = new KWindow();
			someW.initialize(3, 99, 99);

			var centerOfW = _.clone(someW.getCenter());
			clusteringService.movement(0.001, someW);
			assert.equal(centerOfW.x - 1, someW.getCenter().x);
			assert.equal(centerOfW.y - 1, someW.getCenter().y);
			assert.equal(3, someW.hasItemsInside(clusteringService.data.items).length);
		});

	});

	describe('enlargement', function() {
		
		it('should enlarge by one and still have the same amount of points', function() {
			var someW = new KWindow();
			someW.initialize(5, 2, 2);

			var widthOfW = someW.getWidth();
			var heightOfW = someW.getHeight();
			var amountOfPointsInW = someW.hasItemsInside(clusteringService.data.items).length;

			clusteringService.enlargement(0.2, 0.2, 0.2, someW);
			assert.equal(someW.getWidth(), widthOfW + 1);
			assert.equal(someW.getHeight(), heightOfW + 1);
			assert.equal(amountOfPointsInW, someW.hasItemsInside(clusteringService.data.items).length);
		});

	});

	describe('merging', function() {
		
		it('should not merge two very distant windows', function() {
			var W = [];
			
			var w1 = new KWindow();
			w1.initialize(10, 2, 2);
			W.push(w1);

			var w2 = new KWindow();
			w2.initialize(10, 98, 98);
			W.push(w2);

			var sizeOfW = W.length;
			clusteringService.merging(0.9, 0.9, W);
			assert.equal(W.length, sizeOfW);
		});

		it('should merge two close windows into one', function() {
			var W = [];
			
			var w1 = new KWindow();
			w1.initialize(2, 2.0, 2.0);
			W.push(w1);

			var w2 = new KWindow();
			w2.initialize(2, 2.2, 2.2);
			W.push(w2);

			var sizeOfW = W.length;
			clusteringService.merging(0.1, 0.1, W);
			assert.equal(W.length, 1);
		});

	});

});
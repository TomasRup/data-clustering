'use strict';

var assert = require('assert');
var _ = require('underscore');

var KMeansCentroid = require('./kMeansCentroid');

describe('k-Means centroid model works fine', function() {
	
	var centroid = undefined;

	beforeEach(function() {
		centroid = new KMeansCentroid();
	});

	describe('initialize', function() {
		it('should have center point initialized', function() {
			centroid.initialize({x: 1, y: 0.9});
			assert.equal(1, centroid.centerPoint.x);
			assert.equal(0.9, centroid.centerPoint.y);
		});
	});

	describe('equals', function() {
		it('should correctly evaluate equal centroids', function() {
			centroid.initialize({x: 1, y: 1});
			var otherCentroid = new KMeansCentroid();
			otherCentroid.initialize({x: 1, y: 1});
			assert.equal(true, centroid.equals(otherCentroid));
		});

		it('should evaluate unequal centroids', function() {
			centroid.initialize({x: 1, y: 1});
			var otherCentroid = new KMeansCentroid();
			otherCentroid.initialize({x: 2, y: 2});
			assert.equal(false, centroid.equals(otherCentroid));
		});
	});

	describe('distanceTo', function() {
		it('should correctly measure distance to another point', function() {
			centroid.initialize({x: 0, y: 0});
			assert.equal(5, centroid.distanceTo({x: 0, y: 5}));
		});
	});

});
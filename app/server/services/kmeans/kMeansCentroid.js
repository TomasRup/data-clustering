'use strict';

var KMeansCentroid = (function() {

	var _ = require('underscore');

	function KMeansCentroid() {
		this.centerPoint = undefined;
	}

	KMeansCentroid.prototype.initialize = function(centerPoint) {
		if (_.isNaN(centerPoint.x) || _.isNaN(centerPoint.y)) {
			throw new Error("Unable to initialize k-Means centroid!");
		}
		this.centerPoint = centerPoint;
	}

	KMeansCentroid.prototype.equals = function(other) {
		if (this.centerPoint.x === undefined
			|| this.centerPoint.y === undefined 
			|| other.centerPoint.x === undefined 
			|| other.centerPoint.y === undefined) return false;
		return (this.centerPoint.x === other.centerPoint.x
			&& this.centerPoint.y === other.centerPoint.y);
	}

	KMeansCentroid.prototype.distanceTo = function(point) {
		if (this.centerPoint.x === undefined
			|| this.centerPoint.y === undefined 
			|| point.x === undefined 
			|| point.y === undefined) return 0;
		return Math.sqrt(Math.pow(point.x - this.centerPoint.x, 2) + Math.pow(point.y - this.centerPoint.y, 2));
	}

	return KMeansCentroid;
}());

module.exports = KMeansCentroid;
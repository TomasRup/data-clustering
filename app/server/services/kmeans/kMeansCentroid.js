'use strict';

var KMeansCentroid = (function() {

	var _ = require('underscore');

	function KMeansCentroid() {
		this.centerPoint = undefined;
	}

	KMeansCentroid.prototype = {

		initialize: function(centerPoint) {
			if (_.isNaN(centerPoint.x) || _.isNaN(centerPoint.y)) {
				return;
			}
			this.centerPoint = centerPoint;
		},

		equals: function(other) {
			return (this.centerPoint.x === other.centerPoint.x
				&& this.centerPoint.y === other.centerPoint.y);
		},

		distanceTo: function(point) {
			return Math.sqrt(Math.pow(point.x - this.centerPoint.x, 2) + Math.pow(point.y - this.centerPoint.y, 2));
		}

	}

	return KMeansCentroid;
}());

module.exports = KMeansCentroid;
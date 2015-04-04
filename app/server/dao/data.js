'use strict';

var Data = (function() {

	var _ = require('underscore');

	function Data() {
		this.xName = 'None';
		this.yName = 'None';
		this.items = [];
	}

	Data.prototype = {
		getMinX: function() {
			var allX = _.map(this.items, function(item) { return item.x; });
			return _.min(allX);
		},

		getMaxX: function() {
			var allX = _.map(this.items, function(item) { return item.x; });
			return _.max(allX);
		},

		getMinY: function() {
			var allY = _.map(this.items, function(item) { return item.y; });
			return _.min(allY);
		},

		getMaxY: function() {
			var allY = _.map(this.items, function(item) { return item.y; });
			return _.max(allY);
		},

		get: function() {
			return {
				items: this.items,
				metadata: {
					minX: this.getMinX(),
					maxX: this.getMaxX(),
					minY: this.getMinY(),
					maxY: this.getMaxY(),
					xName: this.xName,
					yName: this.yName
				}
			};
		}
	}

	return Data;
}());

module.exports = Data;
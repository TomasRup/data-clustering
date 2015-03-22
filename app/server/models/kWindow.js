'use strict';

var KWindow = (function() {

	var _ = require('underscore');

	function KWindow() {
	}

	KWindow.prototype = {

		initializeX: function(lineSize, centerPointX) {
			this.centerPointX = centerPointX;
			var halfLine = lineSize / 2;
			this.fromX = centerPointX - halfLine;
			this.toX = centerPointX + halfLine;
		},

		initializeY: function(lineSize, centerPointY) {
			this.centerPointY = centerPointY;
			var halfLine = lineSize / 2;
			this.fromY = centerPointY - halfLine;
			this.toY = centerPointY + halfLine;
		},

		initialize: function(lineSize, centerPointX, centerPointY) {
			if (!lineSize || !centerPointX || !centerPointY) {
				throw new Error("Uninitialized values: " + lineSize 
					+ ", " + centerPointX + ", " + centerPointY + ".");
			}

			this.lineSize = lineSize;
			this.initializeX(lineSize, centerPointX);
			this.initializeY(lineSize, centerPointY);

			this.marked = false;
		},

		enlargeX: function(percentage) {
			if (isNaN(percentage)) return;
			var add = parseFloat(this.lineSize * percentage);
			this.initializeX(parseFloat(this.lineSize) + add, this.centerPointX);
		},

		enlargeY: function(percentage) {
			if (isNaN(percentage)) return;
			var add = parseFloat(this.lineSize * percentage);
			this.initializeY(parseFloat(this.lineSize) + add, this.centerPointY);
		},

		getCenter: function() {
			return {
				x: this.centerPointX,
				y: this.centerPointY
			}
		},

		getWidth: function() {
			return Math.abs(this.fromX - this.toX);
		},

		getHeight: function() {
			return Math.abs(this.fromY - this.toY);
		},

		equals: function(other) {
			return (this.fromX === other.fromX
				&& this.toX === other.toX
				&& this.fromY === other.fromY
				&& this.toY === other.toY);
		},

		isItemInside: function(item) {
			if (!item) return false;
			return ((this.fromX <= item.x && item.x <= this.toX) 
				&& (this.fromY <= item.y && item.y <= this.toY));
		},

		hasItemsInside: function(items) {
			var itemsInside = [];
			if (!items) return itemsInside;

			var that = this;
			items.forEach(function(item) {
				if (that.isItemInside(item)) itemsInside.push(item);
			});

			return itemsInside;
		}
	}

	return KWindow;
}());

module.exports = KWindow;
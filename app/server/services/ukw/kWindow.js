'use strict';

var KWindow = (function() {

	var _ = require('underscore');

	function KWindow() {
	}

	KWindow.prototype.initializeX = function(lineSize, centerPointX) {
		this.centerPointX = centerPointX;
		var halfLine = lineSize / 2;
		this.fromX = centerPointX - halfLine;
		this.toX = centerPointX + halfLine;
	}

	KWindow.prototype.initializeY = function(lineSize, centerPointY) {
		this.centerPointY = centerPointY;
		var halfLine = lineSize / 2;
		this.fromY = centerPointY - halfLine;
		this.toY = centerPointY + halfLine;
	}

	KWindow.prototype.isMarked = function() {
		return this.marked;
	}

	KWindow.prototype.mark = function(wId) {
		this.marked = wId;
	}

	KWindow.prototype.getAllMarkedFrom = function(W, wId) {
		var allMarked = [];

		W.forEach(function(w) {
			var mark = w.isMarked();
			if (mark === wId) {
				allMarked.push(w);
			} 
		});

		return allMarked;
	}

	KWindow.prototype.overlaps = function(otherW) {
		if (!otherW) return false;
		return !(otherW.fromX > this.toX
			|| otherW.toX < this.fromX
			|| otherW.toY < this.fromY
			|| otherW.fromY > this.toY);
	}

	KWindow.prototype.numberOfPointsInOverlapment = function(otherW, points) {
		if (!this.overlaps(otherW)) return 0;

		var pointsInThisW = this.hasItemsInside(points);
		var pointsInOtherW = otherW.hasItemsInside(points);

		var numberOfPoints = 0;

		pointsInThisW.forEach(function(pointInThisW) {
			pointsInOtherW.forEach(function(pointInOtherW) {

				if (pointInThisW.x === pointInOtherW.x && pointInThisW.y === pointInOtherW.y) {
					numberOfPoints = numberOfPoints + 1;
				}

			}, this);
		}, this);

		return numberOfPoints;
	}

	KWindow.prototype.initialize = function(lineSize, centerPointX, centerPointY) {
		if (_.isNaN(lineSize) || _.isNaN(centerPointX) || _.isNaN(centerPointY)) {
			throw new Error("Uninitialized values = " + lineSize 
				+ ", " + centerPointX + ", " + centerPointY + ".");
		}

		this.lineSize = lineSize;
		this.initializeX(lineSize, centerPointX);
		this.initializeY(lineSize, centerPointY);

		this.marked = undefined;
	}

	KWindow.prototype.enlargeX = function(percentage) {
		if (isNaN(percentage)) return;
		var add = parseFloat(this.lineSize * percentage);
		this.initializeX(parseFloat(this.lineSize) + add, this.centerPointX);
	}

	KWindow.prototype.enlargeY = function(percentage) {
		if (isNaN(percentage)) return;
		var add = parseFloat(this.lineSize * percentage);
		this.initializeY(parseFloat(this.lineSize) + add, this.centerPointY);
	}

	KWindow.prototype.getCenter = function() {
		return {
			x: this.centerPointX,
			y: this.centerPointY
		}
	}

	KWindow.prototype.getWidth = function() {
		return Math.abs(this.fromX - this.toX);
	}

	KWindow.prototype.getHeight = function() {
		return Math.abs(this.fromY - this.toY);
	}

	KWindow.prototype.equals = function(other) {
		return (this.fromX === other.fromX
			&& this.toX === other.toX
			&& this.fromY === other.fromY
			&& this.toY === other.toY);
	}

	KWindow.prototype.isItemInside = function(item) {
		if (!item) return false;
		return ((this.fromX <= item.x && item.x <= this.toX) 
			&& (this.fromY <= item.y && item.y <= this.toY));
	}

	KWindow.prototype.hasItemsInside = function(items) {
		if (!items) return [];
		var itemsInside = [];
		
		items.forEach(function(item) {
			if (this.isItemInside(item)) {
				itemsInside.push(item);
			}
		}, this);

		return itemsInside;
	}

	return KWindow;
}());

module.exports = KWindow;
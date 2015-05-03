'use strict';

var UKWClusteringService = (function() {

	var Util = require('util');
	var _ = require('underscore');

	var KWindowsResponse = require('./kWindowsResponse');
	var KWindow = require('./kWindow');
	var Service = require('../service');

	function UKWClusteringService(data) {
		UKWClusteringService.super_.call(this);
		if (!data) throw new Error('Data is not defined!');
		this.data = data;
	}	

	Util.inherits(UKWClusteringService, Service);

	UKWClusteringService.prototype.determineInitialWindows = function(k, a) {
		if (this.data.items.length < k) {
			return undefined;
		}

		var minSelection = 0;
		var maxSelection = this.data.items.length - 1;
		var selectedIds = [];

		while (selectedIds.length < k) {
			var randomId = this.utils.getRandom(minSelection, maxSelection);
			if (_.indexOf(selectedIds, randomId) === -1) { 
				selectedIds.push(randomId); 
			}
		}

		var W = [];
		
		for (var i in selectedIds) {
			var kWin = new KWindow();
			kWin.initialize(a, this.data.items[selectedIds[i]].x, this.data.items[selectedIds[i]].y);
			W.push(kWin); 
		}

		return W;
	}

	UKWClusteringService.prototype.findMeanOfPoints = function(pointsInW) {
		if (!pointsInW) return;

		var totalX = 0;
		var totalY = 0;

		pointsInW.forEach(function (point) {
			totalX = totalX + point.x;
			totalY = totalY + point.y;
		});

		var meanX = totalX / pointsInW.length;
		var meanY = totalY / pointsInW.length;
		
		return {
			x: meanX,
			y: meanY
		}
	},

	UKWClusteringService.prototype.movement = function(oV, w) {
		do {
			var previousCenterX = _.clone(w.getCenter().x);
			var previousCenterY = _.clone(w.getCenter().y);

			var itemsInW = w.hasItemsInside(this.data.items);
			var mean = this.findMeanOfPoints(itemsInW);

			w.initialize(w.lineSize, mean.x, mean.y);

			var newCenter = w.getCenter();
			var euclideanDistance = Math.sqrt(Math.pow(previousCenterX - newCenter.x, 2) 
				+ Math.pow(previousCenterY - newCenter.y, 2));
		} while (euclideanDistance > oV);
	}

	/* This implementation is adapted for 2 dimensions: x and y */
	UKWClusteringService.prototype.enlargement = function(oE, oC, oV, w) {
		if (!this.data.items && this.data.items.length > 0) return;

		do {
			var previousAmountOfItems = w.hasItemsInside(this.data.items);

			do {
				var previousAmountOfItemsX = w.hasItemsInside(this.data.items);
				w.enlargeX(oE);
				var newAmountOfItemsX = w.hasItemsInside(this.data.items);
				var newItemsX = newAmountOfItemsX - previousAmountOfItemsX;
				var increaseX = newItemsX / previousAmountOfItemsX;
			} while (increaseX >= oC);

			do {
				var previousAmountOfItemsY = w.hasItemsInside(this.data.items);
				w.enlargeY(oE);
				var newAmountOfItemsY = w.hasItemsInside(this.data.items);
				var newItemsY = newAmountOfItemsY - previousAmountOfItemsY;
				var increaseY = newItemsY / previousAmountOfItemsY;
			} while (increaseY >= oC);

			var newAmountOfItems = w.hasItemsInside(this.data.items);
			var newItems = newAmountOfItems - previousAmountOfItems;
			var increase = newItems / previousAmountOfItems;
		} while (increase >= oC);
	}

	UKWClusteringService.prototype.merging = function(oM, oS, W) {
		W.forEach(function(wJ) {
			if (wJ.isMarked()) return;
			wJ.mark(_.indexOf(W, wJ));
			
			W.forEach(function(wI) {
				if (!wJ.equals(wI) && wJ.overlaps(wI)) {
					var n = wJ.numberOfPointsInOverlapment(wI, this.data.items);
					var wISize = wI.hasItemsInside(this.data.items).length;
					var wJSize = wJ.hasItemsInside(this.data.items).length;

					if (n / wISize >= oS && wISize < wJSize) {
						W.splice(_.indexOf(wI), 1);
					}

					if (0.5 * ((n / wJSize) + (n / wISize)) >= oM) {
						W.forEach(function(wI2) {
							if (wI2.isMarked === _.indexOf(W, wI)) {
								wI2.mark(_.indexOf(W, wJ));
							}
						});
					}

				}
			}, this);

		}, this);
	}

	UKWClusteringService.prototype.calculateClusterCoverage = function(W) {
		var items = _.clone(this.data.items);

		var sumOfObjectsInClusters = 0;
		var totalSumOfObject = items.length;

		W.forEach(function(w) {
			sumOfObjectsInClusters = (sumOfObjectsInClusters 
				+ w.amountOfItemsInside(
					items,
					function(item) { items = _.without(items, item); }));
		}, this);

		return (sumOfObjectsInClusters / totalSumOfObject * 100);
	}

	UKWClusteringService.prototype.getClustersUsingUKWAlgorithm = function(a, oE, oM, oC, oV, oS, k, next) {	
		var timeStarted = new Date();

		var W = this.determineInitialWindows(k, a);
		
		for (var w in W) {
			var wCache = {};
			do {
				wCache = _.clone(W[w]);
				this.movement(oV, W[w]);
				this.enlargement(oE, oC, oV, W[w]);
			} while (!W[w].equals(wCache));

			this.merging(oM, oS, W);
		}

		var timeCompleted = new Date();
		var timeSpent = timeCompleted.getTime() - timeStarted.getTime();

		var response = new KWindowsResponse();
		response
			.withMinX(this.data.metadata.minX)
			.withMaxX(this.data.metadata.maxX)
			.withMinY(this.data.metadata.minY)
			.withMaxY(this.data.metadata.maxY)
			.withClusterCoveragePercentage(this.calculateClusterCoverage(W))
			.withTimeSpent(timeSpent)
			.withXName(this.data.metadata.xName)
			.withYName(this.data.metadata.yName)
			.withTitle(this.data.metadata.title)
			.withKWindows(W)
			.withDataPoints(this.data.items);
		next(response);			
	}

	return UKWClusteringService;
}());

module.exports = UKWClusteringService;
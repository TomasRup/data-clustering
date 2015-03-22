'use strict';

var ClusteringService = (function() {

	var KWindowsGraph = require('../models/kWindowsGraph');
	var KWindow = require('../models/kWindow');
	var _ = require('underscore');

	function ClusteringService(data) {
		this.data = data;
	}	

	ClusteringService.prototype.getClustersUsingUKWAlgorithm = function(a, oE, oM, oC, oV, oS, k, next) {	
		var minX = this.data.metadata.minX;
		var maxX = this.data.metadata.maxX;
		var minY = this.data.metadata.minY;
		var maxY = this.data.metadata.maxY;

		var getRandom = function(low, high) {
			return Math.floor(Math.random() * (high - low + 1) + low);
		}

		var determineInitialWindows = function(k, a, scope, next) {
			if (scope.data.items.length < k) {
				return new Error('Too many windows wanted!');
			}

			var minSelection = 0;
			var maxSelection = scope.data.items.length - 1;

			var selected = {};

			while (Object.keys(selected).length < k) {
				var randomItem = getRandom(minSelection, maxSelection);
				if (selected[randomItem] === undefined) { 
					selected[randomItem] = scope.data.items[randomItem]; 
				}
			}

			var W = [];
			
			for (var i in selected) {
				var kWin = new KWindow();
				kWin.initialize(a, selected[i].x, selected[i].y);
				W.push(kWin); 
			}

			next(W, scope.data.items);
		}

		var findMeanOfPoints = function(pointsInW) {
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
		}

		var movement = function(oV, w, objects) {
			do {
				var previousCenterX = _.clone(w.getCenter().x);
				var previousCenterY = _.clone(w.getCenter().y);

				var itemsInW = w.hasItemsInside(objects);
				var mean = findMeanOfPoints(itemsInW);

				w.initialize(w.lineSize, mean.x, mean.y);

				var newCenter = w.getCenter();
				var euclideanDistance = Math.sqrt(Math.pow(previousCenterX - newCenter.x, 2) 
					+ Math.pow(previousCenterY - newCenter.y, 2));
			} while (euclideanDistance > oV);
		}

		/* This implementation is adapted for 2 dimensions: x and y */
		var enlargement = function(oE, oC, oV, w, objects) {
			if (!objects && objects.length > 0) return;

			do {
				var previousAmountOfItems = w.hasItemsInside(objects);

				do {
					var previousAmountOfItemsX = w.hasItemsInside(objects);
					w.enlargeX(oE);
					var newAmountOfItemsX = w.hasItemsInside(objects);
					var newItemsX = newAmountOfItemsX - previousAmountOfItemsX;
					var increaseX = newItemsX / previousAmountOfItemsX;
				} while (increaseX >= oC);

				do {
					var previousAmountOfItemsY = w.hasItemsInside(objects);
					w.enlargeY(oE);
					var newAmountOfItemsY = w.hasItemsInside(objects);
					var newItemsY = newAmountOfItemsY - previousAmountOfItemsY;
					var increaseY = newItemsY / previousAmountOfItemsY;
				} while (increaseY >= oC);

				var newAmountOfItems = w.hasItemsInside(objects);
				var newItems = newAmountOfItems - previousAmountOfItems;
				var increase = newItems / previousAmountOfItems;
			} while (increase >= oC);
		}

		var merging = function(oM, oS, W, objects) {
			// TODO: implement
		}

		determineInitialWindows(k, a, this, function(W, objects) {
			for (var w in W) {
				var wCache = {};
				do {
					wCache = _.clone(W[w]);
					movement(oV, W[w], objects);
					enlargement(oE, oC, oV, W[w], objects);
				} while (!W[w].equals(wCache));

				merging(oM, oS, W, objects);
			}

			var graph = new KWindowsGraph(
				W,
				objects,
				minX,
				maxX,
				minY,
				maxY,
				'Nupirkta Sprite buteliukų',
				'Nupirkta Coca-Cola buteliukų');

			next(graph);
		});
	}

	return ClusteringService;
}());

module.exports = ClusteringService;
'use strict';

var assert = require('assert');
var _ = require('underscore');

var KWindow = require('./kWindow');

describe('k-Windows model works fine', function() {
	
	var kWindow = undefined;

	beforeEach(function() {
		kWindow = new KWindow();
	});

	describe('initializeX', function() {
		it('should correctly initialize x', function() {
			// TODO: implement
		});
	});

	describe('initializeY', function() {
		it('should correctly initialize y', function() {
			// TODO: implement
		});
	});

	describe('isMarked', function() {
		it('should return if the window is marked', function() {
			// TODO: implement
		});
	});

	describe('mark', function() {
		it('should correctly mark the window', function() {
			// TODO: implement
		});
	});

	describe('getAllMarkedFrom', function() {
		it('should get all marked windows from a windows list', function() {
			// TODO: implement
		});
	});

	describe('overlaps', function() {
		it('should return true if windows overlap', function() {
			// TODO: implement
		});

		it('should return false if windows do not overlap', function() {
			// TODO: implement
		});
	});

	describe('numberOfPointsInOverlapment', function() {
		it('should correctly calculate amount of points in overlapment if windows overlap', function() {
			// TODO: implement
		});

		it('should correctly calculate amount of points in overlapment if windows do not overlap', function() {
			// TODO: implement
		});
	});

	describe('initialize', function() {
		it('should correctly initialize the window', function() {
			// TODO: implement
		});
	});

	describe('enlargeX', function() {
		it('should increase width of the window', function() {
			// TODO: implement
		});
	});

	describe('enlargeY', function() {
		it('should increase height of the window', function() {
			// TODO: implement
		});
	});

	describe('getCenter', function() {
		it('should return the center of the window', function() {
			// TODO: implement
		});

		it('should return undefined for an uninitialized window', function() {
			// TODO: implement
		});
	});

	describe('getWidth', function() {
		it('should correctly return width of the window', function() {
			// TODO: implement
		});
	});

	describe('getHeight', function() {
		it('should correctly return height of the window', function() {
			// TODO: implement
		});
	});

	describe('equals', function() {
		it('should return true for equal windows', function() {
			// TODO: implement
		});

		it('should return false for unequal windows', function() {
			// TODO: implement
		});
	});

	describe('isItemInside', function() {
		it('should return true for a point which is inside the window in graph', function() {
			// TODO: implement
		});

		it('should return false if a point is outside the window in graph', function() {
			// TODO: implement
		});
	});

	describe('hasItemsInside', function() {
		it('should return all items that are inside the window', function() {
			// TODO: implement
		});
	});

});
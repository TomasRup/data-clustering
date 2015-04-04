'use strict';

var TestData = (function() {

	var Util = require('util');
	var Data = require('./data');

	function TestData() {
		TestData.super_.call(this);
		this.xName = 'Test X';
		this.yName = 'Test Y';
		this.items = [
			{x: 1, y: 1},
			{x: 2, y: 2},
			{x: 3, y: 3},
			{x: 97, y: 97},
			{x: 98, y: 98},
			{x: 99, y: 99}
		];
	}

	Util.inherits(TestData, Data);
	return TestData;
}());

module.exports = TestData;
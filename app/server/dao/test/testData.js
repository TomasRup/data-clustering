'use strict';

var TestData = (function() {

	var Util = require('util');
	var Data = require('../data');

	function TestData() {
		TestData.super_.call(this);
		this.xName = 'Test X';
		this.yName = 'Test Y';
		this.items = [
			{x: 1, y: 1, name: 'test'},
			{x: 2, y: 2, name: 'test'},
			{x: 3, y: 3, name: 'test'},
			{x: 97, y: 97, name: 'test'},
			{x: 98, y: 98, name: 'test'},
			{x: 99, y: 99, name: 'test'}
		];
	}

	Util.inherits(TestData, Data);
	return TestData;
}());

module.exports = TestData;
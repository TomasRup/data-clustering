'use strict';

var DataFactory = (function() {

	var _ = require('underscore');

	var ForexData = require('./forexData');
	var PlanetaryData = require('./planetaryData');
	var TestData = require('./testData');

	function DataFactory() {
		this.forexData = new ForexData();
		this.planetaryData = new PlanetaryData();
		this.testData = new TestData();
	}

	DataFactory.prototype = {
		get: function(name) {
			switch (name) {
				case 'forex': 		return this.forexData.get();
				case 'planetary': 	return this.planetaryData.get();
				case 'test': 		return this.testData.get();
				default: 			return new Error('The given data identifier is not defined!');
			}
		}
	}

	return DataFactory;
}());

module.exports = DataFactory;
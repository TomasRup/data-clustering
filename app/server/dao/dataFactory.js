'use strict';

var DataFactory = (function() {

	var _ = require('underscore');

	var ForexData = require('./forex/forexData');
	var PlanetaryData = require('./planetary/planetaryData');
	var TestData = require('./test/testData');

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
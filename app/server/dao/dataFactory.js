'use strict';

var DataFactory = (function() {

	var _ = require('underscore');

	var ForexData = require('./forex/forexData');
	var PlanetaryData = require('./planetary/planetaryData');
	var TestData = require('./test/testData');

	function DataFactory() {
		this.dataTypes = {
			'forex': 	 new ForexData(),
			'planetary': new PlanetaryData(),
			'test':  	 new TestData()
		};
	}

	DataFactory.prototype.getAllTypes = function() {
		var typesMap = _.mapObject(this.dataTypes, function(value, key) { return value.getTitle(); });
		return typesMap;
	}

	DataFactory.prototype.get = function(name) {
		switch (name) {
			case 'forex': 		return this.dataTypes['forex'].get();
			case 'planetary': 	return this.dataTypes['planetary'].get();
			case 'test': 		return this.dataTypes['test'].get();
			default: 			return new Error('The given data identifier is not defined!');
		}
	}

	return DataFactory;
}());

module.exports = DataFactory;
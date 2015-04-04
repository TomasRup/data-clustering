'use strict';

var PlanetaryData = (function() {

	var Util = require('util');
	var Data = require('./data');

	function PlanetaryData() {
		PlanetaryData.super_.call(this);
		this.xName = '';
		this.yName = '';
		this.items = [];
	}

	Util.inherits(PlanetaryData, Data);
	return PlanetaryData;
}());

module.exports = PlanetaryData;
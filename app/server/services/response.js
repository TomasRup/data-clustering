'use strict';

var Response = (function() {

	function Response() {
		this.minX = 0;
		this.maxX = 0;
		this.minY = 0;
		this.maxY = 0;
		this.xName = 'none';
		this.yName = 'none';
		this.title = 'none';
	}

	Response.prototype.withMinX = function(x) {
		this.minX = x;
		return this;
	}

	Response.prototype.withMaxX = function(x) {
		this.maxX = x;
		return this;
	}

	Response.prototype.withMinY = function(y) {
		this.minY = y;
		return this;
	}

	Response.prototype.withMaxY = function(y) {
		this.maxY = y;
		return this;
	}

	Response.prototype.withXName = function(xName) {
		this.xName = xName;
		return this;
	}

	Response.prototype.withYName = function(yName) {
		this.yName = yName;
		return this;
	}

	Response.prototype.withTitle = function(title) {
		this.title = title;
		return this;
	}

	return Response;
}());

module.exports = Response;
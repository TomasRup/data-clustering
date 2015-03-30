'use strict';

var KMeansResponse = (function() {

	function KMeansResponse(
			centroidsWithPoints,
			minX,
			maxX,
			minY,
			maxY,
			xName,
			yName) {
		this.centroidsWithPoints = centroidsWithPoints || [];
		this.minX = minX || 0;
		this.maxX = maxX || 0;
		this.minY = minY || 0;
		this.maxY = maxY || 0;
		this.xName = xName || 'none';
		this.yName = yName || 'none';
	}

	return KMeansResponse;
}());

module.exports = KMeansResponse;
'use strict';

var KWindowsGraph = (function() {

	function KWindowsGraph(
			kWindows,
			dataPoints,
			minX,
			maxX,
			minY,
			maxY,
			xName,
			yName) {
		this.kWindows = kWindows || [];
		this.dataPoints = dataPoints || [];
		this.minX = minX || 0;
		this.maxX = maxX || 0;
		this.minY = minY || 0;
		this.maxY = maxY || 0;
		this.xName = xName || 'none';
		this.yName = yName || 'none';
	}

	return KWindowsGraph;
}());

module.exports = KWindowsGraph;
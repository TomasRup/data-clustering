(function () {
    'use strict';
	
	angular
	.module('data-clustering', [
		'graph.controller',
		'graph.factory',
		'menu.controller'
	])
	.constant('GRAPH_SETTINGS', {
		'width': '900',
		'height': '500' 
	});

})();
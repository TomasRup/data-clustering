(function () {
    'use strict';
	
	angular
	.module('data-clustering', [
		'graph.controller',
		'graph.factory',
		'ukwmenu.controller'
	])
	.constant('GRAPH_SETTINGS', {
		'width': '900',
		'height': '500' 
	})
	.constant('GRAPH_TYPES', {
		ukw: 'ukw'
	});

})();
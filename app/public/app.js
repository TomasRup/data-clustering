(function () {
    'use strict';
	
	angular
	.module('data-clustering', [
		'menu.controller',
		'graph.controller',
		'graph.factory',
		'ukwmenu.controller',
		'kmeansmenu.controller',
		'statistics.controller',
	])
	.constant('GRAPH_SETTINGS', {
		'width': '900',
		'height': '500' 
	})
	.constant('GRAPH_TYPES', {
		ukw: 'ukw',
		kmeans: 'kmeans'
	});

})();
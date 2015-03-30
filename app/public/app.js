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
		ukw: 'Unsupervised k-Windows',
		kmeans: 'k-Means'
	})
	.constant('TEMPLATES', {
        ukw: 'modules/ukwmenu/ukw.tmpl.html',
        kmeans: 'modules/kmeansmenu/kmeans.tmpl.html',
        statistics: 'modules/statistics/statistics.tmpl.html',
        menu: 'modules/menu/menu.tmpl.html'
	})
	.controller('AppController', ['$scope', '$rootScope', 'TEMPLATES', function($scope, $rootScope, TEMPLATES) {
		$scope.menuTemplate = TEMPLATES['menu'];
		$rootScope.currentTemplate = TEMPLATES['ukw'];
	}]);

})();
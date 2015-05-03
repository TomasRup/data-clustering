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
		'dataselection.controller',
		'dataselection.factory'
	])
	.constant('GRAPH_SETTINGS', {
		'width': 900,
		'height': 600,
		'minimizer': 1
	})
	.constant('GRAPH_TYPES', {
		ukw: 'Unsupervised k-Windows',
		kmeans: 'k-Means'
	})
	.constant('TEMPLATES', {
        ukw: 'modules/ukwmenu/ukw.tmpl.html',
        kmeans: 'modules/kmeansmenu/kmeans.tmpl.html',
        statistics: 'modules/statistics/statistics.tmpl.html',
        menu: 'modules/menu/menu.tmpl.html',
        graph: 'modules/graph/graph.tmpl.html',
        dataSelection: 'modules/dataselection/dataSelection.tmpl.html'
	})
	.controller('AppController', ['$scope', '$rootScope', 'TEMPLATES', function($scope, $rootScope, TEMPLATES) {
		$scope.menuTemplate = TEMPLATES['menu'];
		$rootScope.currentTemplate = TEMPLATES['ukw'];
	}]);

})();
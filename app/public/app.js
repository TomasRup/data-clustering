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
		'tester.controller',
		'dataselection.controller'
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
        tester: 'modules/tester/tester.tmpl.html',
        graph: 'modules/graph/graph.tmpl.html',
        dataSelection: 'modules/dataSelection/dataSelection.tmpl.html'
	})
	.constant('DATA_NAMES', {
		forex: 'Forex Data: EUR/USD and EUR/GBP',
		planetary: 'planetary'
	})
	.controller('AppController', ['$scope', '$rootScope', 'TEMPLATES', function($scope, $rootScope, TEMPLATES) {
		$scope.menuTemplate = TEMPLATES['menu'];
		$rootScope.currentTemplate = TEMPLATES['ukw'];
	}]);

})();
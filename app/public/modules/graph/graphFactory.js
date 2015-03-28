(function () {
    'use strict';

    var Graph = function($http, $rootScope, GRAPH_TYPES) {
    	var factory = {};

        $rootScope.graphData = undefined;
        $rootScope.graphStats = [];

        var postGraphDataGet = function(type, response) {
            $rootScope.graphData = { data: response.data, type: type };
            $rootScope.graphStats.push({ type: type, timeSpent: response.data.timeSpent });
        };

    	factory.initAndGetGraphDataByUkw = function(a, oE, oM, oC, oV, oS, k) {
            return $http({
                url: '/getClustersByUkw', 
                method: 'GET',
                params: { a: a, oE: oE, oM: oM, oC: oC, oV: oV, oS: oS, k: k }
            }).then(function(response) { postGraphDataGet(GRAPH_TYPES['ukw'], response); });
    	};

        factory.initAndGetGraphDataByKMeans = function(k) {
            return $http({
                url: '/getClustersByKMeans', 
                method: 'GET',
                params: { k: k }
            }).then(function(response) { postGraphDataGet(GRAPH_TYPES['kmeans'], response); });
        };
    	
    	return factory;
    };

    angular
    	.module('graph.factory', [])
    	.factory('Graph', Graph);

})();
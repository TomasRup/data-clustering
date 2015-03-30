(function () {
    'use strict';

    var Graph = function($http, $rootScope, GRAPH_TYPES) {
    	var factory = {};

        $rootScope.graphData = undefined;
        $rootScope.graphStats = [];

        var getClustersFound = function(type, response) {
            var amountOfClusters = undefined;

            if (type === GRAPH_TYPES['ukw']) {
                amountOfClusters = (response.data.kWindows 
                    ? response.data.kWindows.length 
                    : 0);

            } else if (type === GRAPH_TYPES['kmeans']) {
                amountOfClusters = (response.data.centroidsWithPoints 
                    ? response.data.centroidsWithPoints.length 
                    : 0);
            }

            return amountOfClusters;
        };

        var postGraphDataGet = function(type, response, postedKValue) {
            $rootScope.graphData = { data: response.data, type: type };
            $rootScope.graphStats.push({ 
                type: type, 
                timeSpent: response.data.timeSpent,
                clustersFound: getClustersFound(type, response),
                postedK: postedKValue
            });
        };

    	factory.initAndGetGraphDataByUkw = function(a, oE, oM, oC, oV, oS, k) {
            return $http({
                url: '/getClustersByUkw', 
                method: 'GET',
                params: { a: a, oE: oE, oM: oM, oC: oC, oV: oV, oS: oS, k: k }
            }).then(function(response) { postGraphDataGet(GRAPH_TYPES['ukw'], response, k); });
    	};

        factory.initAndGetGraphDataByKMeans = function(k, maxIterations) {
            return $http({
                url: '/getClustersByKMeans', 
                method: 'GET',
                params: { k: k, maxIterations: maxIterations }
            }).then(function(response) { postGraphDataGet(GRAPH_TYPES['kmeans'], response, k); });
        };
    	
    	return factory;
    };

    angular
    	.module('graph.factory', [])
    	.factory('Graph', Graph);

})();
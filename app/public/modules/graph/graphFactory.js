(function () {
    'use strict';

    var Graph = function($http, $rootScope, GRAPH_TYPES) {
    	var factory = {};

    	factory.initAndGetGraphDataByUkw = function(a, oE, oM, oC, oV, oS, k) {
    		var that = this;
            return $http({
                url: '/getClustersByUkw', 
                method: 'GET',
                params: {
                    a: a,
                    oE: oE, 
                    oM: oM, 
                    oC: oC, 
                    oV: oV,
                    oS: oS,
                    k: k
                }
            })
            .then(function(response) {
                $rootScope.graphData = {
                    data: response.data,
                    type: GRAPH_TYPES['ukw']
                }
            });
    	};
    	
    	return factory;
    };

    angular
    	.module('graph.factory', [])
    	.factory('Graph', Graph);

})();
(function () {
    'use strict';

    var Graph = function($http, $rootScope) {
    	var factory = {};
        factory.rootScope = $rootScope;

    	factory.initAndGetGraphData = function(a, oE, oM, oC, oV, oS, k) {
    		var that = this;
            return $http({
                url: '/clusters', 
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
                that.rootScope.graphData = response.data;
            });
    	};
    	
    	return factory;
    };

    angular
    	.module('graph.factory', [])
    	.factory('Graph', Graph);

})();
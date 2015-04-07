(function () {
    'use strict';

    var DataSelection = function($http, $rootScope) {
    	var factory = {};

    	factory.getSelections = function() {
            return $http({ url: '/getDataTypes', method: 'GET' });
    	};
    	
    	return factory;
    };

    angular
    	.module('dataselection.factory', [])
    	.factory('DataSelection', DataSelection);

})();
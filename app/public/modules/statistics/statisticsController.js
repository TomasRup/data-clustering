(function () {
    'use strict';

    var StatisticsController = function($scope, $rootScope) {
        $scope.tableData = {};
        $scope.$watch(
            function() { return $rootScope.graphStats },
            function(newGraphStats, oldGraphStats) { $scope.tableData = newGraphStats; }, 
            true);
        return(this);
    };

    angular
    	.module('statistics.controller', [])
    	.controller('StatisticsController', StatisticsController);

})();
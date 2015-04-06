(function () {
    'use strict';

    var TesterController = function($scope, $rootScope) {
        var that = this;
        that.rootScope = $rootScope;
        that.scope = $scope;
        that.scope.dataLoaded = false;
        return(that);
    };

    angular
    	.module('tester.controller', [])
    	.controller('TesterController', TesterController);

})();
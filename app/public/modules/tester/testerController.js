(function () {
    'use strict';

    var TesterController = function($scope, $rootScope) {
        var that = this;
        that.rootScope = $rootScope;
        that.scope = $scope;
        return(that);
    };

    TesterController.prototype = {

    };

    angular
    	.module('tester.controller', [])
    	.controller('TesterController', TesterController);

})();
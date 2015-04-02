(function () {
    'use strict';

    var UKWMenuController = function($scope, Graph) {
    	this.scope = $scope;
    	this.scope.a = 0.01;
        this.scope.oE = 0.9;
        this.scope.oM = 0.9;
        this.scope.oC = 0.9;
        this.scope.oV = 0.9;
        this.scope.oS = 0.9;
        this.scope.k = 5;
        this.Graph = Graph;
    	return(this);
    };

    UKWMenuController.prototype = {
    	requestAndInitGraphDataByUkw: function() {
            this.Graph.initAndGetGraphDataByUkw(
                this.scope.a, 
                this.scope.oE, 
                this.scope.oM, 
                this.scope.oC, 
                this.scope.oV,
                this.scope.oS, 
                this.scope.k);
        }
    };

    angular
    	.module('ukwmenu.controller', [])
    	.controller('UKWMenuController', UKWMenuController);

})();
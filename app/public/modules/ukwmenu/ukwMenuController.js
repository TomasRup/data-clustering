(function () {
    'use strict';

    var UKWMenuController = function($scope, $rootScope, Graph, TEMPLATES) {
    	this.scope = $scope;
    	this.scope.a = 0.01;
        this.scope.oE = 2;
        this.scope.oM = 0.9;
        this.scope.oC = 0.9;
        this.scope.oV = 0.9;
        this.scope.oS = 0.9;
        this.scope.k = 5;
        this.scope.times = 1;
        this.scope.TEMPLATES = TEMPLATES; // Needed for graph drawing
        this.rootScope = $rootScope;
        this.Graph = Graph;
    	return(this);
    };

    UKWMenuController.prototype.requestAndInitGraphDataByUkw = function() {
        var that = this;
        var recursiveCalling = function(times) {
            that.Graph.initAndGetGraphDataByUkw(
                    that.scope.a, 
                    that.scope.oE, 
                    that.scope.oM, 
                    that.scope.oC, 
                    that.scope.oV,
                    that.scope.oS, 
                    that.scope.k,
                    that.rootScope.dataSelection)
            .then(function() {
                if (times > 1) recursiveCalling(times - 1);
                else alert("Completed!");
            });
        }

        var times = _.clone(this.scope.times);
        recursiveCalling(times);
    }

    angular
    	.module('ukwmenu.controller', [])
    	.controller('UKWMenuController', UKWMenuController);

})();
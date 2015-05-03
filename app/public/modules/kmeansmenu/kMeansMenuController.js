(function () {
    'use strict';

    var KMeansMenuController = function($scope, $rootScope, Graph, TEMPLATES) {
    	this.scope = $scope;
        this.scope.k = 3;
        this.scope.maxIterations = 1000;
        this.scope.times = 1;
        this.scope.TEMPLATES = TEMPLATES; // Needed for graph drawing
        this.rootScope = $rootScope;
        this.Graph = Graph;
    	return(this);
    };

    KMeansMenuController.prototype.requestAndInitGraphDataByKMeans = function() {
        var that = this;
        var recursiveCalling = function(times) {
            that.Graph.initAndGetGraphDataByKMeans(
                    that.scope.k, 
                    that.scope.maxIterations, 
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
    	.module('kmeansmenu.controller', [])
    	.controller('KMeansMenuController', KMeansMenuController);

})();
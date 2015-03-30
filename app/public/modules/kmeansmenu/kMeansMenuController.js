(function () {
    'use strict';

    var KMeansMenuController = function($scope, Graph) {
    	this.scope = $scope;
        this.scope.k = 3;
        this.scope.maxIterations = 1000;
        this.Graph = Graph;
    	return(this);
    };

    KMeansMenuController.prototype = {
        requestAndInitGraphDataByKMeans: function() {
            this.Graph.initAndGetGraphDataByKMeans(this.scope.k, this.scope.maxIterations);
        }
    };

    angular
    	.module('kmeansmenu.controller', [])
    	.controller('KMeansMenuController', KMeansMenuController);

})();
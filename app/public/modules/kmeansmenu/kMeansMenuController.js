(function () {
    'use strict';

    var KMeansMenuController = function($scope, $rootScope, Graph, TEMPLATES) {
    	this.scope = $scope;
        this.scope.k = 3;
        this.scope.maxIterations = 1000;
        this.scope.TEMPLATES = TEMPLATES;
        this.rootScope = $rootScope;
        this.Graph = Graph;
    	return(this);
    };

    KMeansMenuController.prototype.requestAndInitGraphDataByKMeans = function() {
        this.Graph.initAndGetGraphDataByKMeans(this.scope.k, this.scope.maxIterations, this.rootScope.dataSelection);
    }

    angular
    	.module('kmeansmenu.controller', [])
    	.controller('KMeansMenuController', KMeansMenuController);

})();
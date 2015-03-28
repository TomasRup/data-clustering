(function () {
    'use strict';

    var KMeansMenuController = function($scope, Graph) {
    	this.scope = $scope;
        this.scope.k = 2;
        this.Graph = Graph;
    	return(this);
    };

    KMeansMenuController.prototype = {
        requestAndInitGraphDataByKMeans: function() {
            this.Graph.initAndGetGraphDataByKMeans(this.scope.k);
        }
    };

    angular
    	.module('kmeansmenu.controller', [])
    	.controller('KMeansMenuController', KMeansMenuController);

})();
(function () {
    'use strict';

    var MenuController = function($scope, $rootScope) {
        var that = this;
        that.rootScope = $rootScope;

        that.scope = $scope;
        that.scope.templates = {
            ukw: 'templates/ukw.html',
            kmeans: 'templates/kmeans.html',
            statistics: 'templates/statistics.html'
        };
        that.scope.currentTemplate = that.scope.templates['ukw'];

        return(that);
    };

    MenuController.prototype = {

        switchTemplate: function(name) {
            if (!this.scope.templates[name]) return;
            this.scope.currentTemplate = this.scope.templates[name];
            this.rootScope.graphData = undefined;
        }

    };

    angular
    	.module('menu.controller', [])
    	.controller('MenuController', MenuController);

})();
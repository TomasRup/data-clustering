(function () {
    'use strict';

    var MenuController = function($scope, $rootScope, TEMPLATES) {
        var that = this;
        that.rootScope = $rootScope;
        that.scope = $scope;
        that.scope.TEMPLATES = TEMPLATES;
        return(that);
    };

    MenuController.prototype.switchTemplate = function(name) {
        if (!this.scope.TEMPLATES[name]) return;
        this.rootScope.currentTemplate = this.scope.TEMPLATES[name];
        this.rootScope.graphData = undefined;
    }

    angular
    	.module('menu.controller', [])
    	.controller('MenuController', MenuController);

})();
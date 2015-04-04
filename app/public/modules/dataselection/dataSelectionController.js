(function () {
    'use strict';

    var DataSelectionController = function($scope, $rootScope, DATA_NAMES) {
        var that = this;
        that.scope = $scope;
        that.scope.selectedData = Object.keys(DATA_NAMES)[0];
        that.scope.DATA_NAMES = DATA_NAMES;
        that.rootScope = $rootScope;
        this.initDataSelection();
        return(that);
    };

    DataSelectionController.prototype = {
        initDataSelection: function() {
            if (!this.scope.selectedData) return;
            this.rootScope.dataSelection = this.scope.selectedData;
        }
    }

    angular
    	.module('dataselection.controller', [])
    	.controller('DataSelectionController', DataSelectionController);

})();
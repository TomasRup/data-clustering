(function () {
    'use strict';

    var DataSelectionController = function($scope, $rootScope, DataSelection) {
        var that = this;
        that.scope = $scope;
        that.scope.selectedData = null;
        that.scope.selectionOptions = {};
        that.rootScope = $rootScope;
        that.DataSelection = DataSelection;
        that.initDataSelection();
        return(that);
    };

    DataSelectionController.prototype.initDataSelection = function() {
        var that = this;
        this.DataSelection.getSelections().then(function(response) {
            var options = response.data;
            that.scope.selectionOptions = options;
            that.scope.selectedData = Object.keys(options)[0];
            that.changeDataSelection();
        });
    }

    DataSelectionController.prototype.changeDataSelection = function() {
        if (!this.scope.selectedData) return;
        this.rootScope.dataSelection = this.scope.selectedData;
    }

    angular
    	.module('dataselection.controller', [])
    	.controller('DataSelectionController', DataSelectionController);

})();
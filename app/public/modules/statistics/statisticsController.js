(function () {
    'use strict';

    var StatisticsController = function($scope, $rootScope) {
        var that = this;
        that.scope = $scope;
        that.rootScope = $rootScope;

        that.scope.tableData = {};
        that.scope.tableData.stats = [];
        
        that.scope.$watch(
            function() { 
                return that.rootScope.graphStats 
            },
            function(newGraphStats, oldGraphStats) { 
                that.scope.tableData = newGraphStats; 
                that.initSummary(); 
            }, 
            true);


        return(that);
    };

    StatisticsController.prototype.initSummary = function() {
        var stats = {};

        this.scope.tableData.forEach(function(dataItem) {
            if (stats[dataItem.type] === undefined) {
                stats[dataItem.type] = {};
                stats[dataItem.type].timesLaunched = 0;
                stats[dataItem.type].coverageData = [];
                stats[dataItem.type].timeData = [];
            }

            stats[dataItem.type].timesLaunched++;
            stats[dataItem.type].timeData.push(dataItem.timeSpent);
            stats[dataItem.type].coverageData.push(dataItem.sumOfObjectsInClusters);
        });

        var that = this;
        that.scope.tableData.stats = {};
        _.keys(stats).forEach(function(statsKey) {
            that.scope.tableData.stats[statsKey] = {};
            
            // Times launched
            that.scope.tableData.stats[statsKey].timesLaunched = stats[statsKey].timesLaunched;

            // Speed average
            var sum = 0;
            _.each(stats[statsKey].timeData, function(timeDataItem) { sum += timeDataItem; });
            that.scope.tableData.stats[statsKey].lengthAverage = sum / stats[statsKey].timeData.length;
            
            // Speed median
            var sortedTimeData = _.clone(stats[statsKey].timeData);
            sortedTimeData.sort();
            var middle = Math.floor((sortedTimeData.length - 1) / 2.0);
            that.scope.tableData.stats[statsKey].lengthMedian = (sortedTimeData.length % 2
                ? sortedTimeData[middle]
                : (sortedTimeData[middle] + sortedTimeData[middle + 1] / 2.0));

            // Coverage average
            sum = 0;
            _.each(stats[statsKey].coverageData, function(coverageDataItem) { sum += coverageDataItem; });
            that.scope.tableData.stats[statsKey].averageObjectsInClusters = parseFloat(sum / stats[statsKey].coverageData.length).toFixed(2);

            // Coverage median
            var sortedCoverageData = _.clone(stats[statsKey].coverageData);
            sortedCoverageData.sort();
            middle = Math.floor((sortedCoverageData.length - 1) / 2.0);
            that.scope.tableData.stats[statsKey].coverageMedian = (sortedCoverageData.length % 2
                ? sortedCoverageData[middle]
                : ((sortedCoverageData[middle] + sortedCoverageData[middle + 1]) / 2.0));
        });
    }

    angular
    	.module('statistics.controller', [])
    	.controller('StatisticsController', StatisticsController);

})();
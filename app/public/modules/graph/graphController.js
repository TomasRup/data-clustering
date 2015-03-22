(function () {
    'use strict';

    var GraphController = function($scope, $rootScope, GRAPH_SETTINGS) {
        var that = this;

        that.scope = $scope;

        that.scope.width = GRAPH_SETTINGS.width;
        that.scope.height = GRAPH_SETTINGS.height;

        that.xParticle = 1;
        that.yParticle = 1;
        this.paddingFromAxis = 10;

        that.paper = new Raphael(
                document.getElementById('canvasContainer'), 
                this.scope.width, 
                this.scope.height);

        that.scope.$watch(
            function() { return $rootScope.graphData; }, 
            function(newData, oldData) { that.drawNewGraph(newData); }, 
            true);

        return(that);
    };

    GraphController.prototype = {

        calcLineLength: function(fromPoint, toPoint) {
            return Math.abs(fromPoint - toPoint);
        },

    	drawNewGraph: function(graphData) {
            if (!graphData) {
                return;
            }            

            this.paper.clear();
            var set = undefined;

            // Calculating max allowed size of one particle of the graph
            this.xParticle = (this.scope.width / this.calcLineLength(graphData.minX, graphData.maxX));
            this.yParticle = (this.scope.height / this.calcLineLength(graphData.minY, graphData.maxY));

            // Writing text of data
            var yCenter = parseInt(this.scope.height / 2);
            var xCenter = parseInt(this.scope.width / 2)

            var xLabel = graphData.xName + '  [' + graphData.minX + '..' + graphData.maxX + ']';
            var yLabel = graphData.yName + '  [' + graphData.minY + '..' + graphData.maxY + ']';

            this.paper.setStart();
            this.paper.text(this.paddingFromAxis, yCenter, yLabel).rotate(90, this.paddingFromAxis, yCenter);
            this.paper.text(xCenter, this.paddingFromAxis, xLabel);
            set = this.paper.setFinish();
            set.attr({
                fill: '#444444'
            });

            // Drawing data points
            this.paper.setStart();
            
            angular.forEach(graphData.dataPoints, function(point) {
                this.paper.circle(
                    (point.x * this.xParticle) + this.paddingFromAxis, 
                    (point.y * this.yParticle) + this.paddingFromAxis, 
                    3);
            }, this);

            set = this.paper.setFinish();
            set.attr({
                'fill': '#1b809e',
                'stroke-width': 0
            });

            // Drawing windows
            this.paper.setStart();

            angular.forEach(graphData.kWindows, function(kWindow) {
                this.paper.rect(
                    (kWindow.fromX * this.xParticle) + this.paddingFromAxis, 
                    (kWindow.fromY * this.yParticle) + this.paddingFromAxis, 
                    this.calcLineLength(kWindow.fromX, kWindow.toX) * this.xParticle,
                    this.calcLineLength(kWindow.fromY, kWindow.toY) * this.yParticle);
            }, this);

            set = this.paper.setFinish();
            set.attr({
                'stroke': '#aa6708',
                'stroke-width': 1
            });
        }

    };

    angular
    	.module('graph.controller', [])
    	.controller('GraphController', GraphController);

})();
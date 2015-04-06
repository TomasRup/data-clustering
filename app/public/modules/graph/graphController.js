(function () {
    'use strict';

    var GraphController = function($scope, $rootScope, GRAPH_SETTINGS, GRAPH_TYPES) {
        var that = this;

        that.scope = $scope;
        that.scope.width = GRAPH_SETTINGS.width;
        that.scope.height = GRAPH_SETTINGS.height;
        that.scope.GRAPH_TYPES = GRAPH_TYPES;

        that.pointSize = 2;
        that.hoverPointSize = 5;

        that.xParticle = 1;
        that.yParticle = 1;
        that.moveLeftBy = 0;
        that.moveUpBy = 0;

        that.paddingFromAxis = 20;
        that.graphMinimizer = GRAPH_SETTINGS.minimizer;

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

    GraphController.prototype.randomDarkColor = function() {
        var randomTwoLettersOfColor = function() {
            var randomHexNumber = Math.floor(Math.random() * 250).toString(16);
            return (randomHexNumber.length < 2 ? '0'.concat(randomHexNumber) : randomHexNumber);
        };

        return ('#' + randomTwoLettersOfColor() + randomTwoLettersOfColor() + randomTwoLettersOfColor());
    }

    GraphController.prototype.calcLineLength = function(fromPoint, toPoint) {
        return Math.abs(fromPoint - toPoint);
    }

    GraphController.prototype.initOnClickEventOnPoint = function(pointElement, labelForExplanatoryText) {
        var pointName = pointElement.data('name');

        var normalPointSize = this.pointSize;
        var hoverPointSize = this.hoverPointSize;

        pointElement.hover(
            // on
            function() {
                var xName = labelForExplanatoryText.data('xName');
                var yName = labelForExplanatoryText.data('yName');
                var labelText = '"' + this.data('name') + '"' 
                    + '\n' + xName + ': ' + this.data('x') 
                    + '\n' + yName + ': ' + this.data('y');
                labelForExplanatoryText.attr({'text': labelText});
                this.attr({'r': hoverPointSize});
            }, 
            // off
            function() {
                labelForExplanatoryText.attr({'text': ''});
                this.attr({'r': normalPointSize});
            });
    }

    GraphController.prototype.initPointDataToPointElement = function(point, pointElement) {
        pointElement.data('name', point.name);
        pointElement.data('x', point.x);
        pointElement.data('y', point.y);
    }

    GraphController.prototype.drawByUkw = function(data, set, labelForExplanatoryText) {
        // Drawing data points
        this.paper.setStart();
        
        angular.forEach(data.dataPoints, function(point) {
            var pointElement = this.paper.circle(
                (point.x * this.xParticle) - this.moveLeftBy + this.paddingFromAxis, 
                (point.y * this.yParticle) - this.moveUpBy + this.paddingFromAxis, 
                this.pointSize);
            this.initPointDataToPointElement(point, pointElement);
            this.initOnClickEventOnPoint(pointElement, labelForExplanatoryText);
        }, this);

        set = this.paper.setFinish();
        set.attr({
            'fill': this.randomDarkColor(),
            'stroke-width': 0
        });

        // Drawing windows
        this.paper.setStart();

        angular.forEach(data.kWindows, function(kWindow) {
            this.paper.rect(
                (kWindow.fromX * this.xParticle) - this.moveLeftBy + this.paddingFromAxis, 
                (kWindow.fromY * this.yParticle) - this.moveUpBy + this.paddingFromAxis, 
                this.calcLineLength(kWindow.fromX, kWindow.toX) * this.xParticle,
                this.calcLineLength(kWindow.fromY, kWindow.toY) * this.yParticle);
        }, this);

        set = this.paper.setFinish();
        set.attr({
            'stroke': this.randomDarkColor(),
            'stroke-width': 1
        });
    }

    GraphController.prototype.drawByKMeans = function(data, set, labelForExplanatoryText) {
        data.centroidsWithPoints.forEach(function(centroidsWithPoint) {
            var color = this.randomDarkColor();

            // Drawing centroid
            var centerPoint = centroidsWithPoint.centroid.centerPoint;                
            this.paper.setStart();
            this.paper.rect(
                (centerPoint.x * this.xParticle) - this.moveLeftBy + this.paddingFromAxis,
                (centerPoint.y * this.yParticle) - this.moveUpBy + this.paddingFromAxis,
                this.pointSize * 6,
                this.pointSize * 6);
            set = this.paper.setFinish();
            set.attr({
                'fill': color,
                'stroke': color,
                'stroke-width': 3,
            });

            // Drawing points around centroid
            this.paper.setStart();
            centroidsWithPoint.dataItems.forEach(function(point) {
                var pointElement = this.paper.circle(
                    (point.x * this.xParticle) - this.moveLeftBy + this.paddingFromAxis, 
                    (point.y * this.yParticle) - this.moveUpBy + this.paddingFromAxis, 
                    this.pointSize);
                this.initPointDataToPointElement(point, pointElement);
                this.initOnClickEventOnPoint(pointElement, labelForExplanatoryText);
            }, this);
            set = this.paper.setFinish();
            set.attr({
                'fill': color,
                'stroke': color,
            });
        }, this);
    }

	GraphController.prototype.drawNewGraph = function(graphData) {
        if (!graphData) return;
        var data = graphData.data;

        this.paper.clear();
        var set = undefined;

        // Calculating max allowed size of one particle of the graph
        this.xParticle = (this.scope.width / (this.calcLineLength(data.minX, data.maxX))) * this.graphMinimizer;
        this.yParticle = (this.scope.height / (this.calcLineLength(data.minY, data.maxY))) * this.graphMinimizer;

        // Calculating by how much points should move left
        this.moveLeftBy = data.minX * this.xParticle;
        this.moveUpBy = data.minY * this.yParticle;

        // Writing text on axis
        var yCenter = parseInt(this.scope.height / 2);
        var xCenter = parseInt(this.scope.width / 2)

        var xLabel = data.xName + '  [' + data.minX + '..' + data.maxX + ']';
        var yLabel = data.yName + '  [' + data.minY + '..' + data.maxY + ']';

        this.paper.setStart();
        this.paper.text(this.paddingFromAxis, yCenter, yLabel).rotate(90, this.paddingFromAxis, yCenter);
        this.paper.text(xCenter, this.paddingFromAxis, xLabel);
        set = this.paper.setFinish();
        set.attr({
            fill: '#444444'
        });

        // Drawing an empty-text-label for explanatory texts
        var labelForExplanatoryText = this.paper.text(
            this.paddingFromAxis, 
            this.scope.height - this.paddingFromAxis, 
            '');
        labelForExplanatoryText.attr({
            'font-weight': 'bold',
            'font-size': 11,
            'text-anchor': 'start'
        });
        labelForExplanatoryText.data('xName', data.xName);
        labelForExplanatoryText.data('yName', data.yName);

        // Continuing to draw graph according to what algorithm it should be drawed
        if (graphData.type === this.scope.GRAPH_TYPES['ukw']) {
            this.drawByUkw(data, set, labelForExplanatoryText);
        } else if (graphData.type === this.scope.GRAPH_TYPES['kmeans']) {
            this.drawByKMeans(data, set, labelForExplanatoryText);
        }
    }

    angular
    	.module('graph.controller', [])
    	.controller('GraphController', GraphController);

})();
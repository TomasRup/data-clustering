'use strict';

var Routes = (function() {

	var NavigationController = require('../controllers/navigation/navigationController');
	var ClusteringController = require('../controllers/clustering/clusteringController');

	function Routes(app) {
		this.app = app;
		this.navigationController = new NavigationController();
		this.clusteringController = new ClusteringController();
	}

	Routes.prototype.init = function() {
		var that = this;

		this.app.get('/getClustersByUkw', function(req, res) { 
			that.clusteringController.getClustersByUkw(req, res); 
		});

		this.app.get('/getClustersByKMeans', function(req, res) { 
			that.clusteringController.getClustersByKMeans(req, res); 
		});
		
		this.app.get('*', function(req, res) { 
			that.navigationController.homePage(req, res)
		});
	}

	return Routes;
}());

module.exports = Routes;
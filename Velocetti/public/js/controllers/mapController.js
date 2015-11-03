app.controller('mapController', ['$scope', 'userService', '$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", 'leafletData', "$location", "$timeout", function($scope, userService, $routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, leafletData, $location, $timeout) {


	$scope.openToast = function(message) {
	  $mdToast.show($mdToast.simple().content(message).position("top right"));
	  // Could also do $mdToast.showSimple('Hello');
	};
	$scope.mapCenter = {
		lat: 40.0164106,
		lng: 105.2201631,
		zoom: 12
	};

	$timeout(function() {
		if (userService.location) {
			leafletData.getMap().then(function(map) {
			  setTimeout(function() {
			    map.invalidateSize(); // this fixes Map render Bug
			  }, 200);
			}); ////leafletData.getMap().then(function(map) {
				console.log(userService.location);
			$scope.mapCenter = userService.location;
			$scope.openToast("50 miliseconds");
			$scope.$digest();
		} else {
			leafletData.getMap().then(function(map) {
			  setTimeout(function() {
			    map.invalidateSize(); // this fixes Map render Bug
			  }, 200);
			}); ////leafletData.getMap().then(function(map) {
			$scope.openToast("5000 miliseconds");
			$timeout(function() {
				if (userService.location) {
					$scope.mapCenter = userService.location;
					$scope.$digest();

				}
			}, 5000);
		}
	}, 1000);


}]);
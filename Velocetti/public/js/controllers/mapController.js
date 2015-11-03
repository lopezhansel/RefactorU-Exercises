app.controller('mapController', ['$scope', 'userService', '$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", 'leafletData', "$location", "$timeout", function($scope, userService, $routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, leafletData, $location, $timeout) {

	console.log(userService.hansel);
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
			$scope.mapCenter = userService.location;
			$scope.openToast("50 miliseconds");
		} else {

			$scope.openToast("5000 miliseconds");
			$timeout(function() {
				if (userService.location) {
					$scope.mapCenter = userService.location;
				}
			}, 5000);
		}
	}, 50);


}]);
app.controller('mapController', ['$scope', 'userService', '$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", 'leafletData', "$location", "$timeout", function($scope, userService, $routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, leafletData, $location, $timeout) {
	if (userService.me=== "there"){ $location.path("/login");} 
	else{
		
		$scope.mapMarkerss = userLocToMarkers(userService.users);
		$interval(function() {
			$scope.mapMarkerss = userLocToMarkers(userService.users);
		}, 500);
	}

	$scope.mapCenter = {
		lat: 40.0164106,
		lng: -105.2201631,
		zoom: 12
	};

	$timeout(function() {
		if (userService.location) {
			leafletData.getMap().then(function(map) {
				setTimeout(function() {
					map.invalidateSize(); // this fixes Map render Bug
				}, 200);
			}); ////leafletData.getMap().then(function(map) {

			$scope.mapCenter = userService.location;

			$scope.$digest();
		} else {
			leafletData.getMap().then(function(map) {
				setTimeout(function() {
					map.invalidateSize(); // this fixes Map render Bug
				}, 200);
			}); ////leafletData.getMap().then(function(map) {
			$timeout(function() {
				if (userService.location) {
					$scope.mapCenter = userService.location;
					$scope.$digest();


				}
			}, 5000);
		}
	}, 1000);


}]);
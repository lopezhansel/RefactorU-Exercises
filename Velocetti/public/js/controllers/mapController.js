app.controller('mapController', ['$scope', 'userService', '$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", 'leafletData', "$location","$timeout", function($scope, userService, $routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, leafletData, $location,$timeout) {

		console.log(userService.hansel);

	$scope.mapCenter = {
		lat: 40.0164106,
		lng: 105.2201631,
		zoom: 12
	};
	$timeout(function  () {
		if(userService.location){
			$scope.mapCenter = userService.location;
		}else{

			$timeout(function  () {
				if(userService.location){
					$scope.mapCenter = userService.location;
				}
			}, 5000);
		}
	}, 500);


}]);
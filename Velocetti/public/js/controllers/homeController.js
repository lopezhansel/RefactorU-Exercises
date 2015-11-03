app.controller('indexCtrl', ['$scope', '$mdSidenav', 'userService', '$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", 'leafletData', "$location", function($scope, $mdSidenav, userService, $routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, leafletData, $location) {

	$scope.redirect = function(urlStr) {
		$location.path(urlStr);
	};
	$scope.ngViewToggle = function(urlStr) {
		return $location.$$path === urlStr;
	};

	$scope.me = {};
	$scope.me = userService.me;

	$scope.selectedIndex = 0;
	$scope.switchTabs = function(leftOrRight) {
		console.log("switchTabs");
		$scope.selectedIndex = $scope.selectedIndex + leftOrRight;
		if ($scope.selectedIndex < 0) {
			$scope.selectedIndex = 0;
		}
	};

	$scope.toggleSidenav = function(menuId) {
		$mdSidenav(menuId).toggle();
	};


}]);



// setMapCenter()
// $mdMedia()


// // $scope.me
// selectedIndex
app.controller('indexController', ['$scope', '$mdSidenav', 'userService', '$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", 'leafletData', "$location","$timeout", 
	function($scope, $mdSidenav, userService, $routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, leafletData, $location,$timeout) {

	$scope.redirect = function(urlStr) {
		$location.path(urlStr);
	};
	$scope.ngViewToggle = function(urlStr) {
		if ($location.$$path === '/map'){$scope.selectedIndex = 1; }
		if ($location.$$path === '/messages'){$scope.selectedIndex = 2; }
		if ($location.$$path === '/login'){$scope.selectedIndex = 3; }
		if ($location.$$path === '/home'){$scope.selectedIndex = 0; }
		if ($location.$$path === '/accountSettings'){$scope.selectedIndex = 4; }
		return $location.$$path === urlStr;
	};

	$scope.me = {};

	$scope.me = userService.me;

	$scope.selectedIndex = 2;
	$scope.switchTabs = function(leftOrRight) {
		console.log("switchTabs");
		$scope.selectedIndex = $scope.selectedIndex + leftOrRight;
		console.log($scope.selectedIndex);
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
// smallmouse892
// tunafish
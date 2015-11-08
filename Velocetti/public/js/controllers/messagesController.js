app.controller('profileController', ['$scope', 'userService', '$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", 'leafletData', "$location", "$timeout",
	function($scope, userService, $routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, leafletData, $location, $timeout) {


		// $scope.users = userService.users;
		$timeout(function() {
			if (userService.me === "there") {$location.path("/login"); }
			if (userService.selectUserProfile) {
			$scope.user = userService.selectUserProfile;
				
			}else{
				
			$scope.user = userService.me;
			}

			// $scope.users = userService.users;
		}, 50);

	}
]);
app.controller('profileController', ['$scope', 'mainService', '$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", 'leafletData', "$location", "$timeout",
	function($scope, mainService, $routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, leafletData, $location, $timeout) {


		// $scope.users = mainService.users;
		$timeout(function() {
			if (mainService.me === "there") {$location.path("/login"); }
			if (mainService.selectUserProfile) {
			$scope.user = mainService.selectUserProfile;
				
			}else{
				
			$scope.user = mainService.me;
			}

			// $scope.users = mainService.users;
		}, 50);

	}
]);
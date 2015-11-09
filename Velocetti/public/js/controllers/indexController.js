app.controller('indexController', ['$scope', '$mdSidenav', 'mainService', '$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", 'leafletData', "$location", "$timeout",
	function($scope, $mdSidenav, mainService, $routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, leafletData, $location, $timeout) {

		$scope.redirect = function(urlStr) {
			$location.path(urlStr);
		};
		$scope.ngViewToggle = function(urlStr) {
			if ($location.$$path === '/map')       {$scope.selectedIndex = 1; }
			if ($location.$$path === '/profile')   {$scope.selectedIndex = 2; }
			if ($location.$$path === '/login')     {$scope.selectedIndex = 3; }
			if ($location.$$path === '/home')      {$scope.selectedIndex = 0; }
			if ($location.$$path === '/requests')  {$scope.selectedIndex = 4; }
			return $location.$$path === urlStr;
		};
		$scope.me = mainService.me;
		$timeout(function() {
			$scope.me = mainService.me;

		}, 1000);
		$scope.selectedIndex = 2;
		$scope.switchTabs = function(leftOrRight) {
			console.log("switchTabs");
			$scope.selectedIndex = $scope.selectedIndex + leftOrRight;
			console.log($scope.selectedIndex);
			if ($scope.selectedIndex < 0) {
				$scope.selectedIndex = 0;
			}
		};
		$scope.goToProfile = function  (user) {
		    mainService.selectUserProfile = user;
	
			$location.path("/profile");
		};
		$scope.toggleSidenav = function(menuId) {
			$mdSidenav(menuId).toggle();
		};
		$scope.newRequest = function(ev, index) {
			$scope.userPassed = index;
			$mdDialog.show({
					locals: {
						currentUserPopUP: $scope.userPassed
					},
					controller: requestController,
					templateUrl: '/views/requestDialog.html',
					parent: angular.element(document.body),
					targetEvent: ev,
					clickOutsideToClose: true
				})
				.then(function(answer) {
					$location.path("/requests");

					$scope.status = 'You said the information was "' + answer + '".';
				}, function() {
					$scope.status = 'You cancelled the dialog.';
				});



		};


	}
]);



function requestController($scope, $mdDialog, $http, mainService) {
	$scope.me = mainService.me;
	console.log($scope.me);
	$scope.hide = function() {
		$mdDialog.hide();
	};
	$scope.cancel = function() {
		$mdDialog.cancel();
	};
	var socket = io();
	$scope.emitNewRequest = function() {
		// console.log($scope.me.pictureMd);
		var emitObject = {
			firstName : mainService.me.firstName.capitalizeFirstLetter(),
			lastName: mainService.me.lastName.capitalizeFirstLetter(),
			what: $scope.me.what,
			email: mainService.me.email,
			cell: $scope.me.cell,
			lat: mainService.location.lat,
			lon: mainService.location.lng,
			timeStamp: Date.now(),
			pictureMd : $scope.me.pictureMd
		};
		socket.emit("newRequest", emitObject);
		$mdDialog.hide();
	};

	$scope.answer = function(answer) {
		$mdDialog.hide(answer);
	};
	$scope.signup = function() {
		$mdDialog.hide();
	};
	$scope.logion = function(argument) {
		console.log($scope.signupForm);
		$http({
			method: 'POST',
			url: '/login',
			data: $scope.signupForm
		}).then(function(returnData) {
			console.log(returnData);
			if (returnData.data) {
				window.location.href = "/";
			} else {
				console.log(returnData);
			}
		});
		$mdDialog.hide();
	};
}
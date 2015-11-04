app.controller('indexController', ['$scope', '$mdSidenav', 'userService', '$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", 'leafletData', "$location","$timeout", 
	function($scope, $mdSidenav, userService, $routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, leafletData, $location,$timeout) {
	$scope.topDirections = ['left', 'up'];
	 $scope.bottomDirections = ['down', 'right'];
	 $scope.isOpen = false;
	 $scope.availableModes = ['md-fling', 'md-scale'];
	 $scope.selectedMode = 'md-fling';
	 $scope.availableDirections = ['up', 'down', 'left', 'right'];
	 $scope.selectedDirection = 'up';


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
	$scope.newRequest = function(ev, index) {
	  $scope.userPassed = index;
	  $mdDialog.show({
	      locals: {
	        currentUserPopUP: $scope.userPassed
	      },
	      controller: requestController,
	      templateUrl: '/views/requestView.html',
	      parent: angular.element(document.body),
	      targetEvent: ev,
	      clickOutsideToClose: true
	    })
	    .then(function(answer) {
	      $scope.status = 'You said the information was "' + answer + '".';
	    }, function() {
	      $scope.status = 'You cancelled the dialog.';
	    });
	};


}]);



function requestController($scope, $mdDialog, $http) {
  $scope.hide = function() {$mdDialog.hide(); };
  $scope.cancel = function() {$mdDialog.cancel(); };
  $scope.answer = function(answer) {$mdDialog.hide(answer); };
  $scope.signup = function  () {
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
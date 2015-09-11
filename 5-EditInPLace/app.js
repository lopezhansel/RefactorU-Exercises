
var app = angular.module('myApp', [])
app.controller('MainController', ['$scope', function($scope){

	$scope.userName 	= 	['User Name',false];
	$scope.userEmail	= 	['me@email.com', false];
	$scope.userWork	    = 	["Profession",false];
	$scope.userSchool 	= 	["School",false];
	$scope.userLocation = 	["Location",false];

	$scope.toggle = function (which) {
		var not = $scope[which][1]
		$scope[which][1] =  !not;
		console.log(not);
	}
		
}])



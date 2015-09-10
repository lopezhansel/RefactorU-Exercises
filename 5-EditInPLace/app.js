
var app = angular.module('myApp', [])
app.controller('MainController', ['$scope', function($scope){
	$scope.userName = 'User Name';
	$scope.userEmail = 'me@email.com';
	$scope.userWork = "Developer"
	$scope.userSchool = "RefactorU"
	$scope.userLocation = "Boulder"

}])


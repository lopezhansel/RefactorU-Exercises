
var app = angular.module('myApp', [])
app.controller('MainController', ['$scope', function($scope){
	$scope.name = 'User Name';
	$scope.email = 'me@email.com';
}])


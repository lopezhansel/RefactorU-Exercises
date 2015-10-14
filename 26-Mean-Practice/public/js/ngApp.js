var app = angular.module('phoneApp', []);

app.controller('phoneCtrl', ['$scope', function ($scope) {
	$scope.greeting = 'phoneApp';
}]);
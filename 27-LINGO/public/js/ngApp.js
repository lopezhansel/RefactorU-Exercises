var app = angular.module('Lingo', []);

app.controller('mainCtrl', ['$scope', '$http', function($scope, $http) {

	$scope.greeting = 'Welcome To Lingo App';

	$scope.getData = function() {
		$http.get('/api/readData').then(function(response) {
			console.log(response.data);
		});
	};
	$scope.getData();
	$scope.postData = function() {
		$http.post('/api/createData', $scope.data) .then(function(response) {
			console.log(response.data);
		});
		$scope.getData();
	};



}]);
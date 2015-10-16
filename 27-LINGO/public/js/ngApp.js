var app = angular.module('ngApp', []);

app.controller('appCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.greeting = 'Welcome To Scafold App';

	$scope.getData = function() {
		$http.get('/api/readData').then(function(response) {
			console.log(response.data);
		});
	};
	
	$scope.postData = function() {
		$http.post('/api/createData', $scope.data).then(function(response) {
			console.log(response.data);
		});
		$scope.getData();
	};



}]);
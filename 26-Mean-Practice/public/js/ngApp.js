var app = angular.module('phoneApp', []);

app.controller('phoneCtrl', ['$scope','$http' , function ($scope,$http) {
	$scope.greeting = 'Welcome To Phone App';
	$scope.phone = {};
	$scope.phonesArray = [];
	$http.get('/api/readPhones').then(function  (returnData) {$scope.phonesArray = returnData.data; });
	$scope.postPhones = function  () {
		console.log('Phone im posting', $scope.phone);
		$http.post('/api/createPhones',$scope.phone);
		// update phonesArray
		$http.get('/api/readPhones').then(function  (returnData) {$scope.phonesArray = returnData.data; });
		
	};
}]);
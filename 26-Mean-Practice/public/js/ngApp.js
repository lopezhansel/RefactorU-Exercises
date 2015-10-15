var app = angular.module('phoneApp', []);

app.controller('phoneCtrl', ['$scope','$http' , function ($scope,$http) {
	$scope.greeting = 'Welcome To Phone App';
	$scope.phone = {};
	$http.get('/api/readPhones',function  (returnData) {
		console.log(returnData.data);
		
	});
	$scope.postPhones = function  () {
		console.log('Phone im posting', $scope.phone);
		$http.post('/api/createPhones',$scope.phone);
	};
}]);
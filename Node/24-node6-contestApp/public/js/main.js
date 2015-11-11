var app = angular.module('contestApp', []);
app.controller('MainCtrl', ['$scope','$http', function ($scope,$http) {

	$scope.hello = "hello world";

	$http.get('/submissionsApi').then(function  (serverResponse) {
		$scope.returnObj = serverResponse.data;
	});

	$scope.videoSubmit = function  () {
		$http.post('/postVideos', $scope.videoSubmited).then(function(returnData){
			$scope.returnObj = returnData.data;
		});
	};

}]);



   
var app = angular.module('contestApp', []);
app.controller('MainCtrl', ['$scope','$http', function ($scope,$http) {
	$scope.hello = "hello world";
	$scope.videoSubmit = function  () {
		$http.post('/postVideos', $scope.videoSubmited).then(function(returnData){
			console.log(returnData.data);
			$scope.returnObj = returnData.data;
		});
	};
}]);



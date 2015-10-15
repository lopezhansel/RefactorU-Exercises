var app = angular.module('phoneApp', []);

app.controller('phoneCtrl', ['$scope','$http' , function ($scope,$http) {
	$scope.greeting = 'Welcome To Phone App';
	$scope.phone = {};
	$scope.phonesArray = [];
	$scope.username = '';
	$http.get("/login").then(function  (returnData) {
		console.log(returnData.data);
	});

	$http.get('/api/readPhones').then(function  (returnData) {$scope.phonesArray = returnData.data; });
	$scope.postPhones = function  () {
		$http.post('/api/createPhones',$scope.phone);
		$http.get('/api/readPhones').then(function  (returnData) {$scope.phonesArray = returnData.data; });
	};

	$scope.loginUser = function(){
		$http.post('/login', {username : $scope.username})
			.then(function(returnData){
				console.log('After login :', returnData)
				$scope.loginForm = false
				$scope.user = {
					name : returnData.data.username
				}
			})
	}

	$http.get('/login').then(function(returnData){
		var sessionObj = returnData.data

		if(!sessionObj.username){
			$scope.loginForm = true
		}
		else{
			$scope.user = {
				name : returnData.data.username
			}

		}

	})
}]);
var app = angular.module('ngApp', []);

app.controller('appCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.greeting = 'Welcome To Scafold App';

	$scope.getData = function() {
		$http.get('/api/readData').then(function(response) {
			console.log(response.data);
		});
	};
	$scope.ping = function  () {

		socket.emit('response','hi therr');
	};
	$scope.postData = function() {
		$http.post('/api/createData', $scope.data).then(function(response) {
			console.log(response.data);
		});
		$scope.getData();
	};
	// var socket = io();

	var socket = io();
	$scope.newFeed = [];
	socket.on('welcome',function  (data) {
		console.log(data);
	});
	 socket.on('news', function (data) {

	   console.log(data);
	   socket.emit('response', Date.now());
	   // socket.emit('my other event', { my: 'data' });
	 });

}]);
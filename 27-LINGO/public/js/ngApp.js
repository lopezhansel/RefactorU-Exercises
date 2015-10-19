var app = angular.module('Lingo', []);

app.controller('mainCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.greeting = 'Welcome To Lingo App';
	$scope.wordTranslate = {};
	$scope.fiveLanguages = ['es','fr','gr','it','ru'];
	$scope.test = {};
	
	$scope.getData = function() {
		$http.get('/api/getWords').then(function(response) {
			$scope.test.quiz = response.data;
		});
	};
	$scope.getData();

	$scope.postData = function() {
		$http.post('/translating', $scope.wordTranslate) 
			.then(function(response) {
				console.log(response.data.split('').join(''));
				console.log($scope.wordTranslate.sourceText);
				if($scope.wordTranslate.sourceText == response.data){
					console.log("you have err");
					$scope.translatedText = "you have an error";
				}
				else{$scope.translatedText = response.data;}
			});
		// $scope.getData();
	};
	$scope.validateAnswer = function  () {
		$http.post('/validateAnswer',$scope.test).then(function  (response) {
			$scope.realAnswer = response.data;
		});
	};


}]);
// console.log();
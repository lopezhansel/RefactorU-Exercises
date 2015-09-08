/**
* myapp Module
*
* Description
*/
var app = angular.module('myapp', []);
app.controller('MainController', ['$scope', function(){
	$scope.hideH1  = false;
	$scope.hideList = true;

	$scope.toggleH1 = function(){         
		console.log("hello world");
		if ($scope.hideH1 === false){
			$scope.hideH1 = true;
		} else { 
			$scope.hideH1 = false;
		}
	}
	$scope.toggleList = function(){
		if ($scope.hideList === true){
			$scope.hideList = false;
		} else { 
			$scope.hideList = true;
		}
	}
}]);

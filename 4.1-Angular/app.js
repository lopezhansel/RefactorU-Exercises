/**
* myapp Module
*
* Description
*/
var app = angular.module('myApp', []);
app.controller('MainController', ['$scope', function($scope){
	$scope.hideH1  = false;
	$scope.hideList = true;
	$scope.redText = true;

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
	$scope.toggleRedText = function(){
		if ($scope.redText === true){
			$scope.redText = false;
		}else {
			$scope.redText = true;
		}
	}
}]);

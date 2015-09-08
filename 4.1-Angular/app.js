/**
* myapp Module
*
* Description
*/
var app = angular.module('myApp', []);
app.controller('MainController', ['$scope', function($scope){
	$scope.hideH1  = false;
	$scope.hideList = true;
	$scope.redText = false;

	$scope.toggleH1 = function(){         
			$scope.hideH1 = !$scope.hideH1;
	}
	$scope.toggleList = function(){
			$scope.hideList = !$scope.hideList;
	}
	$scope.toggleRedText = function(){
		$scope.redText = !$scope.redText;

	}
}]);


/**
* myapp Module
*
* Description
*/
var app = angular.module('myApp', []);
app.controller('MainController', ['$scope', function($scope){
	$scope.hideH1  = false;
	$scope.hideList = true;


	$scope.toggleH1 = function(){         
		$scope.hideH1 = !$scope.hideH1;
	}

	$scope.toggleList = function(){
		$scope.hideList = !$scope.hideList;
	}

	$scope.toggleRedText = function(num){
		$scope.redText1 = (num === 1);
		$scope.redText2 = (num === 2);
		$scope.redText3 = (num === 3);
	}

}]);


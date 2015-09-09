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

	$scope.h1 = "Headings 1";
	$scope.h2 = "Heading 2";
	$scope.h3 = "Heading 3";

	$scope.excite = function(head){
		$scope[head] += "!";
	}
	// $scope.oldExcite = function (input){
	// 	if(input ===1){$scope.h1 += "!"};
	// 	if(input ===2){$scope.h2 += "!"};
	// 	if(input ===3){$scope.h3 += "!"};
	// }
}]);


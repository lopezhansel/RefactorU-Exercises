var app = angular.module('myApp', []);
app.controller('MainController', ['$scope', '$timeout', function($scope, $timeout){

	$scope.hideH1  = false;
	$scope.hideList = true;

	$scope.toggleH1 = function(){         
		$scope.hideH1 = !$scope.hideH1;
	}

	$scope.toggleList = function(){
		$scope.hideList = !$scope.hideList;
	}

	$scope.toggleRedText = function(num){
		$scope.redText1 = (num === 1) ? 'blue' : 'black';
		$scope.redText2 = (num === 2) ? 'blue' : 'black';
		$scope.redText3 = (num === 3) ? 'blue' : 'black';
	}

	$scope.h1 = "Headings 1";
	$scope.h2 = "Heading 2";
	$scope.h3 = "Heading 3";

	$scope.excite = function(head){
		$scope[head] += "!";
	}

	$scope.stopDefAction = function (evt) {
		var yesOrNo = confirm('are you sure you want to leave');
    	yesOrNo === true ? 'ok': evt.preventDefault()
	}

	// this is thed old excite method
	// $scope.excite = function (input){
	// 	if(input ===1){$scope.h1 += "!"};
	// 	if(input ===2){$scope.h2 += "!"};
	// 	if(input ===3){$scope.h3 += "!"};
	// }
	
	// just testing this feature out
	// $timeout(function(){
	// 	console.log('waited 5secs')
	// }, 5000);
}]);


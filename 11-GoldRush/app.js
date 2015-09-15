var app = angular.module('GoldRush',[]);
app.controller('MainController', ['$scope', function($scope){
	$scope.xCoord = 
	$scope.yCoord = 
	$scope.markers= [];
	$scope.disable = false

	$scope.createDiv = function(event){
		if ($scope.disable === false ){
			$scope.xCoord = event.pageX;
			$scope.yCoord = event.pageY;
			$scope.coord= "top:" + $scope.yCoord +"px ; left:" + $scope.xCoord +"px; "
			$scope.tempObj = {
				coord: $scope.coord,
				visibility: true,
				info: ['write here',false]
			}
			$scope.markers.push($scope.tempObj)
		}
	}

	$scope.disableCreate = function(){
		$scope.disable = !$scope.disable;

	};
	$scope.deleteDiv = function(index){
		console.log('works')
		$scope.markers[index].visibility = false;
	}

}]);
	// We attempted this code first and it didn't work.
	// $scope.xCoord = 
	// $scope.yCoord = 
	// $scope.createDiv = function(event){
	// 	$scope.xCoord = event.pageX;
	// 	$scope.yCoord = event.pageY;

	// 	var button = document.createElement('DIV')
	// 	button.className= "marker " 
	// 	button.style.cssText= "top:" + $scope.yCoord +"px ; left:" + $scope.xCoord +"px; "
	// 	var wrapper = document.getElementById('wrapper')
	// 	wrapper.appendChild(button)
	// }

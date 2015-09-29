app.controller('accountController', ['$scope','$http',"userService", function ($scope,$http,userService) {
	// $scope.users = userService.randomUsers
	$scope.randomUsers = userService.randomUsers


	// $scope.random = randomUser
	// console.log($scope.random);
	$scope.myDate = new Date();
	$scope.minDate = new Date(
	    $scope.myDate.getFullYear(),
	    $scope.myDate.getMonth() - 2,
	    $scope.myDate.getDate());
	$scope.maxDate = new Date(
	    $scope.myDate.getFullYear(),
	    $scope.myDate.getMonth() + 2,
	    $scope.myDate.getDate());
}])


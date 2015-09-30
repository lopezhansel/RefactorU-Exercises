app.controller('accountController', ['$scope','$http',"userService",'$routeParams', function ($scope,$http,userService,$routeParams) {
	$scope.users = userService.randomUsers
	$scope.randomUsers = userService.randomUsers

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


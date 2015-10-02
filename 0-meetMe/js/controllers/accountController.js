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

 app.controller('DemoCtrl', function($scope) {
    $scope.user = {
      title: 'Developer',
      email: 'ipsum@lorem.com',
      firstName: '',
      lastName: '' ,
      company: 'Google' ,
      address: '1600 Amphitheatre Pkwy' ,
      city: 'Mountain View' ,
      state: 'CA' ,
      biography: 'Loves kittens, snowboarding, and can type at 130 WPM.\n\nAnd rumor has it she bouldered up Castle Craig!',
      postalCode : '94043'
    };
  })
  .config( function($mdThemingProvider){
    // Configure a dark theme with primary foreground yellow
    $mdThemingProvider.theme('docs-dark', 'default')
        .primaryPalette('yellow')
        .dark();
  });
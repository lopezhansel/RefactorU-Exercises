app.controller('messagesController', ['$scope', 'userService', '$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", 'leafletData', "$location", "$timeout", 
  function($scope, userService, $routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, leafletData, $location, $timeout) {
    $scope.hello = "hey there";
    $scope.users = userService.users;
    $timeout(function() {
      $scope.users = userService.users;
    }, 5);

  }]);

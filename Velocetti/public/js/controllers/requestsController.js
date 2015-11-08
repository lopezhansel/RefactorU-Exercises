app.controller('requestsController',  ['$scope', '$mdSidenav', 'userService', '$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", 'leafletData', "$location","$timeout", 
  function($scope, $mdSidenav, userService, $routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, leafletData, $location,$timeout) {
  var socket = io();
  $timeout(function  () {
    if (userService.me === "there"){ $location.path("/login");} 
  },200);
  $scope.me = userService.me;
    $scope.allRequests = userService.allRequests;
  
  $interval(function() {
    $scope.me = userService.me;
    $scope.allRequests = userService.allRequests;
  }, 1000);
  $scope.deleteRequest = function   (request) {
      socket.emit("deleteRequest",request);
  };
  
}]);


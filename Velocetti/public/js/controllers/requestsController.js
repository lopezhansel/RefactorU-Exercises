app.controller('requestsController',  ['$scope', '$mdSidenav', 'mainService', '$routeParams', '$mdMedia', '$mdDialog', '$mdToast', "$http", "$interval", 'leafletData', "$location","$timeout", 
  function($scope, $mdSidenav, mainService, $routeParams, $mdMedia, $mdDialog, $mdToast, $http, $interval, leafletData, $location,$timeout) {
  var socket = io();
  $timeout(function  () {
    if (mainService.me === "there"){ $location.path("/login");} 
  },200);
  $scope.me = mainService.me;
    $scope.allRequests = mainService.allRequests;
  
  $interval(function() {
    $scope.me = mainService.me;
    $scope.allRequests = mainService.allRequests;
  }, 1000);
  $scope.deleteRequest = function   (request) {
      socket.emit("deleteRequest",request);
  };
  
}]);


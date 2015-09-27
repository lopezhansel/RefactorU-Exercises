var app = angular.module('StarterApp', ['ngAnimate','ngMaterial','ngRoute', 'ui.bootstrap','ngRoute']);

app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('cyan')
    .accentPalette('orange');
});

app.config(function($routeProvider){
  $routeProvider
    .when('/', { 
      controller: 'AppCtrl', 
      templateUrl: 'views/main.html' 
    })
    .when('/account', { 
      controller: 'AppCtrl', 
      templateUrl: 'views/account.html' 
    })
    .otherwise({ 
      redirectTo: '/' 
    }); 
});
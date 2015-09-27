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
      templateUrl: 'views/home.html' 
    })
    .when('/MyAccount', { 
      controller: 'AppCtrl', 
      templateUrl: 'views/MyAccount.html' 
    })
    .when('/editProfile', { 
      controller: 'AppCtrl', 
      templateUrl: 'views/form.html' 
    })
    .when('/messages', { 
      controller: 'AppCtrl', 
      templateUrl: 'views/messages.html' 
    })
    .otherwise({ 
      redirectTo: '/' 
    }); 
});
var app = angular.module('StarterApp', ['ngAnimate','ngMaterial','ngRoute', 'ui.bootstrap']);

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
    .when('/AccountSettings', { 
      controller: 'accountController', 
      templateUrl: 'views/AccountSettings.html' 
    })
    .when('/ProfileView', { 
      controller: 'AppCtrl', 
      templateUrl: 'views/ProfileView.html' 
    })
    .when('/Messages', { 
      controller: 'AppCtrl', 
      templateUrl: 'views/Messages.html' 
    })
    .otherwise({ 
      redirectTo: '/' 
    }); 
});

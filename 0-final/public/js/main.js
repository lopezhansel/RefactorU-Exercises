var app = angular.module('StarterApp', ['ngAnimate','ngMaterial','ngRoute', 'ui.bootstrap','leaflet-directive']);

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
    .when('/ProfileView/:id', { 
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

// notes

// window on resizeBy
// add html to cetain calss
// ng mouse down 
// ng mouse move
// give each obj and unique id
// md-dialog locals vs $rootScope


// userfull applications
// -grindr 
// - kidFinder 
// -Tinder 

// company 
// uber 
// gasBuddy
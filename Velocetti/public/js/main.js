
var app = angular.module('StarterApp', ['ngAnimate','ngMaterial','ngRoute', 'ui.bootstrap','leaflet-directive']);

app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('orange')
    .accentPalette('teal');
});
app.filter('orderObjectBy', function() {
  return function(items, field, reverse) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    filtered.sort(function (a, b) {
      return (a[field] > b[field] ? 1 : -1);
    });
    if(reverse) filtered.reverse();
    return filtered;
  };
});
// app.config(function  ($stateProvider, $urlProvider) {

// });

app.config(function($routeProvider){
  $routeProvider
    .when('/home', { 
      controller: 'AppCtrl', 
      templateUrl: 'views/homeView.html' 
    })
    .when('/map', { 
      controller: 'AppCtrl', 
      templateUrl: 'views/mapView.html' 
    })
    .when('/AccountSettings', { 
      controller: 'accountController', 
      templateUrl: 'views/accountSettingsView.html' 
    })
    .when('/ProfileView/:id', { 
      controller: 'AppCtrl', 
      templateUrl: 'views/ProfileView.html' 
    })
    .when('/Messages', { 
      controller: 'AppCtrl', 
      templateUrl: 'views/messagesView.html' 
    })
    .when('/login', { 
      controller: 'AppCtrl', 
      templateUrl: 'views/login.html' 
    })
    .otherwise({ 
      redirectTo: '/home' 
    }); 
});


'use strict';

/**
 * @ngdoc overview
 * @name 12InfiniteAgendaApp
 * @description
 * # 12InfiniteAgendaApp
 *
 * Main module of the application.
 */
angular
  .module('12InfiniteAgendaApp', [
    'ngAnimate',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

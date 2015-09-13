var app = angular.module('storeApp',['ngRoute','ngStorage']);
app.config(function($routeProvider){
  $routeProvider
    .when('/', { 
      controller: 'ProductsController', 
      templateUrl: 'views/storeFront.html' 
    })
     .when('/product/:id', { 
      controller: 'ProductsController', 
      templateUrl: 'views/productPage.html' 
    })

    .otherwise({ 
      redirectTo: '/' 
    });     
});

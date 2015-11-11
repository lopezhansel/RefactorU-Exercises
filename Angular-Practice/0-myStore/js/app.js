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
   .when('/account', { 
      controller: 'ProductsController', 
      templateUrl: 'views/accountPage.html' 
    })   
   .when('/movies', { 
      controller: 'ProductsController', 
      templateUrl: 'views/moviesView.html' 
    })
    .when('/movie/:id', { 
      controller: 'ProductsController', 
      templateUrl: 'views/movieView.html' 
    })
    .otherwise({ 
      redirectTo: '/' 
    });     
});


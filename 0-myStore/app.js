var app = angular.module('storeApp',['ngRoute']);
app.config(function($routeProvider){
	$routeProvider
    .when('/store', { 
      controller: 'ProductsController', 
      templateUrl: 'views/storeFront.html' 
    })
    .otherwise({ 
      redirectTo: '/store' 
    });   	
});



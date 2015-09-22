var app = angular.module('quotes', ['ngStorage'])
app.controller('quotesCtrl', ['$scope','$localStorage', function ($scope,$localStorage) {
	$scope.quote1 = 'Inspirational Quotes'
	$scope.$storage = $localStorage.$default({here:['hello']})
}])
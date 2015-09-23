var app = angular.module('quotes', ['ngStorage'])
app.controller('quotesCtrl', ['$scope','$localStorage', function ($scope,$localStorage) {
	$scope.toggleSortByRating = function  () {
		$scope.sortRating = ($scope.sortRating === '-rating') ? '' : "-rating";
	}
	$scope.setAuthor = function  () {
		$scope.selectedAuthor = undefined	}
	$scope.addQuote = function  () {
		var obj = {}
		obj.author = $scope.author;
		obj.quote  = $scope.quote;
		obj.rating = Number($scope.rating);
		$localStorage.quotes.push(obj)
		$scope.author  = ''
		$scope.quote   = ''
		$scope.rating  = ''
	}
	// need to finish  the undelete
	$scope.deleteQuote = function  (index) {
		$scope.removed = $localStorage.quotes.splice(index,1)
		$scope.removedIndex = index
	}
	$scope.resetQuotes = function  () {
		localStorage.clear();
		location.reload();
	}

	$scope.clickAuthor = function (index) {
		$scope.selectedAuthor = ($scope.selectedAuthor == undefined) ? $localStorage.quotes[index].author :  undefined 
	}
	$scope.$storage = $localStorage.$default({
		quotes:[
		{
		author: 'Forest Gump',
		quote : "My momma always said, 'Life was like a box of chocolates. You never know what you're gonna get.'",
		rating: 5
	},{
		author: 'Johnny Castle' ,
		quote: "Nobody puts Baby in the corner",
		rating: 3
	},{
		author: "Travis Bickle" ,
		quote: "You talkin' to me?" ,
		rating: 3
	},{
		author: "Tony Montana",
		quote:  "Say 'hello' to my little friend!",
		rating: 4
	},{
		author: "Det. Robert Thorn",
		quote: "Soylent Green is people!" ,
		rating: 2
	},{
		author: "The Terminator",
		quote: "Hasta la vista, baby." ,
		rating: 5
	},{
		author: "The Terminator",
		quote: "I'll be back" ,
		rating: 5
	}]})

}])

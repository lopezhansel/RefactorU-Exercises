var app = angular.module('quotes', ['ngStorage'])
app.controller('quotesCtrl', ['$scope','$localStorage', function ($scope,$localStorage) {
	$scope.addQuote = function  () {
		var obj = {}
		obj.author = $scope.author;
		obj.quote = $scope.quote;
		obj.rating = $scope.rating;
		$localStorage.quotes.push(obj)
		$scope.author  = ''
		 $scope.quote  = ''
		$scope.rating = ''
	}
	$scope.deleteQuote = function  (index) {
		$localStorage.quotes.splice(index,1)
	}
	$scope.resetQuotes = function  () {
		localStorage.clear();
		location.reload();
	}
	$scope.selectedAuthor = function 	(index) {
			$scope.selectedAuthorr = $localStorage.quotes[index].author
			console.log($scope.selectedAuthorr);
	}
	$scope.$storage = $localStorage.$default({quotes:[{
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

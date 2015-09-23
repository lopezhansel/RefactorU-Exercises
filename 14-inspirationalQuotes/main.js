var app = angular.module('quotes', ['ngMaterial','ngStorage',])

app.controller('quotesCtrl', ['$scope','$localStorage','$mdSidenav', function ($scope,$localStorage) {
	$scope.user = {
      title: 'Developer',
      email: 'ipsum@lorem.com',
      firstName: '',
      lastName: '' ,
      company: 'Google' ,
      address: '1600 Amphitheatre Pkwy' ,
      city: 'Mountain View' ,
      state: 'CA' ,
      biography: 'Loves kittens, snowboarding, and can type at 130 WPM.\n\nAnd rumor has it she bouldered up Castle Craig!',
      postalCode : '94043'
    };
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
		stars();
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
		quote : "My momma always said, 'Life was like a box of chocolates. You never know what you're gonna get.",
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
	function stars () {
		for (var i = 0; i < $localStorage.quotes.length; i++) {
			$localStorage.quotes[i].stars = []
			for (var j = 0; j < $localStorage.quotes[i].rating; j++) {
			console.log($localStorage.quotes[i].stars);
				$localStorage.quotes[i].stars.push('★')

			// $localStorage.quotes[i].stars.join('')
			};
		};

	}
	stars();

}])
app.config( function($mdThemingProvider){
    // Configure a dark theme with primary foreground yellow
    $mdThemingProvider.theme('docs-dark', 'default')
        .primaryPalette('blue')
        .dark();
  });
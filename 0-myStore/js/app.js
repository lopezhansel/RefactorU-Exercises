var app = angular.module('myApp',['ngRoute']);
app.config(function($routeProvider){
	$routeProvider
    .when('/books', { 
      controller: 'BookshelfController', 
      templateUrl: 'views/bookshelf.html' 
    })
     .when('/books/:bookId', { 
      controller: 'BookController', 
      templateUrl: 'views/book.html' 
    })
     .when('/books/:bookId/chapters/:chapterId', { 
      controller: 'ChapterController', 
      templateUrl: 'views/chapter.html' 
    })
    .otherwise({ 
      redirectTo: '/books' 
    });   	
});

app.controller('MainController', ['$scope', function($scope){
	$scope.products = [
		{
			name: 'product 1',
			price: 13.54,
			rating: 5,
			img: 'http://placehold.it/300x300',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac neque ac quam cursus auctor. Maecenas eget hendrerit dui. Integer ornare tellus non lobortis imperdiet. '
		},
		{
			name: 'product 1',
			price: 13.54,
			rating: 5,
			img: 'http://placehold.it/300x300',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac neque ac quam cursus auctor. Maecenas eget hendrerit dui. Integer ornare tellus non lobortis imperdiet. '
		},
		{
			name: 'product 1',
			price: 13.54,
			rating: 5,
			img: 'http://placehold.it/300x300',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac neque ac quam cursus auctor. Maecenas eget hendrerit dui. Integer ornare tellus non lobortis imperdiet. '
		},
		{
			name: 'product 1',
			price: 13.54,
			rating: 5,
			img: 'http://placehold.it/300x300',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac neque ac quam cursus auctor. Maecenas eget hendrerit dui. Integer ornare tellus non lobortis imperdiet. '
		},
		{
			name: 'product 1',
			price: 13.54,
			rating: 5,
			img: 'http://placehold.it/300x300',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac neque ac quam cursus auctor. Maecenas eget hendrerit dui. Integer ornare tellus non lobortis imperdiet. '
		}

	]
	
}])

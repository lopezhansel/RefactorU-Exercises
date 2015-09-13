app.controller('ProductsController', ['$scope','$routeParams','$localStorage', function($scope,$routeParams,$localStorage){
	$scope.products = [
		{
			name: 'Awesome 1',
			price: 13.54,
			rating: 5,
			img: 'http://placehold.it/300x300',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac neque ac quam cursus auctor. Maecenas eget hendrerit dui. Integer ornare tellus non lobortis imperdiet. '
		},
		{
			name: 'Here 2',
			price: 13.54,
			rating: 5,
			img: 'http://placehold.it/300x300',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac neque ac quam cursus auctor. Maecenas eget hendrerit dui. Integer ornare tellus non lobortis imperdiet. '
		},
		{
			name: 'There 3',
			price: 13.54,
			rating: 5,
			img: 'http://placehold.it/300x300',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac neque ac quam cursus auctor. Maecenas eget hendrerit dui. Integer ornare tellus non lobortis imperdiet. '
		},
		{
			name: 'My 4',
			price: 13.54,
			rating: 5,
			img: 'http://placehold.it/300x300',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac neque ac quam cursus auctor. Maecenas eget hendrerit dui. Integer ornare tellus non lobortis imperdiet. '
		},
		{
			name: 'What 2',
			price: 13.54,
			rating: 5,
			img: 'http://placehold.it/300x300',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac neque ac quam cursus auctor. Maecenas eget hendrerit dui. Integer ornare tellus non lobortis imperdiet. '
		}

	]
	$scope.select = $routeParams.id
	$scope.$storage = $localStorage.$default({ x: 42});
	$scope.addToX = function  () {
		$scope.$storage.x++;
	}
}])
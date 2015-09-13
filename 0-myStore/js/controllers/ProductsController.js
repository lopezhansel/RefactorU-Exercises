app.controller('ProductsController', ['$scope','$routeParams','$localStorage', function($scope,$routeParams,$localStorage){
	$scope.products = [
		{
			name: 'Samsung Galaxy Note 5 ',
			price: 724.89,
			rating: 5,
			img: 'http://ecx.images-amazon.com/images/I/81Xgvuv7ILL._SL1500_.jpg',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac neque ac quam cursus auctor. Maecenas eget hendrerit dui. Integer ornare tellus non lobortis imperdiet. '
		},
		{
			name: 'Apple MacBook Pro 15.4-Inch',
			price: 1929.00,
			rating: 5,
			img: 'http://ecx.images-amazon.com/images/I/816jzlNp%2B0L._SL1500_.jpg',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac neque ac quam cursus auctor. Maecenas eget hendrerit dui. Integer ornare tellus non lobortis imperdiet. '
		},
		{
			name: 'GoPro HERO4 BLACK 4K Action Camera',
			price: 499.99,
			rating: 5,
			img: 'http://ecx.images-amazon.com/images/I/41qIULouRhL._SL1500_.jpg',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac neque ac quam cursus auctor. Maecenas eget hendrerit dui. Integer ornare tellus non lobortis imperdiet. '
		},
		{
			name: 'Sandisk 200gb Micro SD',
			price: 13.54,
			rating: 5,
			img: 'http://ecx.images-amazon.com/images/I/81Z7-tiWzvL._SL1500_.jpg',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac neque ac quam cursus auctor. Maecenas eget hendrerit dui. Integer ornare tellus non lobortis imperdiet. '
		},
		{
			name: 'Apple MacBook Air',
			price: 894.99 ,
			rating: 5,
			img: 'http://ecx.images-amazon.com/images/I/51zsSjBYAzL._SL1500_.jpg',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac neque ac quam cursus auctor. Maecenas eget hendrerit dui. Integer ornare tellus non lobortis imperdiet. '
		},{
			name: 'PlayStation 4',
			price: 399.99 ,
			rating: 5,
			img: 'http://ecx.images-amazon.com/images/I/51ROi4d4puL._SL1500_.jpg',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac neque ac quam cursus auctor. Maecenas eget hendrerit dui. Integer ornare tellus non lobortis imperdiet. '
		},{
			name: 'Bose SoundLink Bluetooth Speaker III',
			price: 299.00 ,
			rating: 5,
			img: 'http://ecx.images-amazon.com/images/I/81UANmagJ8L._SL1500_.jpg',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac neque ac quam cursus auctor. Maecenas eget hendrerit dui. Integer ornare tellus non lobortis imperdiet. '
		},{
			name: 'LG Electronics G Watch R - Smart Watch',
			price: 289.99  ,
			rating: 5,
			img: 'http://ecx.images-amazon.com/images/I/412Sjb2vS2L._SL1500_.jpg',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac neque ac quam cursus auctor. Maecenas eget hendrerit dui. Integer ornare tellus non lobortis imperdiet. '
		},{
			name: 'Apple Magic Trackpad',
			price: 65.99,
			rating: 5,
			img: 'http://ecx.images-amazon.com/images/I/31G9orC5V8L._SL1500_.jpg',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac neque ac quam cursus auctor. Maecenas eget hendrerit dui. Integer ornare tellus non lobortis imperdiet. '
		},{
			name: 'NVIDIA SHIELD',
			price: 199.99,
			rating: 5,
			img: 'http://ecx.images-amazon.com/images/I/71on8Pa9fQL._SL1500_.jpg',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac neque ac quam cursus auctor. Maecenas eget hendrerit dui. Integer ornare tellus non lobortis imperdiet. '
		},{
			name: 'Bose QuietComfort 25',
			price: 299.00,
			rating: 5,
			img: 'http://ecx.images-amazon.com/images/I/51itR-iia7L._SL1500_.jpg',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac neque ac quam cursus auctor. Maecenas eget hendrerit dui. Integer ornare tellus non lobortis imperdiet. '
		},{
			name: 'iPad Pro 12.9-inch',
			price: 799,
			rating: 5,
			img: 'http://b-i.forbesimg.com/patrickmoorhead/files/2013/11/iPad-Air.jpg',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac neque ac quam cursus auctor. Maecenas eget hendrerit dui. Integer ornare tellus non lobortis imperdiet. '
		}

	]
	$scope.select = $routeParams.id
	$scope.$storage = $localStorage.$default({ x: 42});
	$scope.addToX = function  () {
		$scope.$storage.x++;
	}
}])
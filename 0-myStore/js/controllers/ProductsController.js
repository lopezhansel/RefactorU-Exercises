app.controller('ProductsController', ['$scope','$routeParams','$localStorage','productService', function($scope,$routeParams,$localStorage,productService){
	$scope.select = $routeParams.id
	$scope.products = productService.products

	$scope.sub = function (event,select) {
		event.preventDefault() //cancel default submit action 
		$localStorage.reviews[select].push($scope.review)	
		$scope.review = {} // resets review 
	}
	$scope.$storage = $localStorage.$default({reviews : [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]] })
	$scope.reset = function(){
		$localStorage.$reset();
		location.reload();
	};
	console.log($scope.products[0])

}])
